---
project: learn-java-by-building-a-university
target_date: 2026-10-09
status: draft
media: learn-java-carrusel.pdf (7 slides, 1080x1350)
---

# Post — Learn Java by Building a University

Un objeto no se ve. Esa es, para mí, la razón por la que la programación orientada a objetos se termina aprendiendo de memoria: `new` no muestra nada, una referencia tampoco, y dos variables que apuntan al mismo objeto se ven igual que dos objetos distintos. Lo único que devuelve la consola es texto sobre algo que nadie vio nunca.

Armé un curso abierto donde eso se ve: escribís Java de verdad, lo ejecutás, y una maqueta 3D isométrica te muestra qué construyó tu código.

Cada concepto tiene una forma, siempre la misma:
— una clase es un plano en línea fina
— un objeto es un edificio que crece desde su isla, con su chapa de serie: FacultadRegional #1
— una referencia es una etiqueta que cuelga del edificio
— la composición es una isla adosada, unida por un puentecito
— un constructor es una grúa sobre la isla mientras corre

Y dos edificios con el mismo número de serie son el mismo objeto. Ahí `==` deja de necesitar explicación.

Lo que más me importó: la maqueta no interpreta el código, lo mira correr. El backend ejecuta el programa en un entorno aislado y lee el estado con JDI, la interfaz de depuración de la propia JVM. Lo que aparece en la escena son los objetos que existieron de verdad, y cada observación de la bitácora apunta a una línea tuya.

El modelo es la UTN real: sus 30 facultades regionales, un único rectorado, los requisitos para ser decano, los órganos de gobierno. Todo sale del Estatuto, así que el dominio no es inventado y se puede discutir.

Java 25, Spring Boot 4 y JDI atrás. React, TypeScript y Three.js adelante.

Son 20 desafíos en cuatro módulos y están online, sin registro: ljbu.balbiano06.workers.dev

Lo que falta es la beta con estudiantes. Si das clases de POO y querés probarlo con tu curso, escribime.

#java #poo #opensource #threejs #educacion

---

## Notas de armado

- **Carrusel**: `learn-java-carrusel.pdf`, 7 slides en el contrato visual del
  manual (`/marca`), generado con `node render.mjs` igual que el de Gridwright.
- **Las capturas van en color**, que es la única excepción al monocromo: el
  punto del post es que se vea la escena de Three.js. Se tomaron del canvas
  directamente, así que no arrastran el cromo del navegador.
- Fuente de las capturas: la app en producción, home y desafío m1-01 corrido.
