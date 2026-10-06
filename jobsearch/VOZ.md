# Voz — cómo escribe Luciano

> Todo lo que se redacte en su nombre tiene que sonar a él. Este archivo es la
> referencia. Ante la duda, releer la muestra de abajo y comparar el ritmo.

## La muestra

Escrita a mano por él, a una clienta, cerrando un presupuesto:

> Hola Janeth! Como estas? Debajo de este mensaje te adjunto el documento,
> entiendo que lo que buscabas es una comparación de presupuestos entonces te
> facilité en la primera hoja luego de la portada el mismo así podes ver que te
> parece.
>
> Más allá de lo propuesto en el monto final (que es el presupuesto que manejamos
> para realizar todo lo que solicitaste y más), entiendo que tenes una propuesta
> paralela y por eso quería comentarte brevemente porque trabajar con nosotros.
>
> Estamos hace 5 años en este rubro y nos encontramos con todo tipo de
> situaciones, no es un monto por solamente realizarte el trabajo, sino que
> ofrecemos también potenciar cualquier idea que tengas en mente. Ofrecemos
> también algo personalizado, no empaquetado y que puede escalar para futuras
> ideas o soluciones que necesites en un futuro donde tu marca y emprendimiento
> crezcan.
>
> Cualquier cosa que quieras comentar sobre el documento, me avisas y lo vemos en
> una reu para aclarartelo.
>
> Estamos en contacto!

## Las reglas que salen de ahí

**1. Voseo rioplatense.** Tenes, podes, quieras, avisas, buscabas, solicitaste.
Nunca "tú", nunca "usted". Si el destinatario es español, el voseo se mantiene —
es su voz, no un error.

**2. Abre nombrando lo que el otro necesita, no lo que él quiere.**
"entiendo que lo que buscabas es una comparación de presupuestos". Primero el
problema del otro, después la propuesta.

**3. Nombra el elefante en vez de esquivarlo.**
"entiendo que tenes una propuesta paralela y por eso quería comentarte". Sabe que
hay competencia y lo dice. Aplicado a búsqueda laboral: si le falta algo que el
aviso pide, lo dice y explica con qué lo cubre.

**3-bis. Pero no todo hueco es un elefante.**
Nombrar el que es material y se va a descubrir igual —el nivel de inglés, un
cloud que no tocó— es honestidad y juega a favor. Ofrecer un año de diferencia
en un requisito de años no lo es: no es una carencia de capacidad, nadie lo
verifica, y abrir con eso les regala el filtro antes de que lean nada.

La prueba: **¿lo van a descubrir solos, y cambia si puede hacer el trabajo?**
Si las dos son sí, se dice. Si alguna es no, se calla y se contesta si preguntan.

**4. Vende con hechos, no con adjetivos.**
"Estamos hace 5 años en este rubro y nos encontramos con todo tipo de
situaciones" — no dice "somos expertos". Nunca escribir "apasionado",
"proactivo", "orientado a resultados". Decir el hecho y que el adjetivo lo ponga
quien lee.

**5. Frases largas encadenadas con comas. Párrafos de 2 a 4 líneas.**
Cero bullets en un mail. Cero negritas. El texto fluye.

**6. Cierra con una puerta abierta, no con un pedido.**
"me avisas y lo vemos en una reu" · "Estamos en contacto!". Nada de "quedo a la
espera de su respuesta".

**7. Saludo corto y cálido.** Nombre de pila + exclamación. "Hola Janeth! Como
estas?". Si no sabe el nombre: "Hola! Como andan?" o directo al asunto.

## El segundo registro: cuando explica algo técnico

El mail a Janeth es su registro **comercial**. Pero cuando contesta una pregunta
técnica escribe distinto, y también es él. Esta respuesta la escribió para un
formulario de Humand, sobre la automatización más compleja que construyó:

> El problema: cada portal pide los mismos datos con nombres distintos, y copiar
> y pegar cuesta más tiempo que escribir la aplicación. Lo difícil no es escribir
> en un input: es reconocer qué campo es cuál cuando el HTML no colabora, y
> lograr que el valor quede efectivamente registrado.
>
> Lo segundo fue el hallazgo. Greenhouse, Lever y Ashby son React, y React
> descarta `element.value = x`: compara contra el último valor que escribió él
> mismo, ve que coincide y concluye que no cambió nada. El campo se ve lleno y el
> formulario se envía vacío. La solución es invocar el setter nativo del
> prototipo, que saltea el descriptor que React instaló en la instancia.
>
> El resultado: un diccionario de 38 campos y 385 formas de pedirlos en cinco
> idiomas [...]. 90 tests, ocho calcados de un formulario real. Decidí no usar un
> LLM: las heurísticas cubren el caso y el modelo queda documentado como último
> escalón.

**Qué cambia respecto del registro comercial:**

- Frases **cortas y declarativas**. Nada de encadenar con comas.
- Encabeza los párrafos nombrando qué viene: "El problema:", "Lo segundo fue el
  hallazgo.", "El resultado:".
- Cuenta el bug con precisión y sin adornarlo. Explica *por qué* falla, no solo
  que falla.
- **Cierra justificando una decisión**, incluida la de no hacer algo: "Decidí no
  usar un LLM". Eso es lo que lo separa de alguien que solo enumera tecnologías.
- Números concretos: 38 campos, 385 formas, 90 tests, cinco idiomas.
- Admite el límite en vez de inflarlo: "conozco el modelo [...] pero mi
  experiencia productiva es con orquestación en código".

**Cuál usar**: comercial para mails y notas a personas. Técnico para respuestas
de screening, cover letters con contenido y challenges escritos. La regla es el
destinatario: si del otro lado hay alguien de RRHH, comercial; si hay alguien que
va a leer el código, técnico.

## El largo del detalle técnico

Corrección del 2026-09-04, sobre un borrador que él rechazó tres veces.

**En un primer contacto no va el detalle fino de stack.** Cosas como *"corre
sobre Next y React 19 con Postgres detrás"* o *"row-level security en vez del
ORM"* son para el CV, para el portfolio o para la entrevista técnica — no para
el mail de presentación. En un primer mail suenan a que uno se está luciendo.

Va la versión general: **"React y TypeScript"**, y listo. Lo específico se
cuenta cuando lo preguntan.

**La estructura simple funciona mejor que la ingeniosa.** Sus palabras: *"Hola X,
te escribo porque tal, soy tal, me destaco con tal y puedo aportar tal"*. Tres
intentos de abrir con una tesis sobre el negocio del otro fallaron; el que
funcionó abre diciendo para qué escribe y sigue contando quién es.

**Y lo de Arquitectura y Urbanismo no va en avisos de IT.** No es relevante y
distrae. Si el diseño viene al caso, alcanza con decir que le gusta el diseño.

## La corrección ortográfica

Él escribe rápido y se come tildes ("Como estas", "porque" por "por qué",
"aclarartelo"). **Eso no se replica.** En una aplicación laboral las tildes van
puestas. Lo que se replica es el *ritmo*, no los errores de tipeo.

El resultado tiene que leerse como él escribiendo con cuidado, no como otra
persona escribiendo por él.

## Prohibido

Estas frases matan el texto y se notan a un kilómetro:

- "Me dirijo a usted" / "Por medio de la presente"
- "Apasionado por la tecnología" / "Entusiasta de la IA"
- "No dudes en contactarme" / "Quedo a la espera de tu respuesta"
- "Estoy emocionado de aplicar" / "I'm excited to apply"
- "Creo que sería un gran fit" / "encajo perfecto en el rol"
- "Sinergia", "disruptivo", "impacto transformador", "pasión por el código"
- Listas con bullets dentro de un mail
- Abrir el mail hablando de sí mismo
- Repetir el CV en prosa (quien lee ya lo tiene adjunto)
- **Decir dónde vive.** Regla de Luciano del 2026-10-05: "no utilizar que vivo
  en Buenos Aires en ningún mensaje". La ciudad no aparece nunca, en ningún
  canal ni idioma. Lo que sí va: "trabajo en remoto" y, para Europa, la
  ciudadanía española. Si un aviso exige ubicación y hay que preguntar por el
  remoto, se pregunta sin decir desde dónde ("¿la posición contempla trabajo
  en remoto?"). La franja horaria se da como horas con su GMT, sin nombrar la
  ciudad.

## En inglés

La misma voz, sin traducir literal. Directo, cálido, frases largas, sin
corporativismo. Registro de alguien que escribe bien en inglés pero no es nativo:
claro y sin modismos forzados.

Abre con "Hi <nombre>," y cierra con "Talk soon" o "Looking forward to it" —
nunca "Best regards" a secas ni "Yours sincerely".

## Con recruiters: un poco más formal

Corrección del 2026-09-15, en sus palabras: *"un poquito más formal los
mensajes, 'si les sirve' suena raro"*.

La muestra de Janeth es cómo le escribe a una **clienta**. A una recruiter o a
un mail de selección le escribe con el mismo ritmo pero un escalón más formal.
El voseo se queda.

| En vez de | Va |
|---|---|
| "Hola Jorge! ¿Cómo estás?" | "Hola Jorge, ¿cómo estás?" |
| "hoy lidero" | "actualmente lidero" |
| "estoy en Buenos Aires" / "resido en Buenos Aires" | (se saca: la ciudad no se nombra, ver Prohibido) |
| "no los usé, lo aclaro de entrada" | "quiero aclarar que no los utilicé en producción" |
| "¿Te paso el CV?" / "Te dejo el CV" | "¿Te puedo enviar mi CV?" / "Con gusto te envío mi CV" |
| "si te sirve lo vemos en una reu" | "quedo disponible para coordinar una entrevista" |
| "Cualquier cosa me escribís por acá!" | (se saca) |
| "Saludos!" | "Saludos cordiales,\nLuciano Balbiano" (en mails) |

Nunca: "si te sirve", "si les sirve", "reu", "cualquier cosa". Sigue prohibido
"quedo a la espera de su respuesta": "quedo disponible para coordinar" ofrece
algo, no espera.

Los mensajes de Dmeter desde el perfil de Bautista siguen con su plantilla.

**El portfolio va siempre, también en los mails.** Un recruiter abre un link
antes que un PDF, y ahí ve los proyectos. En el CV la URL está, pero enterrada.
Va pegado al cierre:

- Mail: "Te adjunto mi CV y te comparto mi portfolio, con los proyectos en
  detalle: https://balbianoluciano.github.io. Quedo disponible para coordinar una
  entrevista."
- DM: "Mi portfolio: https://balbianoluciano.github.io. ¿Te puedo enviar mi CV?"

Si el DM se pasa de 500 caracteres al sumarlo, se recorta el resto: el link se
queda.

## Cuando es un proyecto, no un empleo: se escribe como Dmeter

Regla del 2026-09-14. Si el aviso busca a alguien para **construir un proyecto**
(freelance, "profesional independiente o equipo chico", piden propuesta
económica), el mensaje no va como Luciano candidato: va como **Dmeter**, y sale
**desde el perfil de Bautista**, su socio. Primera persona de Bautista.

La plantilla es la que usa Bautista:

> Hola <nombre>! ¿Cómo estás? Acabo de leer tu post sobre <lo que busca> y
> tenemos lo que estás buscando.
>
> Somos Dmeter, una software factory conformada, además de mí, por 3
> desarrolladores seniors, y podemos hacernos cargo del proyecto.
>
> https://dmeter.com.ar/es/
>
> Si necesitás despejar cualquier duda, coordinamos una call de 15 minutos y lo
> charlamos.

Sobre esa base se suma lo que el aviso pide ver: un proyecto de Dmeter que se
parezca (con link, si tiene demo abierta), y si piden propuesta, ofrecerla. Corto:
es un DM, no una carta. Plural ("hicimos", "te armamos"), nunca "co-fundé".

**Menos de 500 caracteres.** LinkedIn lo recomienda en el mismo compositor
(mejor tasa de respuesta), y la primera versión de 877 hubo que recortarla.
Y mirar quién publica: si no es técnico, afuera la jerga (multi-tenant, roles y
permisos, definición funcional); queda el proyecto parecido con un link que
pueda probar.

## El largo

- **Mail de aplicación**: 3 párrafos, 150-200 palabras. Nunca más.
- **Nota de Easy Apply**: 4-6 líneas.
- **Respuesta de screening**: lo que pida el campo, sin rellenar.
- **Cover letter en .md**: 250-300 palabras, con subtítulos solo si lo piden.

Si algo se está estirando, es que está repitiendo el CV.

## El largo lo pide la pregunta, no el contador de caracteres

Corrección del 2026-09-24, en sus palabras: *"la pregunta es mucho más simple no
te explayes como un enfermo"*.

Un cuestionario con campos de 1.500 caracteres no pide 1.500 caracteres. Si la
pregunta es *"¿con qué frameworks de PHP has trabajado?"*, la respuesta son dos
líneas: los frameworks, los años y qué hizo con cada uno. Nada más.

**La regla**: contestar lo que se pregunta y parar. El caso, los números y las
versiones se guardan para cuando los pidan, o para la entrevista.

Dónde sí va el desarrollo largo: cuando la pregunta es abierta ("detalle su
experiencia en relación al puesto"), cuando hay que nombrar un hueco y explicar
con qué se compensa, o cuando piden contar cómo resolvió algo.
