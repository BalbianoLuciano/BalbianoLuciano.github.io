---
target_date: 2026-10-03
status: draft
media: homero.gif (1080x1080, 12 cuadros, 150 ms)
nota: post general sobre cómo se construye el asset; el juego queda como teaser al final
---

# Post — Cómo se construye un personaje de pixel art

Así se arma un personaje de pixel art completo —las cuatro direcciones y su ciclo de caminata— sin dibujar un píxel a mano. Son tres pasos, y el que decide el resultado no es el que parece.

**1. El prompt no describe un dibujo: define reglas.** La diferencia entre un sprite usable y uno lindo pero inservible está acá. El mío tiene seis bloques fijos:

- Estilo y vista: "pixel art, LPC style, 3/4 top-down view".
- Proporciones: "2.5 heads tall, squashed rounded proportions, not realistic, not cute".
- Dónde vive la emoción: "posture carries the emotion, the face has none: dropped shoulders, head slightly forward, short tired stride". A 64 píxeles la cara no entra; el cuerpo sí.
- Cada material con sus colores exactos, en hexadecimal y en tres pasos: camisa #C6DCEA / #A3C3D6 / #7D9CB5. Si no los fijás, cada corrida te devuelve otra paleta.
- Reglas de render: contorno de 1px, sombreado plano de tres pasos, sin dithering, sin antialiasing, sin degradés, sin glow, fondo transparente.
- Negativos: sin sonrisa, sin pose heroica, sin ojos de anime, sin capa, sin arma.

**2. El generador resuelve las poses, no la hoja.** Con una plantilla de caminata salen las cuatro orientaciones y cinco cuadros por fila: uno parado y cuatro de ciclo. Eso es lo que a mano cuesta días.

**3. El ensamblado es código, y ahí se gana o se pierde.** El export viene con cada cuadro centrado en su propio lienzo y el motor necesita una grilla uniforme. Un script mete cada cuadro en una celda de 64×64, clava los pies siempre en el mismo píxel, remapea el negro puro al color de contorno y ordena las columnas y filas como las espera el motor. Hecho a ojo, el personaje patina al girar.

La regla que hace que esto escale a cuarenta assets: el PNG no se toca nunca. Si algo sale mal se arregla en el prompt o en el script, y el día que el personaje cambie, la hoja se regenera sola.

¿Protagonista de un juego? Puede ser. Pronto les cuento.

#pixelart #gamedev #ia #promptengineering

---

## Notas de armado

- **Imagen**: `homero.gif`, las cuatro direcciones caminando a la vez, una por
  cuadrante, sobre hormigón `#A8A49B` con la trama de tensores y las juntas de
  panel del manual de marca. Escalado ×7 con vecino más cercano.
- El prompt completo está en el repo del juego, en
  `docs/arte/prompts/nivel-01/char_homero_pixellab_description.txt`. En el post
  va recortado a su estructura: seis bloques y dos ejemplos.
- El juego no se nombra: queda como teaser en la última línea.
