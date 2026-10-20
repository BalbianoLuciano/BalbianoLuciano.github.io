---
description: Arma la guía HTML para una entrevista agendada, con respuestas en la voz de Luciano y modo práctica
argument-hint: [link del aviso + empresa, etapa, fecha y quién entrevista]
---

# Modo entrevista

Luciano tiene una entrevista agendada. Tu trabajo es armarle una **guía HTML** para
leer la noche anterior y practicar en voz alta: qué decir en los primeros minutos,
qué le van a preguntar, cómo contestar cada cosa con hechos suyos, cómo nombrar lo
que no tiene y qué preguntar él.

`/aplicar` optimiza lo que la empresa **lee**; `/entrevista` optimiza lo que
**escucha**. El puente es la consistencia: el entrevistador leyó el CV y el mensaje
que se mandó, así que nada de lo que se diga en la llamada puede contradecirlos ni
ir más allá de ellos.

Lo que te pasó:

$ARGUMENTS

---

## Paso 0 · Leé, una sola vez

1. `jobsearch/PERFIL.md` — los hechos. **Lo único que se puede afirmar.**
2. `jobsearch/VOZ.md` — cómo habla. Las respuestas tienen que sonar a él.
3. `jobsearch/PRIVADO.md` — expectativa salarial, ciudadanía y la regla del salario.
4. `jobsearch/entrevistas/BANCO.md` — sus historias STAR y sus respuestas a los
   huecos de siempre. Se reutilizan, no se reescriben de cero.
5. El archivo de la aplicación en `jobsearch/aplicaciones/` y su fila en
   `TRACKER.md`. **El mensaje que se mandó es lo que el entrevistador leyó.**
6. `mem_search` (proyecto `busqueda-laboral`) con el nombre de la empresa: etapas
   anteriores, feedback, contactos.
7. La guía HTML más reciente de `jobsearch/entrevistas/` — es la **plantilla**:
   mismo CSS, misma barra (modo práctica, abrir todas, cronómetro, tema) y mismo
   script. Se copia, no se rediseña.

## Paso 1 · El aviso y la entrevista

- El aviso con `WebFetch`. Si falla, pedile que lo pegue. No se inventa a partir
  del dominio.
- Si no está claro, preguntá: **etapa** (screening con RRHH, técnica, live coding,
  caso, final), **fecha y hora** (con GMT, sin ciudad), **formato** (Meet, Zoom,
  presencial) y **quién entrevista** (nombre y cargo).
- Si falta el archivo de la aplicación, creá uno mínimo en `aplicaciones/` y la
  fila en el tracker.

## Paso 2 · Investigación, verificada

- **La empresa**: qué hace, producto, clientes, tamaño, stack público, noticias
  recientes. Cada dato que entre a la guía tiene que estar confirmado con
  `WebFetch` o `WebSearch`. Un dato falso dicho con seguridad en una entrevista es
  peor que no decir nada.
- **Quién entrevista**: solo información profesional pública. Anotá qué va a
  buscar según su rol:
  - **RRHH o Talent**: coherencia de la trayectoria, motivación, salario, disponibilidad, inglés.
  - **Hiring manager o líder**: encaje con el equipo, autonomía, cómo trabaja.
  - **Ingeniero senior o CTO**: profundidad técnica, decisiones y su porqué.
- **2 o 3 ganchos**: cosas concretas y verificadas de la empresa que él pueda
  nombrar con naturalidad en "¿por qué nosotros?".

## Paso 3 · La guía

Archivo: `jobsearch/entrevistas/YYYY-MM-DD-<empresa>-<etapa>.html`. En español,
con lo que se dice en voz alta en el idioma de la entrevista. Si es en inglés,
frases cortas de B2 real, que se puedan decir sin trabarse.

Secciones, en este orden. Se adaptan a la etapa, pero no se saltean:

1. **Ficha**: quién, cargo, etapa, fecha y hora (GMT), formato, puesto, empresa,
   rango salarial si se publicó.
2. **El criterio**: qué decide esta etapa y qué tiene que pasar para avanzar, en
   tres líneas.
3. **Logística**: qué verificar antes (hora, link, cámara), qué tener abierto.
4. **Los primeros minutos**: el "contame de vos" casi textual, en un bloque
   `.decir` para cronometrar en 90 segundos.
5. **Dónde estás parado**: tabla requisito → lo que tiene → veredicto
   (arriba, en la barra o debajo), sin maquillaje.
6. **La empresa y por qué ella**: los ganchos verificados.
7. **Preguntas probables**, en bloques `.q` (los tapa el modo práctica). Se sacan,
   en este orden de prioridad:
   1. el feedback de etapas anteriores;
   2. los huecos de la tabla (son lo primero que preguntan);
   3. los requisitos del aviso, uno por uno;
   4. el tipo de etapa:
      - **screening**: motivación, por qué te vas, salario, disponibilidad;
      - **técnica**: el stack y las decisiones;
      - **final**: valores, dudas y negociación.

   Cada pregunta lleva una pista de qué buscan y una respuesta modelo en
   `.decir`, armada con una historia STAR del banco.
8. **Consistencia**: los números y afirmaciones del CV y del mensaje enviado que
   más probablemente le pregunten, cada uno con **de dónde sale** y cómo
   defenderlo en dos repreguntas.
9. **Cuando no sabés**: el molde de tres pasos —no lo hice, lo más cercano es X,
   la diferencia es Y— y las variantes para los huecos de este aviso.
10. **Salario y condiciones**: el número según la regla de `PRIVADO.md` (si hay
    rango publicado y supera su base, el punto medio) y la frase para decirlo.
11. **Preguntas para hacerle**: de 4 a 6, según la etapa. Se descartan las que la
    investigación ya responde.
12. **Lo que no se dice**: la lista de `VOZ.md` y `PERFIL.md`, más lo propio de este
    aviso.
13. **Cómo practicar hoy**: tres o cuatro pasos concretos.
14. **Fuentes**: de dónde sale cada dato, en una línea de `.cita`.

## Paso 4 · El banco

Si para esta guía armaste una historia STAR o una respuesta a un hueco que no
estaba en `BANCO.md`, agregala ahí. El banco crece con cada entrevista, y la
próxima guía arranca desde él.

## Paso 5 · Mostrar y practicar

- Abrí el HTML (`open <archivo>`) y resumí en el chat, en 5 líneas, lo que más
  importa: los huecos que van a salir y las dos o tres respuestas a tener sin pensar.
- Ofrecé un **simulacro** en el chat. Funciona así:
  1. Arrancá por preguntas fáciles, seguí con las técnicas o las de la etapa,
     después una o dos de comportamiento y cerrá con una incómoda.
  2. Una pregunta por turno.
  3. Después de cada respuesta, una devolución corta: qué funcionó, qué ajustar y
     qué historia del banco servía mejor.
  4. Calibrá contra su voz, no contra un ideal genérico.

## Paso 6 · Después

Cuando cuente cómo le fue, anotá en el archivo de la aplicación la etapa, la fecha y
lo que le preguntaron o le dijeron, textual si se acuerda. Actualizá la fila del
tracker y guardá en memoria. **El feedback de una etapa es lo que más vale para la
siguiente.** Ofrecé un agradecimiento corto para quien entrevistó.

## Reglas que no se rompen

- **Nada que no esté en `PERFIL.md`.** Si en la preparación aparece un dato nuevo
  (un número que recuerda, un alcance que corrige), se escribe en `PERFIL.md`. Un
  dato que vive solo en la guía después parece inventado.
- **Los huecos se nombran** con el molde de tres pasos. Nunca se describe algo
  parecido con el tono de quien sí lo hizo.
- **El 70% de Gridwright es su dato, no el del A/B** (lo confirmó el 2026-10-16;
  ver `VOZ.md` y `BANCO.md`). Va como lo que vio en su equipo, con la respuesta
  lista para "¿cómo lo mediste?": lo medido con protocolo es la fidelidad.
- **La ciudad**: en mensajes no se nombra. Si la preguntan directo, la respuesta
  es Resistencia, Chaco, que viaja a Buenos Aires sin problema y está abierto a
  mudarse.
- **Los nombres de clientes de la agencia** no se dicen. Va "una editorial
  educativa", "un fabricante de iluminación".
- **No hables mal** de ningún empleador ni cliente.
