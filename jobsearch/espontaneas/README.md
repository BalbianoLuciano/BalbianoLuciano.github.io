# Canal de postulaciones espontáneas

La espontánea es el único canal donde se elige a quién escribirle. El aviso te
pone en una pila; la espontánea te pone antes de la pila. Por eso acá el cuello
de botella no es escribir el mensaje —eso lo resuelve `generar.mjs`— sino
**conseguir buenos objetivos y buenos ganchos**.

## Cómo se usa

1. **Cargar objetivos** en `objetivos.csv`: una fila por persona o empresa.
2. **Generar**: `node jobsearch/espontaneas/generar.mjs --archivo`
   Deja `salidas/YYYY-MM-DD.md` con todos los mensajes listos para copiar, con
   el conteo de caracteres y un aviso si un DM pasa los 500.
3. **Enviar a mano** y marcar `estado` en el CSV (`enviado`, `respondio`, `no`).
4. **Seguimiento a los 7 días** con la plantilla `seguimiento`, una sola vez.

Opciones: `--canal dm-es` para un solo canal, `--limite 20` para cortar la tanda.

## Las columnas de `objetivos.csv`

| Columna | Qué va |
|---|---|
| `canal` | `dm-es` · `dm-tecnico` · `mail-es` · `mail-en` · `seguimiento` |
| `idioma` | `es` o `en` (define de qué banco sale la prueba) |
| `persona` | Nombre de pila. Vacío si es un mail genérico de empresa |
| `empresa` | — |
| `rol` | El de la persona: recruiter, CTO, fundador |
| `gancho` | **Lo que más pesa.** Algo verificable del otro: un post suyo, qué hace el producto, con qué stack trabajan. Si no hay gancho real, no va la fila |
| `prueba` | Una clave del banco de `PLANTILLAS.md`: `hornero`, `pericias`, `prolicht`, `malmberg`, `ia`, `gridwright`, `lit`, `ecommerce` |
| `stack` | Las 3 o 4 tecnologías del lado de ellos que él tiene de verdad |
| `contacto` | Mail o URL del perfil |
| `estado` | `pendiente` (default) · `enviado` · `respondio` · `no` |

## Lo que hay que saber antes de perseguir el número

El objetivo es 100 solicitudes por día entre todos los canales. Dónde entra cada
cosa, y dónde están los techos reales:

| Canal | Por día | Techo |
|---|---|---|
| Easy Apply y portales (LinkedIn, InfoJobs, Workana) | 50-60 | Ninguno fuerte: lo resuelve la extensión `autofill` |
| Avisos del feed con mail o formulario | 15-25 | Cada uno necesita leer el aviso; es donde entra `/aplicar` |
| Espontáneas por mail (Apollo) | 20-30 | **La reputación del remitente.** Ver abajo |
| Espontáneas por DM de LinkedIn | 15-20 | **LinkedIn limita las invitaciones a ~100 por semana** |

**El límite de LinkedIn es el primero que se choca.** Las invitaciones con nota
a gente que no es contacto rondan las 100 semanales, así que por DM no hay forma
de sostener 20 por día todos los días. Lo que sí escala es el mail.

**Apollo sirve para encontrar, no para disparar.** Es bueno para sacar la
persona que decide y su mail verificado. Mandar desde `balbiano06@gmail.com` en
tandas grandes es la forma más rápida de que los mails caigan en spam y de
arruinar una casilla que después se necesita para los procesos reales. Si se va
a hacer volumen por mail, conviene un dominio propio para eso.

**El riesgo real no es el no, es el no-leído.** Un mensaje sin gancho específico
no lo contesta nadie, y el tiempo rinde más en 30 bien apuntados que en 100
genéricos. La parte cara es la investigación: por eso el CSV tiene una columna
`gancho` obligatoria y el mensaje se arma solo.

## Nada se envía solo

El generador deja texto para copiar. No manda mails, no abre LinkedIn, no
automatiza el envío: el sistema genera, la persona decide.
