---
project: learn-java-by-building-a-university
target_date: 2026-10-09
status: draft
media: learn-java-carrusel.pdf (7 slides, 1080x1350)
---

# Post — Learn Java by Building a University (EN)

Java and Three.js in the same project sounds like a mistake. It isn't: the JVM runs your code and a 3D scene shows what it built, and the bridge between them is the debugger.

Here's the problem I was trying to solve. You can't see an object. `new` shows nothing, a reference shows nothing, and two variables pointing at the same object look exactly like two different objects. All a beginner gets back is text about something nobody ever saw.

So I built an open course where you do see it: you write real Java, you run it, and an isometric 3D model shows you what your code built.

Every concept has one shape, always the same:
— a class is a blueprint in thin line
— an object is a building that grows out of its island, with its serial plate: FacultadRegional #1
— a reference is a label hanging from the building
— composition is an attached island joined by a small bridge
— a constructor is a crane working while it runs

Two buildings with the same serial plate are the same object. That's `==` shown instead of explained.

The part I care about most: the scene doesn't interpret your code, it watches it run. The backend executes the program in an isolated environment and reads the state through JDI, the JVM's own debugging interface. What appears in the model are the objects that actually existed, and every line of feedback points back at a line you wrote.

The domain is real too: it models the Universidad Tecnológica Nacional as it is — 30 regional faculties, one rectorate, the requirements to be a dean — straight from its charter.

20 challenges, four modules, online and no signup: ljbu.balbiano06.workers.dev

What's missing is the beta with students. If you teach OOP and want to run it with your course, get in touch.

#java #threejs #opensource #oop #education

---

## First comment

The links, and the parts worth explaining:

App: https://ljbu.balbiano06.workers.dev
Repo: https://github.com/BalbianoLuciano/learn-java-by-building-a-university

**How the model is built.** The scene isn't an animation of what the code should
do: it's a reading of what it did. The backend compiles and runs the student's
program and inspects it through JDI, the JVM's own debugging interface, so every
piece on screen maps to an object that actually existed, with its real field
values and identity. That's also why `==` can be shown instead of explained: two
buildings with the same serial plate are the same object.

**Running a stranger's Java safely.** There is no SecurityManager any more — it
was deprecated in 17 and disabled for good in 24 — so isolation is layered:
input validation, controlled compilation, a bytecode allowlist, an isolated
process with time, memory, output and object-count limits, and a runner that
holds no secrets and no privileges. No accounts, no student code stored.

**The visual language.** A class is a blueprint, an object is a building that
grows out of its island, a reference is a label hanging from it, composition is
an attached island joined by a small bridge, and a constructor is a crane
working while it runs. Fixed isometric camera, no free rotation: the same
concept always has the same shape in the same place.

**The domain is real.** Everything models the Universidad Tecnológica Nacional
as it actually is — 30 regional faculties, one rectorate, the requirements to be
a dean, the governing bodies — sourced from its Estatuto. It's an independent
project, not an official UTN site.

**Stack.** Java 25, Spring Boot 4 and JDI on the back. React, TypeScript, Vite,
Monaco and Three.js (React Three Fiber) on the front. Railway and Cloudflare for
deploys. Code is MIT, educational content CC BY-SA 4.0.

**Status.** The 20 challenges across four modules are playable end to end. What's
missing is the beta with real students: if you teach OOP and want to run it with
your course, I'd like to hear from you.

---

---

## Notas de armado


- **Carrusel**: `learn-java-carrusel.pdf`, 7 slides en el contrato visual del
  manual (`/marca`), generado con `node render.mjs` igual que el de Gridwright.
- **Las capturas van en color**, que es la única excepción al monocromo: el
  punto del post es que se vea la escena de Three.js. Se tomaron del canvas
  directamente, así que no arrastran el cromo del navegador.
- Fuente de las capturas: la app en producción, home y desafío m1-01 corrido.
