# Reglas de Diseño del Portfolio

> ⚠️ **El lenguaje de interacción vive en `specs/001-interaction-language.md`.**
> Esa spec manda sobre este archivo: define que no hay scroll vertical en ningún
> lado (salvo el split del hero), que toda apertura es una máscara radial desde
> el punto clickeado, y dónde se monta cada overlay. Leerla antes de tocar
> cualquier transición.

> **Estas reglas SIEMPRE deben respetarse al hacer cambios en el portfolio.**

---

## 1. Tipografía

### Fuentes Establecidas

1. **Dharma Gothic E** (Adobe Typekit)
   - Uso: Títulos principales, hero titles
   - Peso: Bold
   - Tamaño: 40px - 120px (responsive)
   - Ejemplo: "Full-stack Developer"

2. **Termina** (Adobe Typekit)
   - Uso: Subtítulos, secciones
   - Peso: Medium, Bold
   - Tamaño: 24px - 60px
   - Ejemplo: "Luciano Balbiano"

3. **Outfit** (Google Fonts)
   - Uso: Body text, descripciones, UI elements
   - Peso: 300, 400, 500, 600
   - Tamaño: 14px - 18px

### ❌ NO HACER
```css
/* NO usar otras fuentes */
font-family: 'Roboto', sans-serif;
font-family: 'Inter', sans-serif;
```

### ✅ CORRECTO
```css
/* Títulos principales */
font-family: 'dharma-gothic-e', sans-serif;
font-weight: 700;

/* Subtítulos */
font-family: 'termina', sans-serif;
font-weight: 500;

/* Body text */
font-family: 'Outfit', sans-serif;
font-weight: 400;
```

---

## 2. Colores

### Paleta Principal

```css
/* Backgrounds */
--bg-white: #FFFFFF;
--bg-black: #000000;

/* Text */
--text-primary: #171717;    /* gray-950 */
--text-secondary: #404040;  /* gray-700 */
--text-tertiary: #737373;   /* gray-500 */

/* Cards */
--card-bg: rgba(255, 255, 255, 0.9);
--card-border: rgba(0, 0, 0, 0.1);
```

### Principios de Color

1. **Minimalista**: Predominantemente blanco y negro
2. **Sin gradientes llamativos**: Gradientes sutiles solo en detalles
3. **Contraste alto**: Texto siempre legible
4. **Consistencia**: Los mismos colores en toda la aplicación

### ❌ NO HACER
```jsx
// NO usar colores saturados en fondos grandes
<div className="bg-gradient-to-r from-purple-500 to-pink-500">

// NO usar múltiples colores de acento
<button className="bg-blue-500">
<button className="bg-green-500">
<button className="bg-red-500">
```

### ✅ CORRECTO
```jsx
// Fondos neutros
<div className="bg-white">
<div className="bg-black">

// Cards con transparencia
<div className="bg-white/90 backdrop-blur-md">

// Acentos sutiles en hover/focus
<button className="hover:bg-gray-100 transition-colors">
```

---

## 3. Espaciado

### Sistema de Espaciado (Tailwind)

**SIEMPRE usar Flexbox + Gap, NUNCA margins entre elementos hijos**

### ❌ NO HACER
```jsx
// NO usar margins entre elementos
<div>
  <h1 className="mb-4">Título</h1>
  <p className="mb-6">Texto</p>
  <button className="mt-8">Botón</button>
</div>
```

### ✅ CORRECTO
```jsx
// SÍ usar flex + gap
<div className="flex flex-col gap-4">
  <h1>Título</h1>
  <p>Texto</p>
  <button>Botón</button>
</div>

// Para layouts horizontales
<div className="flex gap-6 items-center">
  <Icon />
  <Text />
</div>
```

### Escala de Espaciado Preferida
- **Extra pequeño**: `gap-2` (0.5rem / 8px)
- **Pequeño**: `gap-4` (1rem / 16px)
- **Mediano**: `gap-6` (1.5rem / 24px)
- **Grande**: `gap-8` (2rem / 32px)
- **Extra grande**: `gap-12` (3rem / 48px)

---

## 4. Animaciones GSAP

### Principios de Animación

1. **Sutiles**: Nunca distraer del contenido
2. **Rápidas**: 0.6s - 1.2s de duración
3. **Suaves**: Easing natural (ease-out, power2)
4. **Con propósito**: Cada animación debe tener una razón

### Configuración Estándar

```javascript
// Animación de fade-in al scroll
gsap.from(element, {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: element,
    start: "top 80%",
  }
});

// Animación de hover (usar CSS cuando sea posible)
```

### ❌ NO HACER
```javascript
// NO animaciones muy largas
duration: 3

// NO movimientos bruscos
ease: "bounce"

// NO animaciones automáticas que se repiten infinitamente
repeat: -1
```

### ✅ CORRECTO
```javascript
// Duración apropiada
duration: 0.8

// Easing suave
ease: "power2.out"

// Triggered por scroll o interacción
scrollTrigger: { ... }
```

---

## 5. Responsive Design

### Enfoque: Mobile First

**SIEMPRE diseñar para móvil primero, luego escalar hacia arriba**

### Breakpoints (Tailwind)
```css
/* Mobile first (default) */
.class { ... }

/* Tablet (768px+) */
@media (min-width: 768px) { ... }
/* Tailwind: md:class */

/* Desktop (1024px+) */
@media (min-width: 1024px) { ... }
/* Tailwind: lg:class */

/* Large desktop (1280px+) */
@media (min-width: 1280px) { ... }
/* Tailwind: xl:class */
```

### ❌ NO HACER
```jsx
// NO empezar con desktop y reducir
<div className="grid grid-cols-3 sm:grid-cols-1">

// NO usar fixed widths que rompan en móvil
<div className="w-[800px]">
```

### ✅ CORRECTO
```jsx
// SÍ empezar con móvil y crecer
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// SÍ usar max-width con responsividad
<div className="w-full max-w-7xl mx-auto px-4">

// Responsive typography
<h1 className="text-4xl md:text-6xl lg:text-8xl">
```

---

## 6. Componentes y Estructura

### Principios de Componentes

1. **Reutilizables**: Crear componentes para elementos que se repiten
2. **Props claros**: TypeScript/JSDoc cuando sea posible
3. **Single Responsibility**: Cada componente hace una cosa bien
4. **Composición**: Preferir composición sobre herencia

### Estructura de Archivos

```
src/
├── components/
│   ├── Projects.jsx          # Componente de sección
│   ├── Contact.jsx           # Componente de sección
│   └── utils/                # Componentes reutilizables
│       ├── ProjectCard.jsx
│       ├── FormField.jsx
│       └── SocialIcon.jsx
├── data/
│   ├── projects.json         # Datos separados del código
│   └── socialLinks.json
└── pages/
    └── index.astro           # Composición de secciones
```

### ❌ NO HACER
```jsx
// NO hardcodear datos en componentes
function Projects() {
  const projects = [
    { title: "Project 1", ... },
    { title: "Project 2", ... }
  ];
}

// NO componentes gigantes con múltiples responsabilidades
function HomePage() {
  return (
    <div>
      {/* 500 líneas de código */}
    </div>
  );
}
```

### ✅ CORRECTO
```jsx
// SÍ separar datos
import projectsData from '../data/projects.json';

function Projects() {
  return projectsData.map(project => (
    <ProjectCard key={project.id} {...project} />
  ));
}

// SÍ componentes enfocados
function ProjectCard({ title, description, tech, image }) {
  return (
    <article className="project-card">
      {/* Componente específico */}
    </article>
  );
}
```

---

## 7. Performance

### Reglas de Optimización

1. **Imágenes**: WebP, tamaños adecuados, lazy loading
2. **Bundle size**: Mantener JS < 200KB
3. **CSS**: Usar Tailwind JIT para purgar clases no usadas
4. **Fonts**: Preload critical fonts

### ❌ NO HACER
```jsx
// NO cargar imágenes pesadas sin optimizar
<img src="project-image-4mb.png" />

// NO importar librerías completas
import _ from 'lodash';
```

### ✅ CORRECTO
```jsx
// SÍ optimizar imágenes y lazy load
<img
  src="project-image-optimized.webp"
  loading="lazy"
  alt="Project description"
/>

// SÍ importar solo lo necesario
import debounce from 'lodash/debounce';
```

---

## 8. Split-Screen Concept

### Concepto Único del Portfolio

El portfolio usa un **split-screen scroll reveal** como característica distintiva.

### Reglas del Split-Screen

1. **Inicial**: Pantalla dividida en dos mitades (50vh cada una)
2. **Superior**: Hero content (título, nombre, social)
3. **Inferior**: Tech stack + contacto
4. **On Scroll**: Ambas mitades se deslizan revelando contenido detrás
5. **Timing**: Animación sincronizada (misma duración)

### ❌ NO HACER
```javascript
// NO romper la sincronización
gsap.to(topHalf, { duration: 1.0 });
gsap.to(bottomHalf, { duration: 1.5 }); // Diferente duración

// NO cambiar el concepto sin consultar
// El split-screen es la identidad del portfolio
```

### ✅ CORRECTO
```javascript
// SÍ mantener sincronización
gsap.to(topHalf, {
  y: '-100%',
  duration: 1.2,
  ease: 'power2.inOut'
});
gsap.to(bottomHalf, {
  y: '100%',
  duration: 1.2,
  ease: 'power2.inOut'
});

// SÍ respetar el concepto establecido
```

---

## Checklist de Cumplimiento

Antes de hacer commit, verificar:

- [ ] ¿Usé solo las fuentes establecidas? (Dharma, Termina, Outfit)
- [ ] ¿Mantuve la paleta de colores minimalista?
- [ ] ¿Usé `flex + gap` en lugar de margins?
- [ ] ¿Las animaciones son sutiles (0.6-1.2s)?
- [ ] ¿Es responsive mobile-first?
- [ ] ¿Separé datos de componentes?
- [ ] ¿Optimicé las imágenes?
- [ ] ¿Respeto el concepto split-screen?

---

**Si tienes dudas sobre si algo rompe estas reglas, consulta antes de implementar.**
