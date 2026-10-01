# Cómo se llega a 100 solicitudes por día

Objetivo fijado por Luciano el 2026-10-01: **100 por día entre todos los canales.**
El reparto no es parejo: el volumen barato está en los portales, y el volumen
caro —el que convierte— está en las espontáneas.

## El reparto

| # | Canal | Por día | Cuánto cuesta cada una | Herramienta |
|---|---|---|---|---|
| 1 | LinkedIn Easy Apply | 40 | ~1 min | `autofill` |
| 2 | InfoJobs (inscripción rápida, España) | 15 | ~1 min | `autofill` + carta guardada |
| 3 | Otros portales: Get on Board, Bumeran, Computrabajo, Workana | 12 | ~1,5 min | `autofill` |
| 4 | Avisos del feed con mail o formulario | 10 | ~5 min | `/aplicar` |
| 5 | Espontáneas por mail | 18 | ~3 min | Apollo + `espontaneas/generar.mjs` |
| 6 | DM de LinkedIn a recruiters | 15 | ~2 min | `espontaneas/generar.mjs` |
| | **Total** | **110** | **~4 horas** | |

Se apunta a 110 para que el día que un canal se seca igual se llegue a 100.

## El orden del día

**Bloque 1 — 90 minutos, lo mecánico.** Portales: Easy Apply, InfoJobs y el
resto (67 solicitudes). Es repetitivo y no requiere pensar: se hace primero para
que el número esté asegurado temprano.

**Bloque 2 — 60 minutos, lo que decide.** Los 15 DMs y los 18 mails espontáneos.
Acá va la cabeza: buscar la persona, leer qué hace la empresa, escribir el
gancho en `objetivos.csv`. El mensaje lo arma `generar.mjs`.

**Bloque 3 — 60 minutos, lo que mejor convierte.** Los 10 avisos del feed con
`/aplicar`, que son los únicos donde se lee el aviso entero y se responde a lo
que piden. De acá salieron los procesos que avanzaron.

**Cierre — 10 minutos.** Marcar estados en `objetivos.csv` y en `TRACKER.md`.

## Los dos techos reales

**LinkedIn: ~100 invitaciones con nota por semana.** 15 por día son 105 si se
hace los siete días: queda justo en el borde. Dos formas de no chocarlo:

- 20 por día de lunes a viernes = 100 exactos, fin de semana libre.
- Priorizar **contactos de 1er grado y perfiles abiertos**, a los que se les
  escribe sin gastar invitación. Ahí no hay techo semanal.

**El mail sale de `balbiano06@gmail.com`** (decisión de Luciano, 2026-10-01).
Gmail personal tolera mal las tandas: el riesgo no es que rebote, es que la
casilla pierda reputación y los mails de los procesos abiertos empiecen a caer
en spam del otro lado. Reglas para convivir con eso:

- **18 por día es el techo**, repartidos en dos tandas y no en una ráfaga.
- Uno por uno, con el nombre de la persona y un gancho distinto. Nunca el mismo
  cuerpo a varios destinatarios, ni copia oculta.
- Sin links acortados ni adjuntos pesados: el CV va como PDF normal.
- Si una semana aparecen rebotes o respuestas automáticas raras, se frena dos
  días.

## Qué se mide

Cada viernes, sobre `objetivos.csv` y `TRACKER.md`:

- Enviadas por canal.
- **Respuestas por canal** (lo único que importa).
- Entrevistas agendadas.

Si un canal no devuelve nada en dos semanas, se reemplaza su cuota por otro. La
hipótesis a validar es que las espontáneas y los avisos del feed convierten
mucho mejor que los portales, aunque sean el 30% del volumen.
