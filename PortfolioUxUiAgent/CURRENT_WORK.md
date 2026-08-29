# Estado Actual del Portfolio

> **Última actualización**: 2026-08-28
> **Fase**: MVP - Finalización de Portfolio V2
> **Branch**: dev → main

---

## Contexto del Proyecto

Portfolio personal de **Luciano Balbiano**, Full Stack Developer y Project Lead con 4+ años de experiencia. El objetivo es crear un portfolio minimalista pero impactante que demuestre experiencia en liderazgo de proyectos, desarrollo full-stack, y capacidad de entregar proyectos con métricas de impacto medibles.

### Objetivos del MVP

1. ✅ **Hero Section**: Split-screen animation funcional
2. 🔨 **Projects Section**: 6 proyectos destacados con datos reales
3. 🔨 **Contact Section**: Formulario funcional con EmailJS
4. 🔨 **Deploy**: Producción en Vercel

---

## Estado Actual de Archivos

### Modificados (Uncommitted)
- `package.json` - Dependencias actualizadas
- `package-lock.json` - Lock file actualizado
- `src/pages/index.astro` - Página principal con split-screen
- `src/components/Projects.jsx` - **NUEVO** - Componente con placeholders

### Archivos Clave Existentes
- `src/components/utils/cardContent.json` - 3 proyectos (Miguel Montes, AMELAF, Cactus Media)
- `src/components/utils/jobs.json` - Timeline de trabajos freelance
- `src/components/utils/socialLinks.json` - Links sociales (GitHub, LinkedIn, Instagram)

---

## Secciones del Portfolio

### 1. Hero Section (Split-Screen) ✅

**Estado**: Funcional con animación GSAP

**Estructura**:
- **Mitad superior (50vh)**:
  - Título: "Full-stack Developer" (Dharma Gothic, 40-120px responsive)
  - Nombre: "Luciano Balbiano" (28-60px)
  - Social icons (GitHub, LinkedIn, Instagram)

- **Mitad inferior (50vh)**:
  - Tech stack icons: Expo, JavaScript, Firebase, Laravel, Tailwind, Next.js, React, Astro
  - Contacto: email + teléfono
  - Copyright: © BalbianoLuciano™ 2026

**Animación**: Al hacer scroll, ambas mitades se deslizan (superior arriba, inferior abajo) revelando fondo negro y sección de proyectos.

---

### 2. Projects Section 🔨

**Estado**: Componente creado pero con placeholders

**Diseño Actual**:
- Layout: CSS columns masonry (1/2/3 columnas responsive)
- 8 tarjetas placeholder → **Cambiar a 6 proyectos reales**
- Hover effects: scale + shadow
- Background: Negro (#000)

**Proyectos a Incluir** (6 totales):

1. **Malmberg.nl** ✅ (Datos del CV)
   - Descripción: Migración de 800+ páginas a HubSpot CMS
   - Tech: TypeScript, React, HubSpot CMS, Serverless Functions
   - Métrica: 800+ páginas migradas
   - Período: June - Sept 2024
   - URL: malmberg.nl

2. **Pet Bus** ✅ (Datos del CV)
   - Descripción: App móvil de transporte de mascotas
   - Tech: React Native, Expo Go, Firebase, Google Maps API
   - Métrica: 50% mejora en comunicación con clientes
   - Período: Oct - Nov 2024
   - URL: (definir)

3. **Miguel Montes García** ✅ (Datos existentes)
   - Descripción: Sitio tributo con optimización de performance
   - Tech: Astro.js, React.js, Tailwind, Amazon S3
   - Métrica: 30% mejora en velocidad de carga
   - URL: miguelmontesgarcia.org
   - Imagen: `/images/miguelMontesGarcia.PNG`

4. **elzorrogris.com** 🔨 (Pendiente definir)
   - Descripción: (Definir con Luciano)
   - Tech: (Definir)
   - Métrica: (Definir)
   - URL: elzorrogris.com
   - Imagen: (Preparar)

5. **Prolitch** 🔨 (Pendiente definir)
   - Descripción: (Definir con Luciano)
   - Tech: (Definir)
   - Métrica: (Definir)
   - URL: (Definir)
   - Imagen: (Preparar)

6. **Dmeter** 🔨 (Pendiente definir)
   - Descripción: Proyecto de consultoría tech personal
   - Tech: Next.js, React, Tailwind, GSAP (asumido)
   - Métrica: (Definir)
   - URL: (Definir)
   - Imagen: (Preparar)

**Pendiente**:
- [ ] Definir contenido de 3 proyectos nuevos (elzorrogris, prolitch, dmeter)
- [ ] Crear `src/data/projects.json` con estructura completa
- [ ] Actualizar `Projects.jsx` para consumir datos reales
- [ ] Agregar tech stack icons con react-icons
- [ ] Optimizar/preparar imágenes de proyectos

---

### 3. Contact Section 🔨

**Estado**: No implementada

**Pendiente Consultar**:
- ¿Cómo debe aparecer? (después de projects, modal, sidebar, fixed button)
- ¿Qué animación de entrada/salida? (GSAP reveal, slide, fade)
- ¿Estilo del formulario? (minimalista, card, fullscreen)

**Requisitos**:
- EmailJS (ya instalado en package.json)
- Campos: Nombre, Email, Mensaje
- Integrar social links de `socialLinks.json`
- Mostrar contacto: balbiano06@gmail.com, (+54) 9 3735-411941
- Animación GSAP consistente con el resto del portfolio

**Datos Disponibles**:
```json
// socialLinks.json
{
  "github": "https://github.com/BalbianoLuciano",
  "linkedin": "https://www.linkedin.com/in/lucianobalbiano/",
  "instagram": "https://www.instagram.com/lucianobalbiano/"
}
```

---

## Información del CV (Referencia Rápida)

### Posición Actual
**Project Lead @ Invisible Geeks** (June 2025 - Present)
- Liderando proyectos React & HubSpot CMS
- Gestión de equipos y stakeholders
- Identificación de oversights críticos → renegociaciones con clientes
- Expertise en HubSpot workflows, serverless functions, arquitectura de componentes

### Experiencia Clave
- **4+ años** programando
- **2+ años** proyectos reales
- **2 años** freelance (March 2023 - Feb 2025)
- Especialización: PHP, Laravel, React, HubSpot CMS

### Tech Stack Principal
**Web**: PHP, Laravel, Vue, HubSpot, React, JavaScript, Next.js, Astro, Symfony
**Mobile**: React Native, Expo
**Databases**: MySQL, Firebase, PostgreSQL, MongoDB
**UI/Tools**: Tailwind, GSAP, Figma, Docker

### Idiomas
- Español (Nativo)
- Inglés (B2 Upper Intermediate - EF SET Certificate)

---

## Decisiones de Diseño Tomadas

### Tipografía
1. **Dharma Gothic E** (Adobe Typekit) - Títulos principales
2. **Termina** (Adobe Typekit) - Subtítulos/secciones
3. **Outfit** (Google Fonts) - Body text

### Colores
- **Background hero**: Blanco (#FFFFFF)
- **Background projects**: Negro (#000000)
- **Cards**: Blanco con backdrop-blur
- **Text primary**: Negro/Grises oscuros
- **Accents**: (Por definir - mantener minimalista)

### Animaciones
- **GSAP**: Todas las animaciones principales
- **Duración**: 0.6-1.2s (sutiles)
- **Easing**: Suaves (ease-out, power2)
- **Scroll**: Lenis smooth scroll activo

### Responsive
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Enfoque**: Mobile-first

---

## Próximos Pasos

### Inmediatos (Hoy)
1. ✅ Crear estructura de agente UX/UI
2. 🔨 Definir contenido de 3 proyectos nuevos con Luciano
3. 🔨 Crear `src/data/projects.json`
4. 🔨 Actualizar `Projects.jsx` con datos reales

### Mañana
5. 🔨 Consultar diseño de Contact section
6. 🔨 Implementar formulario con EmailJS
7. 🔨 Testing responsive

### Día 3
8. 🔨 Optimización de imágenes
9. 🔨 Deploy a Vercel
10. 🔨 Verificación en producción

---

## Notas Técnicas

### Git Workflow
```bash
# Branch actual
dev

# Workflow recomendado
git add .
git commit -m "feat: [descripción]"
git push origin dev
# Luego PR a main para producción
```

### Deploy
- **Plataforma recomendada**: Vercel
- **Comando**: `vercel --prod`
- **Dominio objetivo**: balbianoluciano.com

### Performance Checklist
- [ ] Imágenes optimizadas (WebP, tamaños adecuados)
- [ ] Lazy loading en Projects
- [ ] Bundle size < 200KB (ideal)
- [ ] Lighthouse score > 90

---

## Contexto de Sesión Actual

**Objetivo**: Completar MVP del portfolio V2 en 2-3 días

**Fase 1** ✅: Estructura del agente UX/UI
**Fase 2** 🔨: Sección de Proyectos (en progreso)
**Fase 3** 🔨: Sección de Contacto (pendiente consulta)
**Fase 4** 🔨: Deploy

**Bloqueadores**: Ninguno
**Pendiente de Luciano**: Definir contenido de elzorrogris, prolitch, dmeter


---

# Sesión 2026-08-28 — Reposicionamiento a Spec-Driven

## Decidido con Luciano

- **Hero**: "Full-stack Developer" → **"Spec-Driven Developer"**.
- **Alcance de proyectos**: los 6 cases de Dmeter + Invisible Geeks + El Zorro Gris.
  Pet Bus y Miguel Montes García quedan **descartados**.
- **Orientación IA/SDD**: se traduce en (a) una sección de proceso y (b) spec por
  proyecto dentro del detalle. No sólo copy.
- **Restricción dura**: no cambiar el sentido del portfolio. El concepto de
  *abrir y descubrir* se mantiene y se extiende a todo. Ver `specs/001`.

## Hecho

- `specs/001-interaction-language.md` — el lenguaje de interacción escrito antes
  del código (Leyes 1 a 4).
- `src/data/projects.json` — 8 proyectos. Los 6 de Dmeter con stack, highlights
  y URLs verificados desde dmeter.com.ar.
- `src/components/utils/RadialOverlay.jsx` — la primitiva de apertura radial.
- `src/components/Contact.jsx` — reescrito sobre la primitiva.
- `src/components/Projects.jsx` — el masonry vertical pasó a **riel horizontal**
  con rueda mapeada a desplazamiento lateral.
- `src/components/ProjectOverlay.jsx` + `utils/ProjectDetail.jsx` — el detalle
  de proyecto, que abre desde la card clickeada.

## Pendiente

1. **Sección de proceso (SDD)** — aprobada pero no construida: necesita que
   Luciano escriba cómo trabaja realmente. No se inventa.
2. **Roles en los cases de Dmeter** — los 6 son trabajo de equipo. Falta definir
   qué hizo Luciano en cada uno.
3. **El Zorro Gris** — sin datos. Hoy no se renderiza (se filtran los TODO).
4. **Invisible Geeks** — sólo Malmberg cargado. Confirmar que es público y si
   hay más proyectos sin NDA.
5. **`spec.problem` / `spec.outcome` y `ai.*`** de cada proyecto: los campos
   existen en el dataset y el detalle ya los renderiza, pero están vacíos.
