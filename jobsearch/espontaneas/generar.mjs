// Genera los mensajes de postulación espontánea desde objetivos.csv.
//
//   node jobsearch/espontaneas/generar.mjs              # todos los pendientes
//   node jobsearch/espontaneas/generar.mjs --limite 20  # los primeros 20
//   node jobsearch/espontaneas/generar.mjs --canal dm-es
//   node jobsearch/espontaneas/generar.mjs --archivo    # escribe salidas/YYYY-MM-DD.md
//
// Las plantillas y el banco de pruebas salen de PLANTILLAS.md: se edita el
// markdown, no este script. Nada se envia: esto deja el texto listo para copiar.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i === -1 ? d : (process.argv[i + 1] ?? true);
};

// CSV con comillas: los ganchos llevan comas.
const filas = (texto) => {
  const out = [];
  let campo = '';
  let fila = [];
  let comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"' && texto[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') comillas = false;
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ',') { fila.push(campo); campo = ''; }
    else if (c === '\n') { fila.push(campo); out.push(fila); fila = []; campo = ''; }
    else if (c !== '\r') campo += c;
  }
  if (campo || fila.length) { fila.push(campo); out.push(fila); }
  return out.filter((f) => f.some((x) => x.trim()));
};

// De PLANTILLAS.md: cada "## clave · titulo" es una plantilla, y la tabla final
// es el banco de pruebas.
const parsearPlantillas = (md) => {
  const plantillas = {};
  const bloques = md.split(/\n## /).slice(1);
  for (const b of bloques) {
    const clave = b.split('\n')[0].split('·')[0].trim();
    const cuerpo = b.slice(b.indexOf('\n') + 1).split('\n---')[0].trim();
    if (clave && !clave.startsWith('Banco')) plantillas[clave] = cuerpo;
  }
  // Dos bancos de pruebas: el segundo bloque de tabla es el de ingles.
  const tablas = md.split('## Banco de pruebas');
  const banco = (txt) => Object.fromEntries(
    [...txt.matchAll(/^\| `([a-z]+)` \| (.+?) \|$/gm)].map(([, k, v]) => [k, v.trim()])
  );
  const pruebas = { es: banco(tablas[1] ?? ''), en: banco(tablas[2] ?? '') };
  return { plantillas, pruebas };
};

const md = await readFile(join(AQUI, 'PLANTILLAS.md'), 'utf8');
const { plantillas, pruebas } = parsearPlantillas(md);
const [cab, ...datos] = filas(await readFile(join(AQUI, 'objetivos.csv'), 'utf8'));
const col = Object.fromEntries(cab.map((c, i) => [c.trim(), i]));

const canalFiltro = arg('canal');
const limite = Number(arg('limite', Infinity));

const salida = [];
let n = 0;
for (const f of datos) {
  const v = (k) => (f[col[k]] ?? '').trim();
  if (v('estado') && v('estado') !== 'pendiente') continue;
  if (canalFiltro && v('canal') !== canalFiltro) continue;
  if (n >= limite) break;
  const plantilla = plantillas[v('canal')];
  if (!plantilla) { console.error(`! canal desconocido: ${v('canal')} (${v('empresa')})`); continue; }
  const banco = pruebas[v('idioma') === 'en' ? 'en' : 'es'];
  const prueba = banco[v('prueba')] ?? v('prueba');
  if (!banco[v('prueba')] && v('prueba')) console.error(`! prueba sin banco: ${v('prueba')} (${v('empresa')})`);
  const persona = v('persona');
  const texto = plantilla
    .replaceAll('{persona}', persona || 'equipo')
    .replaceAll('{coma_persona}', persona ? ` ${persona}` : '')
    .replaceAll('{gancho}', v('gancho'))
    .replaceAll('{prueba}', prueba)
    .replaceAll('{stack}', v('stack'))
    .replaceAll('{frase_empresa}', v('empresa') ? ` en ${v('empresa')}` : '');
  const largo = texto.length;
  const aviso = v('canal').startsWith('dm') && largo > 500 ? `  ⚠️ ${largo} caracteres, LinkedIn recomienda menos de 500` : `  (${largo} caracteres)`;
  salida.push(`## ${n + 1}. ${v('empresa')}${persona ? ` — ${persona}` : ''} · ${v('canal')} · ${v('contacto')}${aviso}\n\n${texto}\n`);
  n++;
}

const cuerpo = salida.join('\n---\n\n');
if (arg('archivo')) {
  const hoy = new Date().toISOString().slice(0, 10);
  const ruta = join(AQUI, 'salidas', `${hoy}.md`);
  await writeFile(ruta, `# Espontáneas ${hoy} — ${n} mensajes\n\n${cuerpo}`);
  console.log(`${n} mensajes en ${ruta}`);
} else {
  console.log(cuerpo || 'Nada pendiente.');
  console.error(`\n${n} mensajes generados.`);
}
