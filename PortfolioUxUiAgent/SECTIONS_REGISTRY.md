# Registro de Secciones del Portfolio

> **Estado actualizado**: 2026-01-25
> **Total secciones**: 3 (MVP)
> **Completadas**: 1/3
> **En progreso**: 1/3
> **Pendientes**: 1/3

---

## 1. Hero Section (Split-Screen)

**Estado**: ✅ **COMPLETADA CON CONTENIDO**

### Ubicación
- **Archivo**: `src/pages/index.astro`
- **Líneas**: Aprox. 1-200

### Descripción
Sección inicial con concepto split-screen único. La pantalla se divide en dos mitades que se deslizan al hacer scroll, revelando el contenido de proyectos detrás.

### Contenido

#### Mitad Superior (50vh)
```
- Título: "Full-stack Developer"
  - Font: Dharma Gothic E
  - Size: 40px (mobile) → 120px (desktop)
  - Color: Negro

- Nombre: "Luciano Balbiano"
  - Font: Termina
  - Size: 28px (mobile) → 60px (desktop)
  - Color: Negro

- Social Icons (3):
  - GitHub: github.com/BalbianoLuciano
  - LinkedIn: linkedin.com/in/lucianobalbiano
  - Instagram: instagram.com/lucianobalbiano
```

#### Mitad Inferior (50vh)
```
- Tech Stack (8 iconos):
  - Expo, JavaScript, Firebase, Laravel
  - Tailwind, Next.js, React, Astro

- Contacto:
  - Email: balbiano06@gmail.com
  - Teléfono: (+54) 9 3735-411941

- Copyright: © BalbianoLuciano™ 2026
```

### Animación GSAP
```javascript
// ScrollTrigger que activa el split
- Top half: y: '-100%' (se desliza hacia arriba)
- Bottom half: y: '100%' (se desliza hacia abajo)
- Duration: 1.2s
- Ease: power2.inOut
- Reveal: Sección de Projects detrás
```

### Responsive
- **Mobile (< 768px)**: Stack vertical, iconos más pequeños
- **Tablet (768px - 1024px)**: Iconos medianos, texto intermedio
- **Desktop (> 1024px)**: Full split-screen, tipografía grande

### Pendientes
- [ ] Verificar smooth scroll funciona correctamente
- [ ] Testing en diferentes dispositivos
- [ ] Optimizar performance de animación

---

## 2. Projects Section

**Estado**: 🔨 **EN PROGRESO**

### Ubicación
- **Archivo**: `src/components/Projects.jsx`
- **Datos**: `src/data/projects.json` (pendiente crear)

### Descripción
Galería masonry de 6 proyectos destacados que demuestran expertise full-stack y métricas de impacto.

### Diseño Actual
```jsx
- Layout: CSS columns masonry
- Columnas: 1 (mobile) → 2 (tablet) → 3 (desktop)
- Background: Negro (#000)
- Cards: Blanco con backdrop-blur
- Hover: Scale 1.05 + shadow increase
```

### Proyectos a Mostrar (6)

#### 1. Malmberg.nl ✅ (Contenido definido)
```json
{
  "title": "Malmberg.nl - HubSpot Migration",
  "description": "Migración completa de 800+ páginas a HubSpot CMS con componentes custom, automated pipelines y workflows complejos.",
  "tech": ["TypeScript", "React", "HubSpot CMS", "Serverless Functions"],
  "metrics": "800+ páginas migradas",
  "period": "June - Sept 2024",
  "url": "https://malmberg.nl",
  "image": "/images/malmberg.png" // Pendiente preparar
}
```

#### 2. Pet Bus ✅ (Contenido definido)
```json
{
  "title": "Pet Bus - Mobile App",
  "description": "Aplicación móvil de transporte de mascotas con integración de Google Maps API y sistema de comunicación en tiempo real.",
  "tech": ["React Native", "Expo Go", "Firebase", "Google Maps API"],
  "metrics": "50% mejora en comunicación con clientes",
  "period": "Oct - Nov 2024",
  "url": null, // App no pública
  "image": "/images/petbus.png" // Pendiente preparar
}
```

#### 3. Miguel Montes García ✅ (Contenido definido)
```json
{
  "title": "Miguel Montes García - Tribute Site",
  "description": "Sitio tributo optimizado con mejora significativa en performance y SEO.",
  "tech": ["Astro.js", "React.js", "Tailwind", "Amazon S3", "Google Tag"],
  "metrics": "30% mejora en velocidad de carga",
  "period": "2024",
  "url": "https://miguelmontesgarcia.org",
  "image": "/images/miguelMontesGarcia.PNG" // Ya existe
}
```

#### 4. elzorrogris.com 🔨 (Pendiente definir)
```json
{
  "title": "El Zorro Gris",
  "description": "??? - Pendiente consultar con Luciano",
  "tech": ["???"],
  "metrics": "???",
  "period": "???",
  "url": "https://elzorrogris.com",
  "image": "/images/elzorrogris.png" // Pendiente preparar
}
```

#### 5. Prolitch 🔨 (Pendiente definir)
```json
{
  "title": "Prolitch",
  "description": "??? - Pendiente consultar con Luciano",
  "tech": ["???"],
  "metrics": "???",
  "period": "???",
  "url": "???",
  "image": "/images/prolitch.png" // Pendiente preparar
}
```

#### 6. Dmeter 🔨 (Pendiente definir)
```json
{
  "title": "Dmeter - Tech Consultancy",
  "description": "Proyecto de consultoría tech personal ??? - Pendiente consultar",
  "tech": ["Next.js", "React", "Tailwind", "GSAP"], // Asumido
  "metrics": "???",
  "period": "???",
  "url": "???",
  "image": "/images/dmeter.png" // Pendiente preparar
}
```

### Estructura del Card

```jsx
<article className="project-card">
  <img src={project.image} alt={project.title} />
  <div className="content">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="tech-stack">
      {project.tech.map(t => <TechIcon icon={t} />)}
    </div>
    <div className="metrics">{project.metrics}</div>
    {project.url && <a href={project.url}>View Project →</a>}
  </div>
</article>
```

### Pendientes
- [ ] Consultar contenido de 3 proyectos (elzorrogris, prolitch, dmeter)
- [ ] Crear `src/data/projects.json` con estructura completa
- [ ] Preparar/optimizar imágenes de proyectos (WebP, 800x600 aprox)
- [ ] Actualizar `Projects.jsx` para consumir datos
- [ ] Implementar tech stack icons con react-icons
- [ ] Agregar animaciones GSAP de reveal al scroll
- [ ] Testing responsive en 3 layouts (1/2/3 columnas)

---

## 3. Contact Section

**Estado**: ⏸️ **PENDIENTE CONSULTA DE DISEÑO**

### Ubicación
- **Archivo**: `src/components/Contact.jsx` (pendiente crear)

### Descripción
Formulario de contacto con EmailJS para que visitantes puedan enviar mensajes directamente.

### Decisiones Pendientes

**Necesito consultar con Luciano**:
1. **Ubicación**: ¿Dónde debe aparecer?
   - Opción A: Sección después de Projects (scroll natural)
   - Opción B: Modal que se abre con botón
   - Opción C: Sidebar fixed
   - Opción D: Fullscreen overlay

2. **Animación de entrada**: ¿Cómo aparece?
   - Opción A: Fade in al hacer scroll
   - Opción B: Slide from bottom
   - Opción C: Split reveal (consistente con hero)
   - Opción D: Scale + fade

3. **Estilo del formulario**:
   - Minimalista (solo inputs con underline)
   - Card elevada con backdrop-blur
   - Fullscreen con background oscuro
   - Sidebar con glassmorphism

### Contenido Requerido

```jsx
// Formulario
- Nombre (input text)
- Email (input email)
- Mensaje (textarea)
- Botón: "Send Message" / "Enviar"

// Información de contacto
- Email: balbiano06@gmail.com
- Teléfono: (+54) 9 3735-411941

// Social Links (desde socialLinks.json)
- GitHub
- LinkedIn
- Instagram
```

### Integración EmailJS

```javascript
import emailjs from '@emailjs/browser';

// Configuración (crear en .env)
- SERVICE_ID
- TEMPLATE_ID
- PUBLIC_KEY
```

### Validación
- [ ] Email válido (regex)
- [ ] Campos requeridos no vacíos
- [ ] Mensaje con mínimo de caracteres (20+)
- [ ] Loading state durante envío
- [ ] Success/error feedback

### Pendientes
- [ ] **CONSULTAR** diseño y animación con Luciano
- [ ] Crear componente `Contact.jsx`
- [ ] Configurar EmailJS (service, template, keys)
- [ ] Implementar validación de formulario
- [ ] Diseñar states (empty, filled, loading, success, error)
- [ ] Agregar animación GSAP consistente
- [ ] Testing de envío de emails
- [ ] Responsive mobile/desktop

---

## Secciones Futuras (Post-MVP)

Estas secciones NO están en el alcance del MVP actual pero podrían agregarse después:

### 4. About/Intro Section
- Breve párrafo sobre expertise
- Destacar rol de Project Lead
- 2-3 oraciones máximo

### 5. Skills/Tech Stack Section
- Categorías: Web, Mobile, Databases, Tools
- Iconos visuales con tooltips
- Grilla responsive

### 6. Work Experience Timeline
- Usar `jobs.json` existente
- Timeline visual con fechas
- Destacar rol actual prominentemente

### 7. Testimonials
- LinkedIn recommendations
- 2-3 testimonios máximo
- Cards con foto y cargo

### 8. Certifications
- UX/UI Designer (Udemy)
- EF SET English B2
- Python/Django (Informatorio)

---

## Métricas de Éxito del MVP

- [ ] 3 secciones completadas (Hero, Projects, Contact)
- [ ] 6 proyectos con contenido real
- [ ] Formulario funcional con EmailJS
- [ ] Responsive en 3 breakpoints
- [ ] Lighthouse score > 90
- [ ] Deploy funcional en Vercel
- [ ] URL: balbianoluciano.com activo

---

## Notas de Implementación

### Orden de Desarrollo Recomendado
1. ✅ Hero (ya completada)
2. 🔨 Projects (en progreso - siguiente)
3. ⏸️ Contact (después de consulta)

### Testing Checklist por Sección
- [ ] Mobile (320px, 375px, 414px)
- [ ] Tablet (768px, 834px)
- [ ] Desktop (1024px, 1440px, 1920px)
- [ ] Animaciones fluidas en todos los tamaños
- [ ] No layout shift
- [ ] Performance (FPS, load time)
