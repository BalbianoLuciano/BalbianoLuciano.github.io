# Perfil — Luciano Balbiano

> Fuente de verdad para cualquier cosa que se escriba en su nombre durante la
> búsqueda laboral. Si un dato no está acá, se pregunta. No se inventa.

## Identidad

| | |
|---|---|
| Nombre | Luciano Balbiano |
| Mail | balbiano06@gmail.com |
| GitHub | github.com/BalbianoLuciano |
| LinkedIn | linkedin.com/in/luciano-balbiano |
| Portfolio | balbianoluciano.github.io |
| Teléfono | +54 373 541 1941 |
| Ubicación | Buenos Aires, Argentina (CP C1425) |
| Ciudadanía | **Española / UE** — no necesita sponsorship |
| Modalidad | Remoto · dispuesto a mudarse |
| Idiomas | Español nativo · Inglés B2 (EF SET certificado) |

**Sobre el inglés**: B2 real. No decir "fluent" ni "bilingual". Sí decir que
trabaja a diario con documentación, equipos y clientes en inglés, que es cierto
(Malmberg es holandés, Prolicht austríaco).

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

> AI Engineer con 5+ años programando y 4+ shipeando proyectos reales. Construye
> sistemas de IA que llegan a producción en vez de quedarse en la demo: servidores
> MCP, pipelines RAG y agentes conectados a los sistemas que la gente ya usa.
> Trabaja spec-first: la especificación antes que el código, y las reglas de
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

- Servidor MCP interno en TypeScript sobre el SDK oficial del Model Context
  Protocol. Expone tools, resources y prompts que todo el equipo consume desde su
  propia instancia de Claude Code.
- RAG sobre el portfolio y la documentación interna con embeddings locales
  (Hugging Face Transformers) y SQLite. Sin servicio vectorial externo.
- Sistema de generación de propuestas con RAG sobre ChromaDB y Llama 3.3 70B vía
  Groq y OpenRouter, con scraping de avisos y seguimiento de aplicaciones.
- Principio de diseño transversal: **el sistema genera, la persona decide**. Nada
  se envía ni se publica solo.

### Invisible Geeks — Team Leader · 2025 – presente
Madrid, España. Progresión Full Stack Developer → Project Lead → Team Leader.

- Lidera proyectos full-stack con PHP, Laravel, Vue.js y Tailwind.
- Sistemas de generación de contenido integrando OpenAI, Claude, Google Maps y
  NewsAPI.ai sobre Filament.
- Motor de reglas de negocio versionadas: la tabla de esfuerzo por tipo de
  actividad y los límites por franja etaria son dato, y cambian sin tocar el
  algoritmo.
- Detectó omisiones críticas que permitieron renegociar acuerdos con clientes y
  corregir el alcance antes de que fuera tarde.
- HubSpot CMS: workflows complejos, funciones serverless, arquitectura de
  componentes. Legacy en PHP 5.x con Docker.

### Freelance — Full Stack · 2023 – 2025
Proyectos de punta a punta, con foco en front-end.

## Proyectos y los números que convencen

Los números son lo que hace la diferencia. Usarlos siempre que vengan al caso.

| Proyecto | El número | Qué es |
|---|---|---|
| **Dmeter MCP Server** | usado a diario por todo el equipo | Centraliza las operaciones del estudio y las expone a cualquier cliente MCP. RAG sobre proyectos y documentación, generación de propuestas y documentos, estimación de presupuestos, onboarding. Multi-usuario. |
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
| Claude Code | 2 | | |

**Total: 5 años.** Si preguntan por algo que no está en la tabla, se responde con
lo que hay y se compensa en el texto libre. No se infla.

## Stack

| | |
|---|---|
| LLMs y agentes | MCP, Claude Code, OpenAI API, Claude API, Groq, OpenRouter, Llama 3.3 |
| RAG y datos | ChromaDB, Hugging Face Transformers, embeddings locales, SQLite, PostgreSQL, MySQL, Prisma, Drizzle |
| Lenguajes | TypeScript, JavaScript, Python, PHP |
| Web | Laravel, Vue, React, Next.js, Astro, Inertia.js, Tailwind, Hono |
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
- [ ] **Preaviso real en Invisible Geeks** — el perfil de autofill dice
      "inmediata" pero sigue empleado ahí. Si es inmediata de verdad, bien; si
      son 15 días o un mes, hay que corregirlo antes de que se lo prometa a
      alguien.
- [x] ~~Relación formal con Dmeter~~ — **CO-FUNDADOR**, confirmado el 2026-09-03.
      Es la respuesta a "¿cómo sostenés dos puestos a la vez?": no son dos
      empleos, es una empresa que fundó y un empleo. Ver la nota de abajo.
- [ ] **Horario real en Invisible Geeks** — ¿cumple horario español completo (9 a
      18 CEST, que en Buenos Aires son las 4 AM a la 1 PM) o trabaja horario
      argentino con solapamiento? Aparece cada vez que un aviso europeo pide
      horario de allá. Sin este dato no se puede afirmar nada en un mail.
- [ ] Tamaño de los equipos que lidera (IG y Dmeter)
- [ ] Stack de Relay
