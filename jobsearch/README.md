# Búsqueda laboral

Contexto y borradores de la búsqueda de Luciano. No es parte del sitio: Astro
solo compila `src/pages` y `public/`, así que nada de acá se deploya.

## Cómo se usa

En una terminal de Claude Code parado en este repo:

```
/aplicar https://jobs.lever.co/empresa/puesto
/aplicar <pegá el mail que te llegó>
/aplicar <pegá la descripción del puesto>
```

Sale un borrador listo para copiar, un archivo en `aplicaciones/` y una fila en
el tracker.

## Los archivos

| Archivo | Qué es |
|---|---|
| `PERFIL.md` | Experiencia, proyectos, números, stack. La fuente de verdad. |
| `VOZ.md` | Cómo escribe Luciano, con una muestra real y las reglas que salen de ahí. |
| `TIPOS.md` | Los cuatro tipos de aplicación (mail, form, easy, md) y qué entrega cada uno. |
| `TRACKER.md` | Estado de todas las aplicaciones. |
| `aplicaciones/` | Un archivo por aplicación. |

El comando vive en `.claude/commands/aplicar.md`.

## Privacidad

`aplicaciones/` y `TRACKER.md` están en `.gitignore`: nombran empresas, personas
y a veces montos. Este repo es público.

`PERFIL.md`, `VOZ.md` y `TIPOS.md` sí se commitean — son el CV público más una
guía de estilo.
