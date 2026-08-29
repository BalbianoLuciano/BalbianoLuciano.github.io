# Portfolio UX/UI Agent

## Propósito
Este agente está diseñado para mantener consistencia en el desarrollo del portfolio personal de Luciano Balbiano, asegurando que cada cambio respete las reglas de diseño establecidas y mantenga la coherencia visual y funcional del proyecto.

## Cómo Activar el Agente

Cuando trabajes en el portfolio, **lee estos archivos en orden** antes de hacer cualquier cambio:

1. **CURRENT_WORK.md** - Estado actual del proyecto y contexto de trabajo
2. **DESIGN_RULES.md** - Reglas de diseño que SIEMPRE deben respetarse
3. **SECTIONS_REGISTRY.md** - Estado de completitud de cada sección
4. **CV_DATA.md** - Información del CV para referencia rápida
5. **PORTFOLIO_ANALYSIS.md** - Análisis de diseño de secciones principales

## Estructura del Proyecto

```
portfolio/
├── src/
│   ├── pages/
│   │   └── index.astro         # Página principal con concepto split-screen
│   ├── components/
│   │   ├── Projects.jsx        # Sección de proyectos (masonry layout)
│   │   └── utils/              # Utilidades y datos
│   ├── data/
│   │   └── projects.json       # Datos de proyectos
│   └── layouts/
├── public/
│   └── images/                 # Imágenes de proyectos
└── PortfolioUxUiAgent/         # Este directorio
```

## Stack Tecnológico

- **Framework**: Astro 5.16.3
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: GSAP 3.12.5 + Lenis 1.1.14
- **Icons**: React Icons 5.4.0
- **Email**: EmailJS Browser 4.3.3
- **Fonts**: Dharma Gothic E, Termina (Adobe), Outfit (Google)

## Concepto de Diseño

**Split-Screen Scroll Reveal**: El portfolio usa un concepto único donde la pantalla se divide en dos mitades (superior e inferior) que se deslizan al hacer scroll, revelando las secciones de contenido detrás.

## Fase Actual: MVP

**Objetivo**: Portfolio funcional con:
- ✅ Hero con split-screen animation
- 🔨 Sección de proyectos (6 proyectos con datos reales)
- 🔨 Formulario de contacto
- 🔨 Deploy a producción

## Workflow Recomendado

1. **Antes de cualquier cambio**: Lee `CURRENT_WORK.md` para contexto
2. **Al diseñar/maquetar**: Consulta `DESIGN_RULES.md`
3. **Al agregar contenido**: Revisa `CV_DATA.md` para datos precisos
4. **Al completar una sección**: Actualiza `SECTIONS_REGISTRY.md`
5. **Después de cambios importantes**: Actualiza `CURRENT_WORK.md`

## Principios Clave

1. **Minimalista pero impactante**: Diseño limpio con animaciones sutiles
2. **Mobile-first**: Todo debe funcionar perfectamente en móvil primero
3. **Performance**: Optimización de imágenes, lazy loading, bundle size
4. **Contenido con métricas**: Cada proyecto debe mostrar impacto medible
5. **Profesional**: Destacar experiencia de liderazgo y expertise técnico

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (Vercel)
vercel --prod
```

## Contacto del Proyecto

- **Developer**: Luciano Balbiano
- **Role**: Project Lead @ Invisible Geeks
- **Email**: balbiano06@gmail.com
- **GitHub**: github.com/BalbianoLuciano
- **Portfolio**: balbianoluciano.com
