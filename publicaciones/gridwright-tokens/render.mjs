// Regenera el carrusel: slides/slide-NN.png a 2x (2160x2700) y gridwright-tokens-carrusel.pdf.
//
//   node publicaciones/gridwright/render.mjs
//
// Levanta un servidor propio en 127.0.0.1 que sirve SOLO esta carpeta (la raiz del
// portfolio tiene jobsearch/PRIVADO.md: no se sirve nunca). Dharma llega del kit de
// Typekit, que carga en localhost pero no en dominios ajenos como ngrok.
//
// Por que PNG a 2x y no el PDF directo de Chrome: al imprimir, Chrome rasteriza a baja
// resolucion lo que lleva filtros o gradientes, y LinkedIn recomprime encima. Las
// capturas a 2x entran al PDF en Flate, sin perdida.
//
// Playwright sale de node_modules de gridwright: el portfolio no lo tiene de dependencia.
import http from 'node:http';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PW = resolve(AQUI, '../../../gridwright/node_modules/.pnpm/playwright@1.62.1/node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(PW).href).catch(() => {
  console.error('No encuentro Playwright en', PW, '— instalar gridwright o ajustar la ruta.');
  process.exit(1);
});

const TIPOS = { '.html': 'text/html', '.png': 'image/png', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  const ruta = join(AQUI, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!ruta.startsWith(AQUI)) { res.writeHead(404).end(); return; }
  let cuerpo;
  try { cuerpo = await readFile(ruta); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' }).end(cuerpo);
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const BASE = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await page.goto(`${BASE}/carrusel.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const dharma = await page.evaluate(() => document.fonts.check('700 100px dharma-gothic-e'));
  if (!dharma) console.warn('AVISO: Dharma no cargo, el titular sale en Aileron. ¿Hay red?');

  // Caja util del manual: nada pasa de y=1260 (margen de 90 abajo)
  const desbordan = await page.evaluate(() => [...document.querySelectorAll('.slide')].map((s, i) => {
    const top = s.getBoundingClientRect().top;
    const fondo = Math.max(...[...s.children].filter((c) => !c.classList.contains('pilar')).map((c) => c.getBoundingClientRect().bottom - top));
    return fondo > 1262 ? i + 1 : null;
  }).filter(Boolean));
  if (desbordan.length) console.warn('AVISO: se pasan de la caja util las slides', desbordan.join(', '));

  const slides = await page.locator('.slide').all();
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: join(AQUI, 'slides', `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }

  const paginas = join(AQUI, 'slides', '_paginas.html');
  const imgs = slides.map((_, i) => `<img src="slide-${String(i + 1).padStart(2, '0')}.png">`).join('');
  await writeFile(paginas, '<!doctype html><style>@page{size:1080px 1350px;margin:0}html,body{margin:0}'
    + 'img{display:block;width:1080px;height:1350px;break-after:page}img:last-child{break-after:auto}</style>' + imgs);
  const pdf = await browser.newPage();
  await pdf.goto(`${BASE}/slides/_paginas.html`, { waitUntil: 'networkidle' });
  await pdf.pdf({ path: join(AQUI, 'gridwright-tokens-carrusel.pdf'), width: '1080px', height: '1350px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await rm(paginas);
  console.log(`listo: ${slides.length} slides a 2x y gridwright-tokens-carrusel.pdf`);
} finally {
  await browser.close();
  server.close();
}
