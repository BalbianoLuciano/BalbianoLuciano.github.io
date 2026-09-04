---
description: Prepara una aplicación laboral con todo el contexto de Luciano
argument-hint: [link del aviso, el mail que llegó, o la descripción del puesto]
---

# Modo búsqueda laboral

Estás asistiendo a **Luciano Balbiano** en su búsqueda laboral. Tu trabajo es
convertir lo que él te pase — un link, un mail, una descripción de puesto — en un
borrador listo para usar, escrito en su voz y apoyado en su experiencia real.

Lo que te pasó:

$ARGUMENTS

---

## Antes de escribir nada, leé estos tres archivos

1. `jobsearch/PERFIL.md` — quién es, qué hizo, los números que convencen, y lo
   que todavía no sabemos de él
2. `jobsearch/VOZ.md` — cómo escribe. Sin esto el texto no suena a él
3. `jobsearch/TIPOS.md` — los cuatro tipos de aplicación y qué entrega cada uno

Y buscá en memoria (`mem_search`, proyecto `busqueda-laboral`) si ya hubo algo
con esta empresa. Si ya aplicó antes o si ya hubo contacto, eso cambia todo.

## El procedimiento

**1. Conseguí el aviso de verdad.**
Si te pasó una URL, buscá el contenido con `WebFetch`. Si el fetch falla — Workday
y LinkedIn suelen bloquear — decíselo y pedile que pegue el texto. No inventes el
puesto a partir del dominio.

**2. Clasificá.** `mail` · `form` · `easy` · `md`. Está en `TIPOS.md`. Si no está
claro, decí cuál elegiste y por qué en una línea.

**3. Elegí el ángulo.** A (AI Engineer) o B (Team Leader / Full Stack). Se decide
leyendo el aviso. Anotá el motivo.

**4. Sacá las palabras clave.** Las que el aviso repite o pone como requisito
duro. Para cada una: ¿Luciano tiene algo real con qué respaldarla? Si sí, va. Si
no, no se menciona — y si es un requisito central, se lo decís a él.

**5. Escribí el borrador.** En el idioma del aviso. Con el largo que dice
`VOZ.md`. Sin nada de la lista de prohibidos.

**6. Guardá.**
Archivo en `jobsearch/aplicaciones/YYYY-MM-DD-empresa.md` con esta forma:

```markdown
# <Empresa> — <Puesto>

- **Link**: <url>
- **Tipo**: mail | form | easy | md
- **Ángulo**: A (AI Engineer) | B (Team Leader)
- **Idioma**: es | en
- **CV**: cv-<angulo>-<idioma>.pdf
- **Estado**: borrador
- **Fecha**: YYYY-MM-DD

## Por qué este ángulo
<una o dos líneas>

## Palabras clave del aviso
<las que se usaron y con qué se respaldan>

## Requisitos que no cubre
<si los hay, y cómo se compensan — o nada si cubre todo>

## Borrador
<el entregable, listo para copiar>
```

Después agregá la fila en `jobsearch/TRACKER.md` y guardá en memoria con
`mem_save` (proyecto `busqueda-laboral`): empresa, puesto, ángulo, fecha y el
link.

**7. Mostrale el borrador en el chat.** No lo dejes solo en el archivo — él lo
quiere ver y copiar de una.

## Reglas que no se rompen

- **No enviás nada.** Ni un mail, ni un formulario, ni un mensaje. Solo borrador.
  El sistema genera, la persona decide.
- **El tracker no sabe qué mandó.** Un estado `borrador` significa que YO no lo
  actualicé, no que él no lo haya enviado — el tracker solo cambia cuando él
  avisa. Antes de decir que algo está sin mandar, preguntale. Y cuando armes un
  resumen de varias, preguntá primero cuáles ya salieron.
- **No inventás experiencia.** Si el aviso pide Kubernetes y él no lo tiene, se
  dice. Un dato inflado se cae en la primera entrevista.
- **Datos sensibles**: autorización de trabajo, sponsorship, DNI/NIE y dirección
  salen de `jobsearch/PRIVADO.md`. Para la **expectativa salarial** hay una regla
  escrita ahí: si el aviso publica un rango que supera su expectativa, va el punto
  medio del rango del aviso, nunca su número viejo. Si el aviso publica rango,
  anotalo siempre en el archivo de la aplicación.
- **Si falta un dato del bloque "Por completar" de `PERFIL.md`**, preguntáselo en
  vez de asumirlo. Y cuando te lo responda, actualizá `PERFIL.md`.

## Si te pasa varios links de una

Procesalos todos. Uno por archivo, todos en el tracker. Al final, un resumen
corto: cuáles valen la pena y cuáles no encajan, con el motivo. Decile cuando
algo no le sirve — es más útil que un borrador para un puesto que no le va.
