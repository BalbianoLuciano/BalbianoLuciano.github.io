# Análisis ATS de los CVs — 2026-10-01

Método: se extrajo el texto de cada PDF como lo hace un parser (`pdftotext`) y se
cruzaron las palabras clave contra **127 avisos reales** ya procesados en
`aplicaciones/`, contando solo la parte del aviso y no los borradores.

## Lo estructural: pasan

Los tres CVs parsean limpio. Una sola columna, sin tablas ni cajas de texto,
secciones con nombres estándar (`Summary` / `Resumen`, `Work Experience` /
`Experiencia Laboral`, `Education`, `Skills`), fechas en formato `2025 - Present`
y orden lineal. Nada de lo que rompe a un ATS: ni gráficos, ni columnas, ni datos
metidos en el encabezado de página.

### Dos defectos de forma

**1. Los iconos de contacto salen como basura.** La línea de contacto se extrae así:

```
a BalbianoLuciano | ] luciano-balbiano | ç balbianoluciano.github.io
ć balbiano06@gmail.com
```

Esas letras sueltas son los glifos de FontAwesome. El riesgo concreto es que un
parser pegue el glifo al dato y guarde `ćbalbiano06@gmail.com`. **Arreglo**:
poner la etiqueta en texto (`Email:`, `GitHub:`, `LinkedIn:`) o dejar el icono
fuera del flujo de texto.

**2. No hay teléfono en ninguno de los tres CVs.** Muchos formularios lo toman
del CV y lo marcan obligatorio. Va: `+54 9 3735 411941`.

## Lo de contenido: faltan palabras que él sí tiene

Ordenado por cuántos de los 127 avisos la piden:

| Palabra | Avisos | AI-EN | TL-EN | TL-ES | Qué hacer |
|---|---|---|---|---|---|
| **APIs REST** | 44 | ✗ | ✓ | ✗ | **Lo más grave.** Lo hace todos los días y no está escrito en dos de los tres |
| **Node.js** | 43 | ✗ (solo "Node") | ✓ | ✓ | Escribir `Node.js` literal en el CV de IA |
| **MCP** | 38 | ✗ (solo "Model Context Protocol") | ✓ | ✓ | Poner las dos formas: `MCP (Model Context Protocol)` |
| **Scrum / Agile** | 17 | ✗ | ✗ | ✗ | Trabaja con ágiles: va en Skills |
| **Firebase** | 14 | ✗ | ✗ | ✗ | 4 años de Firebase, y no aparece |
| **GCP** | 15 | ✗ | ✗ | ✗ | Honesto: `Firebase y Google Maps Platform (GCP)` |
| **JWT / autenticación** | 12 | ✗ | ✗ | ✗ | Lo implementó; va en Skills |
| **Express** | 11 | ✗ | ✗ | ✗ | Lo usó; va en Skills |
| **HTML / CSS** | 9 | ✗ | parcial | parcial | Obvio para un humano, no para un ATS |
| **SQL** (la palabra sola) | 25 | ✓ | ✗ | ✗ | Los TL dicen MySQL y PostgreSQL pero no `SQL` |
| **CI/CD** | 29 | ✓ | ✗ | ✗ | Falta en los dos de Team Leader |

**El caso del CV de IA es el peor**: le faltan REST, Node.js literal, la sigla
MCP, HTML y CSS. Es el CV que apunta a AI-Driven Fullstack, donde el filtro
automático busca exactamente esas.

## Ausencias correctas

No hay que inventarlas, y explican buena parte de los descartes: **AWS (49
avisos)**, Kubernetes (29), Angular (22), Java (20), microservicios (18),
.NET/C# (17), Azure (16), MongoDB (15), Kafka (13), NestJS (11), FastAPI (11),
Clean Architecture (11), Spring (9), Redis (9), GraphQL (9), Oracle (6), SQL
Server (5).

**AWS es el dato que más duele**: la piden 49 de 127 avisos, casi el 40%, y es la
única de la lista que se puede cerrar sola con un proyecto chico y real.

## Orden de los arreglos

1. Teléfono y etiquetas de contacto en texto (los cuatro `.tex`).
2. Las palabras que ya tiene y faltan, en la sección Skills.
3. Reordenar Skills del CV de IA: arriba LLMs, agentes, RAG y MCP; abajo y
   separado el stack web, que es lo que pidió el feedback de empleabilidad.
4. Decidir si vale la pena una prueba real con AWS para poder escribirlo.
