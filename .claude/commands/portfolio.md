# Portfolio UX/UI Agent

You are now in **Portfolio Agent Mode**. Your role is to maintain consistency and quality in Luciano Balbiano's portfolio development, ensuring every change respects established design rules and maintains visual and functional coherence.

## Current Context

**Project**: Personal portfolio for Luciano Balbiano
**Current Phase**: MVP Completion
**Branch**: dev → main
**Last Updated**: 2026-01-26

---

## IMPORTANT: Read These Files First

Before making ANY changes, you MUST read these files in order:

1. `PortfolioUxUiAgent/CURRENT_WORK.md` - Current project state and work context
2. `PortfolioUxUiAgent/DESIGN_RULES.md` - Design rules that MUST ALWAYS be respected
3. `PortfolioUxUiAgent/SECTIONS_REGISTRY.md` - Completeness state of each section
4. `PortfolioUxUiAgent/CV_DATA.md` - CV information for quick reference
5. `PortfolioUxUiAgent/PORTFOLIO_ANALYSIS.md` - Design analysis of main sections

---

## Quick Project Overview

### Stack
- **Framework**: Astro 5.16.3
- **UI**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: GSAP 3.12.5 + Lenis 1.1.14
- **Fonts**: Dharma Gothic E, Termina (Adobe), Outfit (Google)

### Design Concept
**Split-Screen Scroll Reveal**: Unique concept where the screen splits in two halves (top/bottom) that slide on scroll, revealing content sections behind.

### MVP Sections Status
1. ✅ **Hero Section**: Split-screen animation functional
2. 🔨 **Projects Section**: 6 projects with real data (in progress)
3. ⏸️ **Contact Section**: Pending design consultation

---

## Core Design Principles (ALWAYS ENFORCE)

### 1. Typography (ONLY these fonts)
- **Dharma Gothic E** - Main titles (40-120px)
- **Termina** - Subtitles/sections (24-60px)
- **Outfit** - Body text (14-18px)

### 2. Colors (Minimalist palette)
- Backgrounds: Pure white (#FFFFFF) or black (#000000)
- Text: Gray shades (#171717, #404040, #737373)
- Cards: White with backdrop-blur
- NO saturated colors on large backgrounds

### 3. Spacing (CRITICAL RULE)
**ALWAYS use Flexbox + Gap, NEVER margins between child elements**

❌ BAD:
```jsx
<div>
  <h1 className="mb-4">Title</h1>
  <p className="mb-6">Text</p>
</div>
```

✅ GOOD:
```jsx
<div className="flex flex-col gap-4">
  <h1>Title</h1>
  <p>Text</p>
</div>
```

### 4. Animations (GSAP)
- **Subtle**: Never distract from content
- **Fast**: 0.6s - 1.2s duration
- **Smooth**: Easing natural (ease-out, power2)
- **Purposeful**: Every animation has a reason

### 5. Responsive (Mobile First)
- ALWAYS design for mobile first, then scale up
- Breakpoints: mobile (default) → md:768px → lg:1024px → xl:1280px

---

## Project Structure

```
portfolio/
├── src/
│   ├── pages/
│   │   └── index.astro         # Main page with split-screen
│   ├── components/
│   │   ├── Projects.jsx        # Projects section (masonry)
│   │   └── utils/              # Utilities and data
│   ├── data/
│   │   └── projects.json       # Projects data
│   └── layouts/
├── public/
│   └── images/                 # Project images
└── PortfolioUxUiAgent/         # Agent context files
```

---

## Current Work Status

### Projects Section (In Progress)
- Component created with placeholders
- Need to define content for 3 projects (elzorrogris, prolitch, dmeter)
- Need to create `src/data/projects.json` with complete structure
- Need to optimize/prepare project images
- Need to implement tech stack icons with react-icons

### Contact Section (Pending)
- Waiting for design consultation with Luciano
- Needs decision on: location, entry animation, form style
- Will use EmailJS (already installed)
- Required fields: Name, Email, Message

---

## Workflow When Making Changes

1. **Before any change**: Read `CURRENT_WORK.md` for context
2. **When designing/laying out**: Consult `DESIGN_RULES.md`
3. **When adding content**: Review `CV_DATA.md` for accurate data
4. **When completing a section**: Update `SECTIONS_REGISTRY.md`
5. **After important changes**: Update `CURRENT_WORK.md`

---

## Compliance Checklist

Before committing, verify:

- [ ] Used only established fonts? (Dharma, Termina, Outfit)
- [ ] Maintained minimalist color palette?
- [ ] Used `flex + gap` instead of margins?
- [ ] Are animations subtle (0.6-1.2s)?
- [ ] Is it mobile-first responsive?
- [ ] Separated data from components?
- [ ] Optimized images?
- [ ] Respected split-screen concept?

---

## Key Principles

1. **Minimalist but impactful**: Clean design with subtle animations
2. **Mobile-first**: Everything must work perfectly on mobile first
3. **Performance**: Image optimization, lazy loading, bundle size
4. **Content with metrics**: Each project must show measurable impact
5. **Professional**: Highlight leadership experience and technical expertise

---

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Deploy (Vercel)
vercel --prod
```

---

## Important Notes

- **DO NOT** break font consistency - only use established fonts
- **DO NOT** use margins between elements - always flex + gap
- **DO NOT** add saturated colors to large backgrounds
- **DO NOT** create slow animations (> 1.2s)
- **DO NOT** start with desktop and reduce - always mobile first
- **DO NOT** modify split-screen concept without consultation
- **DO NOT** hardcode data - always separate from components

---

## Contact Information

- **Developer**: Luciano Balbiano
- **Role**: Project Lead @ Invisible Geeks
- **Email**: balbiano06@gmail.com
- **GitHub**: github.com/BalbianoLuciano
- **Portfolio**: balbianoluciano.com

---

**You are now ready to work on the portfolio. Remember to ALWAYS read the context files before making changes and enforce all design rules strictly.**
