import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import data from '../data/projects.json';
import { pick } from '../i18n/index.js';
import { useLang } from '../i18n/useLang.js';

/**
 * Riel horizontal de proyectos (spec 001, Ley 1: nada scrollea en vertical).
 * Clickear una card abre el detalle con la misma mascara radial que Contact
 * (Ley 2), naciendo desde la card.
 *
 * El overlay NO se renderiza aca: este componente vive dentro del `.container`
 * pineado por ScrollTrigger y un `position: fixed` ahi adentro se ancla al
 * ancestro transformado (Ley 3). Avisamos por evento y lo dibuja
 * ProjectOverlay, montado a nivel Layout.
 */

// Los proyectos sin contenido cargado no se muestran, y dentro de los que si
// tienen, los campos en TODO se descartan: nunca debe verse un placeholder.
const isPlaceholder = (v) => !v || String(v).startsWith('TODO');
const clean = (list) => (list ?? []).filter((v) => !isPlaceholder(v));
// El tagline es {en, es}: alcanza con mirar el ingles para saber si esta cargado.
const isReady = (p) => !isPlaceholder(pick(p.tagline, 'en'));
const projects = data.projects
  .filter(isReady)
  .sort((a, b) => a.order - b.order)
  .map((p) => ({ ...p, stack: clean(p.stack) }));

// Cuanto del gesto se consume por frame. Mas bajo = mas suave y mas largo.
const EASING = 0.11;

const HEIGHTS = {
  small: 'h-[36vh]',
  medium: 'h-[44vh]',
  large: 'h-[52vh]',
};

const Projects = () => {
  const railRef = useRef(null);
  const lang = useLang();

  const openProject = useCallback((project, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('project:open', {
        detail: {
          id: project.id,
          // Centro de la card: la mascara sale desde el proyecto clickeado, y
          // funciona igual si se dispara con teclado.
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      })
    );
  }, []);

  // Rueda vertical -> desplazamiento horizontal, con la misma inercia que Lenis
  // le da al resto de la pagina.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let splitOpen = false;
    let target = rail.scrollLeft;
    let frame = null;

    const onSplitChange = (e) => {
      splitOpen = Boolean(e.detail?.open);
      if (!splitOpen) {
        // Al cerrarse las compuertas el riel vuelve al principio, para que la
        // proxima apertura no arranque a la mitad.
        target = 0;
        rail.scrollLeft = 0;
      }
    };

    const step = () => {
      const diff = target - rail.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        rail.scrollLeft = target;
        frame = null;
        return;
      }
      rail.scrollLeft += diff * EASING;
      frame = requestAnimationFrame(step);
    };

    const onWheel = (e) => {
      // Mientras las compuertas se abren el gesto es de la pagina, no del riel.
      // Sin esto el split se traba apenas el cursor queda sobre una card.
      if (!splitOpen) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const max = rail.scrollWidth - rail.clientWidth;
      if (max <= 0) return;

      const next = target + e.deltaY;

      // Al llegar al inicio del riel devolvemos el gesto a la pagina en el mismo
      // movimiento, para que las compuertas se cierren sin pedir un flick extra.
      if (next <= 0) {
        target = 0;
        if (frame === null) frame = requestAnimationFrame(step);
        return;
      }

      // stopPropagation ademas de preventDefault: Lenis escucha en window y si
      // el evento burbujea mueve la pagina por debajo del riel.
      e.preventDefault();
      e.stopPropagation();

      target = Math.min(next, max);
      if (frame === null) frame = requestAnimationFrame(step);
    };

    const paintFocus = () => {
      const cards = rail.querySelectorAll('.project-card');
      if (!cards.length) return;
      const railRect = rail.getBoundingClientRect();
      const centro = railRect.left + railRect.width / 2;

      let masCerca = null;
      let menorDistancia = Infinity;
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - centro);
        if (d < menorDistancia) {
          menorDistancia = d;
          masCerca = card;
        }
      });
      cards.forEach((card) => card.classList.toggle('is-focused', card === masCerca));
    };

    // Drag y touch mueven scrollLeft por su cuenta: resincronizamos el target
    // para que la proxima rueda no pegue un salto.
    const onScroll = () => {
      if (frame === null) target = rail.scrollLeft;
      paintFocus();
    };

    // Al cambiar de idioma el contenido se reemplaza de golpe, asi que lo
    // acompaniamos con un barrido escalonado de izquierda a derecha.
    const onLangChange = () => {
      const cards = rail.querySelectorAll('.project-card');
      gsap.killTweensOf(cards);
      gsap.fromTo(
        cards,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power2.out',
          // Sin clearProps queda un transform residual en el nodo que despues
          // pelea con el scroll del riel.
          clearProps: 'opacity,transform',
        }
      );
    };

    rail.addEventListener('wheel', onWheel, { passive: false });
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('split:change', onSplitChange);
    window.addEventListener('resize', paintFocus);
    window.addEventListener('lang:change', onLangChange);
    paintFocus();

    return () => {
      rail.removeEventListener('wheel', onWheel);
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('split:change', onSplitChange);
      window.removeEventListener('resize', paintFocus);
      window.removeEventListener('lang:change', onLangChange);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={railRef}
        className="flex w-full flex-1 items-center gap-5 no-scrollbar overflow-x-auto overflow-y-hidden px-6 pb-8 md:gap-8 md:px-12"
      >
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={(e) => openProject(project, e)}
            className={`${HEIGHTS[project.size] ?? HEIGHTS.medium} project-card group w-[72vw] shrink-0 cursor-pointer text-left sm:w-[46vw] lg:w-[30vw] xl:w-[24vw]`}
          >
            <div className="project-card__inner flex h-full w-full flex-col gap-4">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-3 transition-colors duration-300 group-hover:border-white/30">
              <span className="font-outfit text-xs tracking-[0.2em] text-white/40">
                {String(project.order).padStart(2, '0')}
              </span>
              <span className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
                {pick(project.kicker, lang)}
              </span>
            </div>

            {/* Zona de imagen propia. Antes la captura iba a sangre al 25% detras
                del texto y se leia como ruido: recortada asi, se lee como lo que
                es. Sin captura, el logo centrado ocupa el lugar. */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                project.logo && (
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <img
                      src={project.logo}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="max-h-20 w-auto max-w-[55%] object-contain opacity-50"
                    />
                  </div>
                )
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <h3 className="font-dharma text-[28px] uppercase leading-none tracking-wider text-white md:text-[36px]">
                {project.name}
              </h3>
              <p className="font-outfit text-sm leading-relaxed text-white/60 line-clamp-2">
                {pick(project.tagline, lang)}
              </p>
              {project.stack.length > 0 && (
                <p className="font-outfit text-[11px] uppercase tracking-[0.15em] text-white/35">
                  {project.stack.slice(0, 4).join(' · ')}
                </p>
              )}
            </div>
            </div>
          </button>
        ))}
      </div>

    </>
  );
};

export default Projects;
