# Perfil — Luciano Balbiano

> Fuente de verdad para cualquier cosa que se escriba en su nombre durante la
> búsqueda laboral. Si un dato no está acá, se pregunta. No se inventa.

## Identidad

| | |
|---|---|
| Nombre | Luciano Balbiano |
| Título | **AI native & Fullstack developer** (desde 2026-09-24: es el que usa en el portfolio, InfoJobs y LinkedIn) |
| Mail | balbiano06@gmail.com |
| GitHub | github.com/BalbianoLuciano |
| LinkedIn | linkedin.com/in/luciano-balbiano |
| Portfolio | balbianoluciano.github.io |
| Teléfono | +54 373 541 1941 |
| Ubicación | Buenos Aires, Argentina (CP C1425) |
| Ciudadanía | **Española / UE** — no necesita sponsorship |
| Modalidad | Remoto · dispuesto a mudarse |
| Idiomas | Español nativo · Inglés B2 (EF SET certificado) |

**Sobre el inglés**: B2 real. No decir "fluent" ni "bilingual". Lo que sí es
cierto (corrección suya del 2026-09-23): **lee y escribe en inglés todos los
días** —documentación, specs, code review— y **puede sostener una conversación y
explicar un problema técnico o una duda que surja**. Lo que NO: que hable a
diario con los clientes de Austria u Holanda. Eso no es así.

Cuando un formulario pregunta el nivel, él mismo contestó así y conviene sostenerlo:

> Intermedio — me siento con comodidad para leer y escribir pero no a nivel
> conversacional.

**Sobre la ciudadanía**: es española/UE. Eso se dice sin vueltas en cualquier
aplicación europea, es una ventaja. Pero vive en Buenos Aires: si un aviso es
presencial en España, hay que nombrar la mudanza en vez de dejar que asuman que
ya está allá.

## Los dos ángulos

Todo lo que se escriba se apoya en uno de estos dos. La elección se hace leyendo
el aviso, no por defecto.

### Ángulo A — AI Engineer
Cuando el aviso menciona: LLM, agentes, RAG, MCP, OpenAI/Anthropic, embeddings,
automatización con IA, prompt engineering, AI product.

**Los dos puestos que persigue con este ángulo** (decisión del 2026-10-01):
**AI Engineer / AI Developer** y **AI-Driven Fullstack**. El CV de IA se ordena
para esos dos y no para todo lo que toca: arriba van LLMs, OpenAI y Claude API,
RAG, MCP y agentes; el stack web va después y separado.

> AI Engineer con 5+ años programando y 4+ shipeando proyectos reales. La IA que
> construye se usa: sistemas de generación de contenido sobre las APIs de OpenAI
> y Claude en producción, un chatbot con streaming, y Gridwright, una herramienta
> open source que construye interfaces desde el diseño y mide el resultado contra
> él. Trabaja spec-first: la especificación antes que el código, y las reglas de
> negocio versionadas como dato en vez de enterradas en el programa.

### Ángulo B — Team Leader / Full Stack
Cuando el aviso menciona: liderazgo, tech lead, gestión de equipo, Laravel, PHP,
Vue, multi-tenant, migraciones, arquitectura, cliente directo.

> Team Leader y Full Stack con 5+ años programando y 4+ shipeando. Lidera equipos
> y proyectos de punta a punta, desde la definición con el cliente hasta el
> deploy y el mantenimiento en producción. Especializado en PHP, Laravel, Vue y
> React, con migraciones a gran escala y arquitectura multi-tenant.

**Cuando el aviso mezcla los dos** (cada vez más común): arrancar por A y cerrar
mencionando el liderazgo. La IA es lo diferencial; el liderazgo es lo que da
confianza de que el sistema se sostiene.

## Experiencia

### Dmeter — **Co-fundador** · Frontend Architect · AI · 2023 – presente
Co-fundó el estudio y lidera las decisiones técnicas y la arquitectura. Seis productos en
producción: educación superior, legal, retail, e-commerce y marketplaces.

- **Gridwright**: plugin open source de Claude Code que convierte una página de
  Figma en componentes y los mide contra el diseño. Máquina de estados en disco
  y verificaciones escritas como código. 250 tests; 98,54% de fidelidad en una
  landing de 12 secciones, contra 89% del mismo agente sin la herramienta.
  Público: github.com/BalbianoLuciano/gridwright
- **Agente RAG en Python** para generar propuestas (2.968 líneas): ChromaDB con
  embeddings multilingües de sentence-transformers, recuperación con umbral y
  re-ranking por coincidencia de stack, y capa de LLM con Groq (Llama 3.3 70B) y
  failover automático a OpenRouter, con reintentos. Scraping de avisos con httpx
  y Playwright, CLI con typer. **Es un prototipo interno: funciona de punta a
  punta, con una corrida real.** No decir que está en producción.
- Principio de diseño transversal: **el sistema genera, la persona decide**. Nada
  se envía ni se publica solo.

### Invisible Geeks — Team Leader · 2025 – presente
Madrid, España. Progresión Full Stack Developer → Project Lead → Team Leader.
**Lidera un equipo de 3 personas.** Preaviso: 1 semana.

- Lidera proyectos full-stack con PHP, Laravel, Vue.js y Tailwind.
- Sistemas de generación de contenido integrando OpenAI, Claude, Google Maps y
  NewsAPI.ai sobre Filament.
- Motor de reglas de negocio versionadas: la tabla de esfuerzo por tipo de
  actividad y los límites por franja etaria son dato, y cambian sin tocar el
  algoritmo.
- **Migración de una plataforma editorial multi-idioma (Python)**: 29 scripts que
  parsean cuatro bases MySQL legacy (español, euskera, catalán, gallego), las
  consolidan y emiten los CSV de importación al CMS nuevo. **26.634 registros,
  29.194 correcciones de formato y más de 1.580 archivos** migrados y renombrados
  por clave sintética. Claves de idempotencia `{sitio}_{slug}`: reimportar
  actualiza en vez de duplicar, y las entidades no se cruzan entre idiomas.
- **Herramientas de migración en Python para otros dos sitios**: crawler
  recursivo con BeautifulSoup y Playwright (277 y 75 páginas inventariadas, con
  componentes y links rotos) y un dump MySQL de producción parseado a SQLite de
  97 tablas para analizarlo.
- Detectó omisiones críticas que permitieron renegociar acuerdos con clientes y
  corregir el alcance antes de que fuera tarde.
- HubSpot CMS: workflows complejos, funciones serverless, arquitectura de
  componentes. Legacy en PHP 5.x con Docker.

### Henry — Instructor · oct. 2022 – nov. 2022
Bootcamp full-stack de JavaScript. Acompañó a estudiantes en la etapa de
repaso: sesiones sobre los módulos ya vistos meses antes (JavaScript, React y
Node), volviendo sobre lo que no había quedado firme y revisando el código de
cada uno con ellos.

Sirve cuando el aviso pregunta por experiencia docente o de mentoría, que es
cada vez más común en puestos senior y de lead. Conecta con lo que hace hoy:
code reviews y acompañamiento del equipo en Invisible Geeks.

### Freelance — Full Stack · 2023 – 2025
Proyectos de punta a punta, con foco en front-end.

## Proyectos y los números que convencen

Los números son lo que hace la diferencia. Usarlos siempre que vengan al caso.

| Proyecto | El número | Qué es |
|---|---|---|
| **Gridwright** | **98,54% vs 89%** del mismo agente sin la herramienta; 250 tests | Plugin open source de Claude Code: de una página de Figma a componentes registrados en el design system del proyecto, medidos contra el diseño con un diff perceptual. Lo que se puede verificar con un assert es código; lo que necesita criterio queda para el modelo. |
| **Migración editorial multi-idioma** (Invisible Geeks) | **26.634 registros** y 29.194 correcciones; 1.580+ archivos | ETL propio en Python: cuatro bases MySQL legacy, una por idioma, consolidadas en un CMS nuevo con objetos personalizados, con claves de idempotencia para poder reimportar sin duplicar. |
| **Lost in Translation** | 240 ítems y 33 habilidades validados en CI | Producto propio: profesor de inglés que diagnostica, enseña y evalúa. El banco de contenido es YAML y una herramienta en Python (pydantic estricto, pytest) lo valida y lo compila al bundle que embebe la API en Go. |
| **Prolicht** (prolicht.at) | **257 proyectos** migrados, dos décadas de contenido | Sitio y catálogo de un fabricante austríaco de iluminación LED arquitectónica. Comandos reproducibles con dry-run para revisar el diff antes de aplicar. Configurador de ambientes y editor de presentaciones con link compartible. |
| **Malmberg.nl** | **800+ páginas** migradas | Migración completa a HubSpot CMS sobre un boilerplate propio de React Islands con hidratación selectiva: solo los componentes realmente interactivos mandan JavaScript. |
| **Hornero** | **248 tests** contra Postgres real | Un motor que corre igual para una tienda de ropa, una ferretería o un gimnasio: lo que cambia entre rubros es dato, no código. Aislamiento entre negocios garantizado por Postgres (RLS), no por el ORM. |
| **El Zorro Gris** (elzorrogris.es) | **5 verticales** | Plataforma para adultos mayores. Motor de itinerarios que arma el viaje según lo que la persona realmente aguanta: cada actividad lleva esfuerzo físico y fatiga mental en escala 1-5, con topes por franja etaria y ajustes por clima y estación. Chatbot propio con streaming. |
| **Portal de Pericias** | **8 entidades**, hashes MD5/SHA1/SHA256 | SaaS multi-tenant donde un perito judicial lleva toda su práctica: causas, pericias, honorarios y plazos. Evidencia digital con huella al subir, permisos garantizados a nivel base de datos. |
| **Relay** | producto propio, en producción | Workspace de operaciones: chats, mail, archivos, pagos y números en una sola pantalla. Un inbox donde el contexto viaja con el hilo. Se enchufa a lo que la empresa ya usa. Demo abierta, sin registro. |

## Años por tecnología

Lo que hay que responder cuando un screening pregunta "years of experience with X".
Son sus números, no estimaciones.

| | años | | años |
|---|---|---|---|
| React | 5 | PHP | 5 |
| Laravel | 5 | Python | 5 |
| Node.js | 5 | HubSpot | 4 |
| MySQL | 5 | Vue.js | 4 |
| Firebase | 4 | React Native | 4 |
| Claude Code | desde su lanzamiento | | |

**Total: 5 años.** Si preguntan por algo que no está en la tabla, se responde con
lo que hay y se compensa en el texto libre. No se infla.

## Stack

| | |
|---|---|
| LLMs y agentes | MCP, Claude Code, OpenAI API, Claude API, Groq, OpenRouter, Llama 3.3 |
| RAG y datos | ChromaDB, Hugging Face Transformers, embeddings locales, SQLite, PostgreSQL, MySQL, Prisma, Drizzle |
| Lenguajes | TypeScript, JavaScript, Python, PHP |
| Web | Laravel, **Symfony** (mantenimiento de legacy), Vue, React, Next.js, Astro, Inertia.js, Tailwind, Hono |
| Infra | Cloudflare Workers, Docker, Vite |
| Testing | Pest, Playwright, golden tests |
| Método | Spec-driven development, reglas de negocio versionadas |

## Formación

- 2026-2027 — **Tecnicatura Universitaria en Programación**, Universidad
  Tecnológica Nacional (**en curso**, termina dic. 2027). Está en los cuatro CVs.
  Se menciona como en curso, nunca como título obtenido.
- 2021 — Python/Django Web Developer, Informatorio Chaco
- 2017-2020 — Arquitectura y Urbanismo, U.N.N.E. (incompleto)
- 2024 — UX/UI Designer + Figma (Udemy) · 2D Game Developer (Udemy)

## Cómo se cuenta lo de Dmeter

Es **co-fundador**, no empleado. Eso ordena el relato: no sostiene dos trabajos
en paralelo, fundó un estudio y además trabaja en Invisible Geeks.

**El riesgo a tener presente**: algunos recruiters leen "co-founder" y piensan
que el candidato se va a ir a su propia empresa. La respuesta corta y honesta,
si preguntan, es que Dmeter es un estudio con socios y equipo, no un proyecto
que dependa de que él esté full time — y que lo que busca es exactamente el tipo
de problema que ahí no puede resolver.

## Lo que NO se dice

Corrección del 2026-09-18, en sus palabras: *"no quiero mentir, no terminé el
desarrollo de esto y no se utiliza"*.

- **El servidor MCP interno de Dmeter**: quedó sin terminar y **no está en uso**.
  Durante semanas se escribió en CVs, mensajes y en el portfolio que "todo el
  equipo lo consume a diario desde su Claude Code". Eso es falso y no se vuelve
  a escribir. Si el aviso pide MCP, lo que se puede decir es que conoce el
  protocolo y trabajó sobre el SDK, no que tenga un servidor en uso.
- **El agente RAG de propuestas** funciona de punta a punta pero es un
  **prototipo interno con una corrida real**: no es "un sistema en producción".
- **A confirmar con él**, porque se venían contando con el mismo tono que el MCP:
  el **RAG sobre la documentación del estudio** con embeddings locales y SQLite,
  y **Relay**, que figura como "producto propio, en producción" con demo abierta.
  Hasta que confirme, el RAG no se menciona y de Relay no se dice "en producción".

La regla: antes de escribir "en producción", "lo usa el equipo" o "a diario",
se confirma con él. El daño de un dato inflado no es el CV, es la entrevista.

## Datos sensibles

DNI, domicilio, expectativa salarial, salario actual y demográficos están en
`jobsearch/PRIVADO.md`, que está gitignoreado. Se leen solo cuando un formulario
los pide, y el salario se consulta con él antes de escribirlo.

## Por completar

Preguntar antes de afirmar cualquiera de estos:

- [x] ~~Ciudad y mudanza~~ — Buenos Aires, dispuesto a mudarse
- [x] ~~Autorización UE~~ — ciudadanía española, sin sponsorship
- [x] ~~Expectativa salarial~~ — en PRIVADO.md
- [x] ~~Tecnicatura en Programación~~ — UTN, mar. 2026 – dic. 2027, en curso. Ya está en los cuatro `.tex`.
- [x] ~~Modalidad y ubicación~~ — **confirmado 2026-09-02: la ubicación no es un
      impedimento.** Acepta híbrido en Buenos Aires y mudarse. Mandar todo lo que
      se pueda.
- [x] ~~Inglés~~ — **B2 confirmado por él.** No inflar a C1 en ningún lado.
- [x] ~~Preaviso real en Invisible Geeks~~ — **1 semana**, confirmado el
      2026-09-23. Es lo que se contesta en "disponibilidad para iniciar".
- [x] ~~Relación formal con Dmeter~~ — **CO-FUNDADOR**, confirmado el 2026-09-03.
      Es la respuesta a "¿cómo sostenés dos puestos a la vez?": no son dos
      empleos, es una empresa que fundó y un empleo. Ver la nota de abajo.
- [x] ~~Franja para entrevistas~~ — **11:00 a 15:30 (GMT-3, Buenos Aires)**,
      confirmado el 2026-09-18. Es la franja que ofrece para llamadas y
      screenings; fuera de ahí, se consulta.
- [ ] **Horario real en Invisible Geeks** — ¿cumple horario español completo (9 a
      18 CEST, que en Buenos Aires son las 4 AM a la 1 PM) o trabaja horario
      argentino con solapamiento? Aparece cada vez que un aviso europeo pide
      horario de allá. Sin este dato no se puede afirmar nada en un mail.
- [x] ~~Equipo en Invisible Geeks~~ — **lidera a 3 personas**, confirmado el
      2026-09-23. Ratificado el 2026-10-01: **2 o 3 desarrolladores a cargo**
      entre IG y Dmeter. Va como dato concreto en el CV de Team Leader, que el
      feedback de empleabilidad marcó como el hueco principal de ese CV.
- [x] ~~Symfony~~ — **confirmado el 2026-09-24**: sí trabajó con Symfony, en
      mantenimiento de software y sitios legacy. No hay proyecto nuevo hecho en
      Symfony, y por ser viejos no los lista en el CV, pero "Symfony" en el CV
      está respaldado. Falta la versión, si alguna vez hace falta precisarla.
- [ ] Stack de Relay
