# Gridwright — contexto para el post de LinkedIn

Todo lo que hace falta para escribir el post y armar el carrusel sin abrir el
repo de gridwright. Cada número de acá es real y dice de dónde sale; si algo no
está en este archivo, no se afirma.

**Leer antes, en este orden:**

1. `src/pages/marca.astro` — el manual: formato de slide, paleta, escala, límites.
2. `marca/INVESTIGACION.md` — por qué el manual es como es.
3. `jobsearch/VOZ.md` — la voz. Para esto va el **registro técnico**.
4. `../linkedin-content/CLAUDE.md` — reglas de posts: hook, largo, links, emojis.

---

## El pedido

Palabras de Luciano:

> "Introducing Gridwright, a Claude Code plugin (or assistant) y que la primera
> línea deje en claro que se devora los Figma con su precisión y organización."

Decisiones que ya están tomadas:

- **Plugin, no assistant.** Es lo que se instala, y "assistant" suena a un chat
  más.
- **Se llama Gridwright.** Ojo con el typo "Gridwirght".
- **La primera línea arranca con "Introducing Gridwright".** Es una excepción
  consciente a `linkedin-content/CLAUDE.md`, que prohíbe abrir con "Les
  presento…". La excepción se sostiene solamente si la tensión vive en la
  misma línea: *devours* + precisión + organización. Si la línea se lee como
  un anuncio neutro, no pasó el check del hook.
- **El post va en inglés.** El producto, el repo y el público (gente que usa
  Claude Code) son internacionales, y el hook que pidió está en inglés. El
  resto de sus posts sigue en rioplatense. Si prefiere español, se traduce
  entero, no se mezcla.

## Qué es, en una línea

Un plugin de Claude Code más una CLI (`gw`): le pasás un nodo o una página de
Figma y te devuelve el componente o la página construidos, medidos contra el
diseño, y registrados en el design system del proyecto — cada pieza en la
carpeta donde el proyecto guarda ese tipo de cosa.

## El método (ley 02 del manual: la lógica va en la manga)

**El problema:** la tentación obvia es escribir un prompt largo explicándole a
un agente cómo maquetar. Se probó: un repo anterior tenía un workflow de cinco
fases escrito en prosa, y el agente salteaba la fase de análisis cada vez que
el pedido parecía simple. *A prompt is a suggestion.*

**La inversión:** el workflow es una máquina de estados en disco y una CLI la
hace cumplir. Claude no decide qué etapa sigue: pregunta.

```
gw next --json   →   hace exactamente esa etapa   →   gw done   →   gw next --json   →   …
```

**El reparto** — si se puede verificar con un assert, no lo hace el modelo:

| Lo hace el código | Lo hace el modelo |
|---|---|
| Traer el nodo, los assets y la referencia | Escribir el componente como se escriben en ese repo |
| Destilar el árbol en el IR | Nombrar cosas, decidir la API de props |
| Matchear y clasificar tokens | Nombrar los tokens nuevos |
| Indexar los componentes existentes | Decidir qué reusar |
| Renderizar, medir, comparar | Leer el diff y corregir |

**Tres decisiones que valen un slide cada una:**

- **El árbol crudo de Figma nunca llega al modelo.** Un frame son entre 2.000 y
  5.000 nodos, y se destila a un IR de ~4KB. No es por costo: con las
  coordenadas absolutas a la vista, el modelo escribe `position: absolute`.
  En el benchmark el control hizo exactamente eso, en vivo.
- **Los tokens se resuelven antes de escribir una línea del componente.** Cada
  valor del diseño cae en un balde: *exact* (ya existe, se usa), *near*
  (dentro de ΔE 1 o un par de px, se usa el del sistema) o *new* (necesita
  nombre y aprobación). Si no, el modelo escribe `bg-[#1a1a1a]` y alguien
  refactoriza.
- **El puntaje es evidencia, no veredicto.** Se compone de tres dimensiones:
  estructural (cajas, ±2px) 50%, cromático (ΔE CIEDE2000) 25% y perceptual
  (diff de píxeles con el texto enmascarado) 25%. Después hay un dashboard
  con el diseño al lado del render y un slider.

**Tres gates humanos:** `init`, `tokens` y `library:ensure`, lo que es caro de
deshacer. Un componente mal generado se reescribe en diez minutos; un sistema
de tokens contaminado se hereda para siempre. El resto corre solo hasta el
final, y después la persona juzga.

**Organización** (la mitad del hook): `gw init` reconoce el vocabulario de
carpetas del proyecto (`modules`, `blocks`, `sections`, `layouts`,
`partials`, `ui`, `overlays`…) y cada pieza cae donde corresponde: un navbar
o un footer es una *layout part*, el resto son módulos. Cada run deja en el
repo más tokens resueltos, más componentes registrados y más superficie
verificada. Si el componente queda bien pero no le sumó nada al sistema, el
run falló.

**Páginas enteras:** `gw build --view <link>` toma los hijos inmediatos de la
página como secciones, lanza un sub-agente por sección, las construye en
paralelo y compone la página. La vista es la única que escribe lo compartido
(tokens, registro), por eso las secciones no se pisan.

## Los números

### Una página entera — Launch UI (el dato del hook)

La landing dark de [Launch UI], un kit público de Figma: 1440×8599, 12
secciones, construida en un proyecto vacío (Vite + React + Tailwind v4 +
shadcn) con un solo comando.

- **12 secciones detectadas, un sub-agente cada una.** Once construyeron a la
  vez; la número 12 se hizo después, cuando se subió la tolerancia de distill
  (ver más abajo). No decir "12 agentes en paralelo": fueron 11 a la vez.
- **98.54% a 1440** para la página compuesta: estructural 99.47, cromático
  100, perceptual 95.22.
- **80 valores de diseño: 65 encontraron con qué matchear**, 7 quedaron cerca
  y 8 necesitaron nombre — preguntados una sola vez para toda la página. Se
  midieron contra dos bolsas: los 38 tokens del proyecto y los 513 del tema de
  Tailwind instalado. Ojo: 38 y 513 son el tamaño de esas bolsas, no un
  desglose de los 65.
- **Las 12 secciones registradas** en la librería, con baselines congeladas.

Por sección, a 1440:

| Sección | Tipo | Puntaje |
|---|---|---|
| NavbarDefault | layout | 95.7 |
| HeroDefault | module | 91.73 |
| Logos | module | 85.81 |
| BentoGrid2x2 | module | 95.43 |
| ItemsDefault | module | 98.23 |
| FeatureRising | module | 88.87 |
| TabsDefault | module | 95.32 |
| Testimonials | module | 97.28 |
| PricingDefault | module | 97.78 |
| FAQDefault | module | 100 |
| CTA | module | 98.81 |
| Footer | layout | 97.23 |

### El mismo agente, sin gridwright — Untitled UI

Una sección de [Untitled UI FREE v2.0], también pública (*Image collage 02*,
1440×688), construida dos veces desde el mismo commit, en dos clones para que
ninguno viera al otro. El mismo prompt, con una sola diferencia. Al control
se le dio acceso al diseño y el stack. Los dos se midieron con la misma regla.

| | Con gridwright | Sin |
|---|---|---|
| Puntaje a 1440 | **99.8%** | 89% |
| Imágenes | las 5 del diseño, extraídas | placeholders de una URL externa |
| El mosaico | flex y gap | `position: absolute`, con las coordenadas del diseño |
| Color de marca | los valores exactos | el violeta de Tailwind, ΔE 5.5 y 7.3 |
| En la librería | registrado, 5 baselines | no |

Lo honesto: el control armó bien el layout (94% estructural). Perdió sobre
todo por fotos placeholder y un color aproximado, que se arreglan en un
minuto. Lo que no se arregla en un minuto es el `position: absolute`: se
rompe en el primer ancho para el que no se dibujó el diseño.

### Del proyecto

- Arrancó el **2026-09-03**; al 2026-09-11 lleva **64 commits**.
- **La spec se escribió antes del código:** 10 leyes en
  `specs/001-pipeline.md`. Es el mismo procedimiento que la spec del galpón de
  los Smithson en `marca/INVESTIGACION.md`. Esa conexión es de la marca, no
  hace falta forzarla en el post.
- **250 tests.** 6 paquetes. 5 dependencias de runtime.
- **Open source, MIT.**

## Los errores (el manual: contar el error antes que el resultado)

Material real para un slide de "lo que se rompió":

- **Gridwright perdió en tipografía.** En el benchmark renderizó en la fuente
  por defecto del proyecto en vez de Inter, y el puntaje no se enteró: el
  diff perceptual enmascara el texto. Ahora `gw build` avisa cuando el
  proyecto no carga una tipografía del diseño, y no hace nada más: no
  sustituye ni instala.
- **El control le ganó en el nombre.** `JoinOurTeam` sale de lo que dice la
  sección; `ImageCollageSection`, del nombre de la variante en Figma.
- **El writer de tokens falló en Tailwind v4** la primera vez que tuvo que
  escribir algo, y ese brazo tuvo que esquivarlo. Se reescribió.
- **Distill rechazó una sección de Launch UI.** BentoGrid2x2 está dibujada con
  8 capas en posición absoluta, y sin auto-layout no hay layout que extraer.
  La página siguió con las otras 11. Ese rechazo destapó un bug: el registro de
  la vista se frenaba en la sección salteada. Se arregló, y después se
  construyó la sección aparte.

## Límites — qué NO decir

- **Nada de "pixel-perfect".** Es un non-goal escrito en el README.
- **Nada de responsive.** Los puntajes son al ancho en que se dibujó el diseño.
  A 375 y 768 la misma página da 63% y 65%, porque esos anchos no tienen un
  frame contra el cual medirse. Es un hueco conocido, sin solución todavía.
  Se puede decir "responsive is next" como límite, no como promesa con fecha.
- **No está en npm.** Se instala desde el repo.
- **En el benchmark de página no hubo control:** la sesión sin gridwright no
  pudo abrir el archivo de Figma. No presentar el 98.54% como "contra X".
- **Al brazo control del primer benchmark se le agregaron los atributos
  `data-gw` después**, para poder medirlo: solo atributos, sin tocar el
  layout. Si alguien pregunta por la metodología, se dice.
- **Nada de proyectos de clientes.** Forebound, Santillana y cualquier otro
  son privados. Solo Launch UI y Untitled UI, que son públicos.

## Imágenes as found (rutas absolutas)

Todo es captura real. El manual pide blanco y negro con contraste 1.35, y el
azul baranda para una sola cosa por pieza: el candidato natural es **98.54%**.

| Qué | Ruta |
|---|---|
| Diseño y render, página completa, lado a lado (1600×4745) | `/Users/lucianobalbiano/Documents/PersonalRepos/gridwright/docs/benchmark-launch-ui.jpg` |
| Diseño de Figma, página completa (2370×14157) | `/Users/lucianobalbiano/Documents/PersonalRepos/bench-gw/.gridwright/baselines/LandingPage/figma.png` |
| Render de gridwright a 1440 (1440×8599) | `/Users/lucianobalbiano/Documents/PersonalRepos/bench-gw/.gridwright/baselines/LandingPage/desktop.png` |
| Baselines de cada sección | `/Users/lucianobalbiano/Documents/PersonalRepos/bench-gw/.gridwright/baselines/<Sección>/` |
| El dashboard de la librería (abrir y capturar) | `/Users/lucianobalbiano/Documents/PersonalRepos/bench-gw/.gridwright/dashboard/index.html` |
| Benchmark con/sin, tres paneles + tabla | `/Users/lucianobalbiano/Documents/PersonalRepos/gridwright/docs/benchmark-untitled-ui.png` |
| Ventanas de terminal (SVG): install, run, verify, protocol, distill, pipeline | `/Users/lucianobalbiano/Documents/PersonalRepos/gridwright/docs/*.svg` |

Para un slide de diseño contra render, recortar el mismo tramo de
`figma.png` y `desktop.png`. El hero es el más legible. Ojo: `figma.png` está
a otra escala, así que hay que escalar a 1440 de ancho antes de recortar la
misma franja.

**No existe todavía:** una grabación de los agentes corriendo en paralelo.
Si se quiere, hay que grabarla; no inventarla.

### Salida de terminal real, para citar tal cual

```
→ 12 sections under "Launch UI / Dark mode / Desktop" — 80 values across the page
    ✓ layout   NavbarDefault            run navbar-default-01 · plan
    ✓ module   HeroDefault              run hero-default-01 · plan
    ✓ module   Logos                    run logos-01 · plan
    ! module   BentoGrid2x2             run bento-grid-2x2-01 — distill failed
    ✓ module   ItemsDefault             run items-default-01 · plan
    …
→ 80 design values against 38 project tokens + 513 from the framework's own scale
  exact  65 — already in the system
  near   7 — using the system's value, drift reported
  new    8 — need a name and a decision
```

```
launch-ui-dark-mode-desktop-01 LaunchUIDarkModeDesktop · view
  14 stages closed · current: report Generate the run dashboard
  sections · 12 of 12 finished
```

```
✗ The IR is not usable.

  7 nodes are absolutely positioned (the tolerated maximum is 5).
  This frame does not use auto-layout, so there is no layout to infer.
  A better prompt will not fix this: it gets fixed in Figma.
```

## Material de trabajo (propuesta, no final)

### Hooks

1. **Introducing Gridwright — a Claude Code plugin that devours Figma files
   with pixel precision, and files every piece exactly where your codebase
   expects it.** ← la recomendada: tiene *devours* y precisión, y la segunda
   mitad es la organización.
2. Introducing Gridwright: a Claude Code plugin that eats Figma for breakfast.
   12 sections, one agent each, 98.5% fidelity at the design's own width.
3. Introducing Gridwright. It devours your Figma with surgical precision and
   leaves your codebase more organized than it found it.

Hay que pasar el check de `linkedin-content`: leer la primera línea sola.
Además tiene que entrar en los ~210 caracteres antes del "see more".

### Borrador de cuerpo (inglés, ~1150 caracteres; el hook tiene 162)

> Introducing Gridwright — a Claude Code plugin that devours Figma files with
> pixel precision, and files every piece exactly where your codebase expects it.
>
> Point it at a Figma page. It finds the sections, spins up one agent per
> section, builds them in parallel, composes the page, and measures the result
> against the design.
>
> Last test, a public landing page: 12 sections, one agent each, built side by
> side, 98.5% fidelity at 1440px, 65 of 80 design values matched to tokens the
> project already had, every section registered in the component library.
>
> The trick isn't a better prompt. A prompt is a suggestion: agents skip steps
> whenever a task looks easy. So I moved the workflow into a CLI with a state
> machine on disk. Claude doesn't decide what comes next — it asks, does the
> part that needs judgment, and the CLI checks the work.
>
> Same component, same agent, without Gridwright: 89% against 99.8%. The
> control guessed the brand colour, used placeholder images, and laid the grid
> out with position: absolute.
>
> Where it stands: scores are at the width the design was drawn at. Responsive
> is next.
>
> Open source, MIT. Links in the first comment.

A revisar con él: el largo y si entra el párrafo del benchmark con/sin, o si
va solo en el carrusel.

### Carrusel (1080×1350, manual)

Una idea por slide. La 1 se entiende sola.

1. **El hook.** "Introducing Gridwright", más *devours Figma*, más **98.54%**
   en baranda.
2. **El problema.** *A prompt is a suggestion.* El agente saltea pasos cuando
   el pedido parece fácil.
3. **El método.** `gw next → do → gw done`, con la ventana de terminal real
   (`docs/protocol.svg` o `run.svg`).
4. **Diseño contra render.** Mismo recorte de `figma.png` y `desktop.png`, en
   blanco y negro.
5. **Doce agentes.** La salida real de las 12 secciones y la tabla por sección.
6. **Con y sin.** 99.8 contra 89, y `position: absolute` como el dato que
   perturba.
7. **Lo que se rompió.** La tipografía que el puntaje no vio, y la sección que
   distill rechazó.
8. **Dónde está.** Responsive es lo próximo; open source, MIT.

## Links para el primer comentario

(Los links nunca van en el cuerpo del post, regla de `linkedin-content`.)

- Repo: https://github.com/BalbianoLuciano/gridwright
- La página entera: https://github.com/BalbianoLuciano/gridwright#a-whole-page
- El benchmark con/sin: https://github.com/BalbianoLuciano/gridwright#against-the-same-agent-without-it
- Launch UI (Figma): https://www.figma.com/community/file/1420131743903900629/launch-ui-landing-page-templates-components
- Untitled UI FREE (Figma): https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0

[Launch UI]: https://www.figma.com/community/file/1420131743903900629/launch-ui-landing-page-templates-components
[Untitled UI FREE v2.0]: https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0
