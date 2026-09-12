# Spec 001 — Lenguaje de interacción

> Estado: aprobado por Luciano · 2026-08-28
> Reemplaza cualquier patrón previo que lo contradiga.

## Principio rector

**Abrir y descubrir.** El portfolio no es una página que se recorre: es una
superficie que se abre. Cada nivel de profundidad se gana con un click, y ese
click convierte la pantalla entera.

## Ley 1 — Sin scroll vertical

No hay scroll vertical en ninguna parte del sitio.

| Zona | Movimiento permitido |
|---|---|
| Hero split-screen | Scroll vertical **sólo** para separar las dos mitades. Es el único caso. |
| Mapa de proyectos | Ninguno. El pilar y el detalle entran en una pantalla. |
| Detalle de proyecto | Scroll **horizontal** activo. |
| Contacto | Ninguno. Entra en una pantalla. |
| Proceso (SDD) | Ninguno o horizontal. Nunca vertical. |

Si un contenido no entra en una pantalla, se rediseña o se parte en pasos
horizontales. No se resuelve con `overflow-y`.

## Ley 2 — Toda apertura es radial y puntual

Cualquier transición a un nivel más profundo usa la misma máscara: un círculo
que nace **en el punto exacto que se clickeó** y crece hasta cubrir el viewport.

- Origen: el centro del elemento clickeado (no el pixel del cursor), para que
  funcione igual con teclado.
- Radio final: distancia a la esquina más lejana del viewport.
- Duración: 0.9s abrir / 0.7s cerrar, `power2.inOut`.
- El contenido entra con fade + 12px de desplazamiento, 0.45s después del inicio.
- Cerrar invierte la máscara hacia el mismo origen.

Aplica a: Contact, detalle de proyecto, sección de proceso, y todo lo que venga.
**Una sola primitiva, sin excepciones.** Es la firma del portfolio.

## Ley 3 — El overlay vive fuera del contenedor pineado

`ScrollTrigger` pinea `.container` aplicando un `transform`. Un `position: fixed`
dentro de un ancestro transformado se ancla a ese ancestro, no al viewport, y la
máscara aparece en el lugar equivocado. Todo overlay se monta como hermano del
contenedor pineado, en el `Layout`.

## Ley 4 — Mientras hay un overlay abierto, Lenis se frena

`window.lenis.stop()` al abrir, `.start()` al cerrar. Además `body.overflow =
'hidden'`. Si no, el scroll de fondo sigue corriendo detrás de la máscara.

## Accesibilidad

- `Escape` cierra siempre.
- `role="dialog"` + `aria-modal="true"`.
- El foco va al botón de cerrar al abrir.
- `prefers-reduced-motion: reduce` ⇒ duración 0, sin animación pero misma función.

## Consecuencias sobre lo ya construido

- `Projects.jsx` tiene `columns` masonry vertical dentro de un `overflow-y-auto`.
  **Viola la Ley 1.** Se reemplaza por un riel horizontal.
- El `<h2>PROJECTS</h2>` scrollea y desaparece. Al no haber scroll vertical,
  pasa a ser un encabezado fijo del riel.

## Enmienda 2026-09-12 — el mapa de proyectos

El riel horizontal de cards se reemplazó por un **mapa**: detrás de las
compuertas hay pantalla negra y el pilar de piezas del carrusel de Gridwright.
Cada pieza es un proyecto; las juntas son distintas entre cada par y calzan.

- **Hover**: el rótulo con el nombre sigue al cursor. No dispara nada más.
- **Táctil** (no hay hover): después de abrir las compuertas la página sigue
  scrolleando, un tramo de 24vh por proyecto, y cada tramo enciende una pieza
  con su nombre abajo. Tocar la pieza o el nombre la abre. En escritorio la
  página no cambia: son los mismos 65vh de compuertas.
- **Click**: las piezas se ensamblan, la elegida se pinta de luz y el conjunto
  viaja —girando y achicándose si hace falta— a un lugar distinto para cada
  proyecto. El detalle aparece en el vacío que deja.
- **Volver**: click en el vacío, Escape o "Volver al mapa".

Las piezas se ven desde que las compuertas empiezan a separarse: no hay un
momento de pantalla negra vacía.

**No hay un segundo nivel.** El panel es el caso entero —logo, la spec con
restricciones y resultado, qué hace, stack y link— en columnas que siguen hacia
la derecha cuando no entran (Ley 1). El overlay del caso completo se eliminó.
El viaje del pilar es navegar el mismo nivel, así que no usa la máscara radial;
la Ley 2 sigue valiendo para Contacto y Dmeter.

La captura no se muestra como foto: se arma con los puntos de los tensores (la
trama de las compuertas), y al pasar el mouse queda la foto en B/N.

## Cursor

- Con las compuertas cerradas, "Try scrolling" acompaña al cursor todo el
  tiempo. Se apaga cuando empiezan a abrirse y sobre cualquier cosa clickeable.
- Un solo cursor en todo el sitio: una flecha de chapa cortada a escuadra, en
  vacío con borde de luz y el agujero del tensor en la punta. No cambia sobre
  lo clickeable; eso lo dicen el hover y el rótulo.
