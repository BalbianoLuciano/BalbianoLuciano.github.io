import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { t } from '../../i18n/index.js';
import { useLang } from '../../i18n/useLang.js';

/**
 * Primitiva de apertura del portfolio (spec 001, Ley 2).
 *
 * Una mascara circular que nace en el punto exacto que se clickeo y crece hasta
 * cubrir el viewport. Es la UNICA transicion a un nivel mas profundo: contacto,
 * detalle de proyecto, proceso. Si algo se abre, se abre asi.
 *
 * Se monta como hermano del contenedor pineado por ScrollTrigger (Ley 3): un
 * `position: fixed` dentro de un ancestro transformado se ancla a ese ancestro.
 */

// Radio para cubrir el viewport desde (x, y): la esquina mas lejana.
export const radiusToCover = (x, y) => {
  const { innerWidth: w, innerHeight: h } = window;
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(w - x, y),
    Math.hypot(x, h - y),
    Math.hypot(w - x, h - y)
  );
};

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

const OPEN_DURATION = 0.9;
const CLOSE_DURATION = 0.7;

const RadialOverlay = ({ origin, onClose, label, children }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const tweenRef = useRef(null);
  const closingRef = useRef(false);

  const lang = useLang();
  const { x, y } = origin;

  // `onClose` suele venir como arrow inline, asi que cambia de identidad en cada
  // render del padre. Guardado en un ref, `close` y el efecto de apertura dejan
  // de depender de el: sin esto, cada tecla tipeada en el formulario volvia a
  // disparar la animacion radial completa.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = useCallback(() => {
    // Sin esto, un doble Escape reinicia el cierre a mitad de camino.
    if (closingRef.current) return;
    closingRef.current = true;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const reduced = prefersReducedMotion();
    const target = { r: radiusToCover(x, y) };

    tweenRef.current?.kill();
    gsap.killTweensOf(panelRef.current);
    gsap.to(panelRef.current, { opacity: 0, y: 12, duration: reduced ? 0 : 0.25, ease: 'power2.in' });

    tweenRef.current = gsap.to(target, {
      r: 0,
      duration: reduced ? 0 : CLOSE_DURATION,
      delay: reduced ? 0 : 0.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        overlay.style.clipPath = `circle(${target.r}px at ${x}px ${y}px)`;
      },
      onComplete: () => {
        window.lenis?.start();
        document.body.style.overflow = '';
        onCloseRef.current?.();
      },
    });
  }, [x, y]);

  const closeRefFn = useRef(close);
  closeRefFn.current = close;

  useEffect(() => {
    const overlay = overlayRef.current;
    const reduced = prefersReducedMotion();
    const target = { r: 0 };

    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    gsap.set(panelRef.current, { opacity: 0, y: 12 });

    // Ley 4: mientras hay overlay, el scroll de fondo se frena.
    window.lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    tweenRef.current = gsap.to(target, {
      r: radiusToCover(x, y),
      duration: reduced ? 0 : OPEN_DURATION,
      ease: 'power2.inOut',
      onUpdate: () => {
        overlay.style.clipPath = `circle(${target.r}px at ${x}px ${y}px)`;
      },
    });

    gsap.to(panelRef.current, {
      opacity: 1,
      y: 0,
      duration: reduced ? 0 : 0.6,
      delay: reduced ? 0 : 0.45,
      ease: 'power2.out',
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeRefFn.current();
    };
    window.addEventListener('keydown', onKeyDown);

    // Si cambia el viewport con el overlay abierto, reanclamos la mascara para
    // que no quede un recorte visible.
    const onResize = () => {
      if (!closingRef.current && overlayRef.current) {
        overlayRef.current.style.clipPath = `circle(${radiusToCover(x, y)}px at ${x}px ${y}px)`;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      tweenRef.current?.kill();
      // Red de seguridad: si el overlay se desmonta sin pasar por close(),
      // el scroll quedaria trabado para siempre.
      window.lenis?.start();
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] bg-dark text-white"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        aria-label={`${t(lang, 'closeLabel')} ${label}`}
        className="fixed top-6 right-7 z-10 text-xl text-white/50 transition-colors hover:text-white"
      >
        <i className="bi bi-x-lg" aria-hidden="true"></i>
      </button>

      <div ref={panelRef} className="h-full w-full">
        {typeof children === 'function' ? children({ close }) : children}
      </div>
    </div>
  );
};

export default RadialOverlay;
