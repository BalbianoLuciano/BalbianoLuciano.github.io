# Plantillas de postulación espontánea

Derivadas de la guía de Henry (`inbox/Postulaciones espontáneas.md`) y de
`jobsearch/VOZ.md`. La estructura de Henry es de tres pasos y se respeta:

1. **Gancho**: algo del otro (su post, su producto, su stack). Nunca "me presento".
2. **Valor**: quién es y qué construyó, con 3 o 4 tecnologías del puesto y un
   número real.
3. **CTA activo**: una pregunta que se pueda contestar con sí.

Lo que cambia respecto de la guía: nada de "apasionado", "aportar valor",
"quedo a disposición" ni "me encantaría ser parte". Eso está prohibido en
`VOZ.md` y es lo que la propia guía marca como "no genera impacto".

**Los DMs (`dm-es`, `dm-tecnico`), desde el 2026-10-15**, abren con un regalo
(Gridwright, open source) y recién al final preguntan por vacantes. Sin dos
puntos en el texto: "suenan a IA". Es el mismo mensaje que arma `dia.py`. El 70%
es dato suyo (PERFIL.md). `{gancho}` es opcional: una línea propia que termina en
punto ("Vi que liderás backend en Mercado Libre."), o vacío. Pasa los 500
caracteres a propósito.

**Los campos entre llaves los completa `generar.mjs` desde `objetivos.csv`.**

---

## dm-es · DM de LinkedIn a recruiter

Hola {persona}, ¿cómo estás? {gancho}Soy Luciano Balbiano, lidero el equipo de desarrollo en Invisible Geeks y quería compartirte una herramienta open source que armé para optimizar el flujo de trabajo de un equipo, se llama Gridwright. Es un plugin de Claude Code que convierte diseños de Figma en componentes listos para el proyecto. En nuestro equipo bajó un 70% el tiempo de maquetación y ordenó cómo trabajamos entre diseño y desarrollo. Queda a disposición de tu equipo en https://github.com/BalbianoLuciano/gridwright

Este tipo de herramientas son las que más disfruto construir. Si en {empresa} buscan un perfil así para sumarse a proyectos interesantes, ¿te puedo enviar mi CV? Te dejo mi portfolio por acá, https://balbianoluciano.github.io

---

## dm-tecnico · DM a CTO, líder técnico o fundador

Hola {persona}, ¿cómo estás? {gancho}Soy Luciano Balbiano, lidero el equipo de desarrollo en Invisible Geeks y quería compartirte una herramienta open source que armé para optimizar el flujo de trabajo de un equipo, se llama Gridwright. Es un plugin de Claude Code que convierte diseños de Figma en componentes listos para el proyecto. En nuestro equipo bajó un 70% el tiempo de maquetación y ordenó cómo trabajamos entre diseño y desarrollo. Queda a disposición de tu equipo en https://github.com/BalbianoLuciano/gridwright

Este tipo de herramientas son las que más disfruto construir. Si en {empresa} buscan un perfil así para sumarse a proyectos interesantes, ¿te puedo enviar mi CV? Te dejo mi portfolio por acá, https://balbianoluciano.github.io

---

## mail-es · Mail a empresa (sin aviso publicado)

Asunto: Luciano Balbiano — desarrollador full stack

Hola{coma_persona}, ¿cómo están? {gancho}

Soy Luciano Balbiano, desarrollador con 5 años de experiencia en {stack} y actualmente Team Leader en Invisible Geeks, donde llevo los proyectos de punta a punta: la definición con el cliente, el diseño de la solución, el desarrollo, la revisión del código del equipo y el mantenimiento en producción.

{prueba}

Les adjunto mi CV y les comparto mi portfolio, con los proyectos en detalle: https://balbianoluciano.github.io

¿Tienen alguna búsqueda abierta donde el perfil encaje? Si no es el momento, me interesa quedar en su base para más adelante.

Saludos cordiales,
Luciano Balbiano

---

## mail-en · Mail a empresa, en inglés

Subject: Luciano Balbiano — full stack developer

Hi{coma_persona}, {gancho}

I'm Luciano Balbiano, a developer with 5 years of experience in {stack}, currently Team Leader at Invisible Geeks, where I take projects end to end — from the requirements conversation through to deployment and the maintenance that follows.

{prueba}

My portfolio, with the projects in detail: https://balbianoluciano.github.io — I'm attaching my CV as well.

Is there an open role where this would fit? If the timing isn't right, I'd like to stay on your radar.

Talk soon,
Luciano Balbiano

---

## dm-postulado · DM a la recruiter de un aviso al que ya se postuló (máx. 500 caracteres)

Hola {persona}, ¿cómo estás? Acabo de postularme a la búsqueda de {puesto}{frase_empresa} y quería presentarme por acá.

Soy Luciano Balbiano, 5 años con {stack}, hoy Team Leader en Invisible Geeks. {prueba}

Portfolio: https://balbianoluciano.github.io

Si te sirve, te amplío lo que necesites. Saludos.

---

## seguimiento · A los 7 días, en el mismo hilo

Hola {persona}, te escribo para retomar esto por si quedó tapado. Sigo interesado en lo que hacen{frase_empresa}, y si hoy no hay nada abierto me sirve igual saberlo para escribirte más adelante.

---

## Banco de pruebas (el campo `prueba`)

Una sola, la que más se parezca a lo que hace la empresa:

| Clave | Texto |
|---|---|
| `hornero` | Construí un sistema de gestión y catálogo que corre igual para una tienda de ropa, una ferretería o un gimnasio: lo que cambia entre rubros es dato y no código. Hay una demo abierta, sin registro: hornero.dmeter.com.ar |
| `pericias` | Construí un SaaS multi-tenant donde un perito judicial lleva causas, honorarios y plazos, con los permisos garantizados en la base de datos y la evidencia firmada al subirse. |
| `prolicht` | Migré el catálogo de un fabricante austríaco de iluminación: 257 proyectos con dos décadas de contenido, con comandos reproducibles y previsualización del cambio antes de aplicarlo. |
| `malmberg` | Migré más de 800 páginas de una editorial holandesa sobre un boilerplate propio de React Islands: solo viaja el JavaScript de los componentes realmente interactivos. |
| `ia` | Integro las APIs de OpenAI y Claude en sistemas que usan clientes reales, y construí Gridwright, un plugin open source de Claude Code que convierte diseños de Figma en componentes verificados contra el original. |
| `gridwright` | Construí Gridwright, un plugin open source de Claude Code que convierte un diseño de Figma en componentes verificados contra el original, con los chequeos escritos como código. |
| `lit` | Mi proyecto más reciente es un tutor de inglés con API en Go sobre Postgres, 663 tests, y un contrato ERC-721 en Solidity para las distinciones: github.com/BalbianoLuciano/lost-in-translation |
| `ecommerce` | Construí la tienda online de una marca de ropa con un solo stock para la web y el mostrador. |

---

## Banco de pruebas en inglés (el campo `prueba`, cuando `idioma` es `en`)

| Clave | Texto |
|---|---|
| `hornero` | I built a catalogue and stock engine that runs the same for a clothing shop, a hardware store or a gym: what changes between trades is data, not code. There's an open demo, no signup: hornero.dmeter.com.ar |
| `pericias` | I built a multi-tenant SaaS where a court-appointed expert runs their whole practice, with permissions enforced by the database rather than the ORM and every uploaded file fingerprinted. |
| `prolicht` | I migrated an Austrian lighting manufacturer's catalogue: 257 projects and two decades of content, with reproducible commands and a dry-run to review the diff before applying it. |
| `malmberg` | I migrated 800+ pages of a Dutch publisher onto a custom React Islands boilerplate: only the components that are genuinely interactive ship JavaScript. |
| `ia` | I integrate the OpenAI and Claude APIs into systems real clients use, and I built an MCP server and a RAG agent my team uses daily. |
| `gridwright` | I built Gridwright, an open-source Claude Code plugin that turns a Figma design into components verified against the original, with the checks written as code instead of left to the model. |
| `lit` | My most recent project is an English tutor with a Go API over Postgres, 663 tests, and an ERC-721 contract in Solidity for its badges: github.com/BalbianoLuciano/lost-in-translation |
| `ecommerce` | I built the online store of a clothing brand running on the same stock as the counter. |
