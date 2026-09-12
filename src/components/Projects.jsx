import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import data from '../data/projects.json';
import { pick, t } from '../i18n/index.js';
import { useLang } from '../i18n/useLang.js';

/**
 * Mapa de proyectos. Detras de las compuertas no hay nada: pantalla negra y, en
 * el medio, el pilar del carrusel de Gridwright. Cada pieza es un proyecto.
 *
 * - En reposo las piezas estan sueltas, en linea fina. Se ven desde que las
 *   compuertas empiezan a separarse.
 * - Hover: el rotulo con el nombre sigue al cursor. No dispara nada mas. En
 *   tactil no hay hover: el scroll que sigue a las compuertas va encendiendo
 *   las piezas de a una, con el nombre abajo (evento mapa:recorrido).
 * - Click: las piezas se ensamblan, la elegida se pinta, y el conjunto viaja a
 *   una posicion distinta para cada proyecto. En el vacio que deja aparece el
 *   caso entero: no hay un segundo nivel. Click en el vacio o Escape y el
 *   pilar vuelve al centro.
 */

const isPlaceholder = (v) => !v || String(v).startsWith('TODO');
const clean = (list) => (list ?? []).filter((v) => !isPlaceholder(v));
const isReady = (p) => !isPlaceholder(pick(p.tagline, 'en'));
const projects = data.projects
  .filter(isReady)
  .sort((a, b) => a.order - b.order)
  .map((p) => ({ ...p, stack: clean(p.stack) }));
const N = projects.length;

// Geometria en unidades del pilar. ALTO es el pilar ensamblado; en reposo cada
// pieza se corre SEPARACION de la anterior, repartido hacia arriba y abajo.
const ANCHO = 340;
const ALTO = 1000;
const SEPARACION = 22;
const EXTRA = (SEPARACION * (N - 1)) / 2;

// Alto de cada pieza: el tamanio del proyecto, con una variacion fija para que
// no se repitan medidas (piezas iguales a intervalos iguales se leen como
// flechas de pista, no como partes de algo).
const PESO = { small: 0.72, medium: 1, large: 1.25 };
const VARIACION = [1, 0.9, 1.15, 0.82, 1.08, 0.95, 1.2, 0.88, 1.05, 0.93];

// Perfiles de junta: x de 0 a 1 a lo ancho, y en unidades de amplitud
// (negativo = sube). Cada junta es la misma linea a los dos lados: por eso
// calzan. Las siete del carrusel mas la onda y la cunia.
const RECTA = [[0, 0], ['L', 1, 0]];
const JUNTAS = [
  [[0, -0.7], ['L', 1, 0.7]], // diagonal
  [[0, 0], ['Q', 0.5, 2, 1, 0]], // arco hacia abajo
  [[0, 0], ['L', 0.34, 0], ['L', 0.34, -1], ['L', 0.66, -1], ['L', 0.66, 0], ['L', 1, 0]], // espiga
  [[0, 0], ['Q', 0.25, 2, 0.5, 0], ['Q', 0.75, -2, 1, 0]], // onda
  [[0, -0.6], ['L', 0.52, -0.6], ['L', 0.52, 0.6], ['L', 1, 0.6]], // escalon
  [[0, 0], ['Q', 0.28, -2, 1, 0]], // arco corrido
  [[0, 0], ['L', 0.4, 0], ['L', 0.4, 1], ['L', 0.72, 1], ['L', 0.72, 0], ['L', 1, 0]], // espiga baja
  [[0, 0], ['L', 0.44, 0], ['L', 0.56, 1], ['L', 0.68, 0], ['L', 1, 0]], // cunia
  [[0, 0.7], ['L', 1, -0.7]], // diagonal inversa
];

const X = (u) => u * (ANCHO - 1.2) + 0.6;
const fin = (perfil, k) => {
  const s = perfil[k];
  if (k === 0) return s;
  return s[0] === 'Q' ? [s[3], s[4]] : [s[1], s[2]];
};

// Recorre un perfil sobre la linea base y, de izquierda a derecha o al reves.
const tramo = (perfil, y, a, alReves) => {
  const P = (u, d) => `${X(u).toFixed(2)} ${(y + d * a).toFixed(2)}`;
  if (!alReves) {
    return perfil
      .slice(1)
      .map((s) => (s[0] === 'Q' ? `Q${P(s[1], s[2])} ${P(s[3], s[4])}` : `L${P(s[1], s[2])}`))
      .join(' ');
  }
  let d = '';
  for (let k = perfil.length - 1; k >= 1; k--) {
    const s = perfil[k];
    const [u, v] = fin(perfil, k - 1);
    d += s[0] === 'Q' ? `Q${P(s[1], s[2])} ${P(u, v)} ` : `L${P(u, v)} `;
  }
  return d.trim();
};

const piezas = (() => {
  const pesos = projects.map((p, i) => (PESO[p.size] ?? 1) * VARIACION[i % VARIACION.length]);
  const total = pesos.reduce((a, b) => a + b, 0);
  const alto = pesos.map((w) => (w / total) * ALTO);
  const juntas = alto.slice(1).map((_, k) => JUNTAS[k % JUNTAS.length]);
  // Amplitud acotada por la pieza mas chica de las dos: si no, la junta se come
  // la pieza entera.
  const amp = juntas.map((_, k) => Math.min(0.38 * Math.min(alto[k], alto[k + 1]), 40));

  let y = 0;
  return alto.map((h, k) => {
    const top = y;
    const bot = y + h;
    y = bot;
    const arriba = k > 0 ? juntas[k - 1] : RECTA;
    const abajo = k < N - 1 ? juntas[k] : RECTA;
    const aA = k > 0 ? amp[k - 1] : 0;
    const aB = k < N - 1 ? amp[k] : 0;
    const s0 = arriba[0];
    const e1 = fin(abajo, abajo.length - 1);
    const d =
      `M${X(s0[0]).toFixed(2)} ${(top + s0[1] * aA).toFixed(2)} ${tramo(arriba, top, aA, false)} ` +
      `L${X(e1[0]).toFixed(2)} ${(bot + e1[1] * aB).toFixed(2)} ${tramo(abajo, bot, aB, true)} Z`;
    // Desplazamiento en reposo: sueltas, repartidas alrededor del centro.
    return { d, suelta: (k - (N - 1) / 2) * SEPARACION };
  });
})();

// A donde viaja el pilar con cada proyecto. `lado` es donde queda el pilar (el
// detalle ocupa el resto), `rot` su giro, `alin` donde se apoya sobre ese lado
// (0 al principio, 1 al final) y `escala` cuanto se achica.
const DESTINOS = [
  { lado: 'derecha', rot: 0, alin: 0.5, escala: 1 },
  { lado: 'abajo', rot: -90, alin: 1, escala: 1 },
  { lado: 'izquierda', rot: 180, alin: 0, escala: 0.8 },
  { lado: 'arriba', rot: 90, alin: 0, escala: 1 },
  { lado: 'derecha', rot: 180, alin: 1, escala: 0.7 },
  { lado: 'izquierda', rot: 0, alin: 0.5, escala: 0.9 },
  { lado: 'abajo', rot: 90, alin: 0, escala: 0.85 },
  { lado: 'arriba', rot: -90, alin: 1, escala: 0.9 },
  { lado: 'derecha', rot: 0, alin: 0, escala: 0.62 },
  { lado: 'izquierda', rot: 180, alin: 1, escala: 0.7 },
];

// En vertical no hay lugar para el pilar de costado: va tumbado arriba o abajo.
const aVertical = ({ lado, rot, alin, escala }) => ({
  lado: lado === 'izquierda' || lado === 'arriba' ? 'arriba' : 'abajo',
  rot: rot === 0 ? 90 : rot === 180 ? -90 : rot,
  alin,
  escala,
});

/**
 * Calcula la transformacion del pilar y el rectangulo libre para el detalle.
 * `alto` es el alto en px del elemento del pilar sin transformar.
 */
const ubicar = (indice, anchoEscena, altoEscena, alto) => {
  const vertical = anchoEscena < 768 || anchoEscena / altoEscena < 0.9;
  const base = DESTINOS[indice % DESTINOS.length];
  const { lado, rot, alin, escala } = vertical ? aVertical(base) : base;
  const m = Math.min(Math.max(anchoEscena * 0.04, 20), 64);
  const px = alto / (ALTO + 2 * EXTRA); // px por unidad sin escalar
  const anchoU = ANCHO * px;
  const altoU = ALTO * px;
  const tumbado = Math.abs(rot) === 90;

  let s;
  if (!tumbado) {
    s = Math.min((0.84 * altoEscena) / altoU, (0.3 * anchoEscena) / anchoU);
  } else {
    const grosor = (vertical ? 0.16 : 0.2) * altoEscena;
    const largo = (vertical ? 1 : 0.62) * (anchoEscena - 2 * m);
    s = Math.min(grosor / anchoU, largo / altoU);
  }
  s *= escala;

  const bw = (tumbado ? altoU : anchoU) * s;
  const bh = (tumbado ? anchoU : altoU) * s;

  let cx;
  let cy;
  let panel;
  if (lado === 'derecha' || lado === 'izquierda') {
    cy = m + bh / 2 + alin * (altoEscena - 2 * m - bh);
    cx = lado === 'derecha' ? anchoEscena - m - bw / 2 : m + bw / 2;
    panel = {
      left: lado === 'derecha' ? m : bw + 2 * m,
      top: m,
      width: anchoEscena - bw - 3 * m,
      height: altoEscena - 2 * m,
    };
  } else {
    cx = m + bw / 2 + alin * (anchoEscena - 2 * m - bw);
    cy = lado === 'arriba' ? m + bh / 2 : altoEscena - m - bh / 2;
    panel = {
      left: m,
      top: lado === 'arriba' ? bh + 2 * m : m,
      width: anchoEscena - 2 * m,
      height: altoEscena - bh - 3 * m,
    };
  }

  return {
    pilar: { x: cx - anchoEscena / 2, y: cy - altoEscena / 2, rotation: rot, scale: s },
    panel,
  };
};

const esRepo = (url) => /github\.com|gitlab\.com/.test(url ?? '');

const prefiereQuieto = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * La captura no se muestra como foto: se arma con los agujeros de los tensores,
 * la misma trama de las compuertas. Cada punto crece segun la luz de la imagen
 * en ese lugar (con el contraste 1.35 del manual) y aparecen en barrido. Al
 * pasar el mouse, la trama se abre y queda la captura en B/N.
 */
const Lamina = ({ src, alt }) => {
  const figuraRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let frame = null;
    let cancelado = false;
    const img = new Image();

    img.onload = () => {
      if (cancelado) return;
      // La caja toma la proporcion de la captura: con una fija (16:10) las
      // capturas, que son de 2:1 para arriba, quedaban cortadas a los costados.
      if (figuraRef.current) figuraRef.current.style.aspectRatio = `${img.width} / ${img.height}`;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const paso = Math.max(4, w / 84);
      const cols = Math.floor(w / paso);
      const filas = Math.floor(h / paso);
      const muestra = document.createElement('canvas');
      muestra.width = cols;
      muestra.height = filas;
      const mctx = muestra.getContext('2d', { willReadFrequently: true });
      mctx.drawImage(img, 0, 0, cols, filas);
      const px = mctx.getImageData(0, 0, cols, filas).data;

      const luces = new Float32Array(cols * filas);
      for (let n = 0; n < luces.length; n++) {
        const o = n * 4;
        luces[n] = (0.2126 * px[o] + 0.7152 * px[o + 1] + 0.0722 * px[o + 2]) / 255;
      }
      // Niveles por captura: una captura oscura (un hero con video atenuado)
      // casi no dejaba puntos. Se estira entre los percentiles 2 y 98.
      const orden = Float32Array.from(luces).sort();
      const bajo = orden[Math.floor(orden.length * 0.02)];
      const alto = Math.max(orden[Math.floor(orden.length * 0.98)], bajo + 0.1);

      const puntos = [];
      for (let j = 0; j < filas; j++) {
        for (let i = 0; i < cols; i++) {
          const luz = (luces[j * cols + i] - bajo) / (alto - bajo);
          const l = Math.min(1, Math.max(0, (luz - 0.5) * 1.35 + 0.5));
          if (l < 0.05) continue;
          puntos.push({
            x: (i + 0.5) * paso,
            y: (j + 0.5) * paso,
            // raiz: el area del punto, no el radio, es lo que se lee como luz
            r: Math.sqrt(l) * paso * 0.44,
            t: (i / cols) * 0.7 + (j / filas) * 0.3,
          });
        }
      }

      const duracion = prefiereQuieto() ? 0 : 1100;
      const t0 = performance.now();
      const dibujar = (ahora) => {
        const p = duracion ? Math.min(1, (ahora - t0) / duracion) : 1;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#c6c2b8';
        ctx.beginPath();
        for (const q of puntos) {
          const c = Math.min(1, Math.max(0, (p * 1.3 - q.t) / 0.3));
          if (c <= 0) continue;
          ctx.moveTo(q.x + q.r * c, q.y);
          ctx.arc(q.x, q.y, q.r * c, 0, Math.PI * 2);
        }
        ctx.fill();
        if (p < 1) frame = requestAnimationFrame(dibujar);
      };
      frame = requestAnimationFrame(dibujar);
    };
    img.src = src;

    return () => {
      cancelado = true;
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [src]);

  return (
    <figure ref={figuraRef} className="lamina">
      <img src={src} alt={alt} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </figure>
  );
};

const Projects = () => {
  const lang = useLang();
  const escenaRef = useRef(null);
  const pilarRef = useRef(null);
  const piezasRef = useRef([]);
  const rotuloRef = useRef(null);
  const panelRef = useRef(null);
  const flujoRef = useRef(null);
  const moverRotulo = useRef(null);

  const [activo, setActivo] = useState(null);
  // El ultimo elegido sigue en el panel mientras se desvanece al volver al mapa.
  const [ultimo, setUltimo] = useState(null);
  const [panel, setPanel] = useState(null);
  const [hover, setHover] = useState(null);
  // La pieza encendida por el scroll en tactil
  const [enfocado, setEnfocado] = useState(null);
  const [hayMas, setHayMas] = useState(false);

  const reduce = useMemo(prefiereQuieto, []);
  const dur = (s) => (reduce ? 0 : s);

  // Reposo: piezas sueltas y el pilar en el centro, sin transformar.
  useEffect(() => {
    gsap.set(pilarRef.current, { xPercent: -50, yPercent: -50 });
    piezasRef.current.forEach((g, k) => gsap.set(g, { y: piezas[k].suelta }));
    moverRotulo.current = {
      x: gsap.quickTo(rotuloRef.current, 'x', { duration: 0.18, ease: 'power3.out' }),
      y: gsap.quickTo(rotuloRef.current, 'y', { duration: 0.18, ease: 'power3.out' }),
    };
  }, []);

  // Los logos se piden de entrada: el rotulo aparece con el hover y si el logo
  // recien ahi se descarga, entra un instante despues que el nombre.
  useEffect(() => {
    projects.forEach((p) => {
      if (p.logo) new Image().src = p.logo;
    });
  }, []);

  // Al cerrarse las compuertas el mapa vuelve al reposo, para que la proxima
  // apertura no arranque con un proyecto abierto.
  useEffect(() => {
    const onSplit = (e) => {
      if (!e.detail?.open) setActivo(null);
    };
    window.addEventListener('split:change', onSplit);
    return () => window.removeEventListener('split:change', onSplit);
  }, []);

  // Un tramo por proyecto. El primer pedacito queda sin encender: recien
  // abiertas las compuertas se ve el mapa entero antes del primer proyecto.
  useEffect(() => {
    const onRecorrido = (e) => {
      const p = e.detail?.progress ?? 0;
      setEnfocado(p < 0.03 ? null : Math.min(N - 1, Math.floor(((p - 0.03) / 0.97) * N)));
    };
    window.addEventListener('mapa:recorrido', onRecorrido);
    return () => window.removeEventListener('mapa:recorrido', onRecorrido);
  }, []);

  const recalcular = useCallback((indice) => {
    const escena = escenaRef.current;
    const pilar = pilarRef.current;
    if (!escena || !pilar || indice == null) return null;
    return ubicar(indice, escena.clientWidth, escena.clientHeight, pilar.offsetHeight);
  }, []);

  // El viaje. Primero se cierran las juntas, y casi en el mismo gesto el
  // conjunto sale hacia su lugar.
  useEffect(() => {
    const pilar = pilarRef.current;
    const gs = piezasRef.current;
    gsap.killTweensOf(pilar);
    gsap.killTweensOf(gs, 'y');

    if (activo == null) {
      gsap.to(gs, { y: (k) => piezas[k].suelta, duration: dur(0.55), ease: 'power2.inOut', delay: dur(0.25) });
      gsap.to(pilar, { x: 0, y: 0, rotation: 0, scale: 1, duration: dur(0.9), ease: 'power3.inOut' });
      return;
    }

    const u = recalcular(activo);
    if (!u) return;
    setUltimo(activo);
    setPanel(u.panel);
    gsap.to(gs, { y: 0, duration: dur(0.45), ease: 'power2.inOut' });
    gsap.to(pilar, { ...u.pilar, duration: dur(1), ease: 'power3.inOut', delay: dur(0.1) });
  }, [activo, recalcular]);

  // El detalle entra cuando el pilar ya esta llegando.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (activo == null) {
      gsap.to(el, { opacity: 0, y: 12, duration: dur(0.25), ease: 'power2.in' });
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: dur(0.45), ease: 'power2.out', delay: dur(0.55) }
      );
    }
  }, [activo, panel]);

  useEffect(() => {
    const onResize = () => {
      if (activo == null) return;
      const u = recalcular(activo);
      if (!u) return;
      setPanel(u.panel);
      gsap.set(pilarRef.current, u.pilar);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activo, recalcular]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape' || activo == null) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      setActivo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activo]);

  // El caso entra en columnas que siguen hacia la derecha (Ley 1: nada scrollea
  // en vertical). La rueda vertical lo corre en horizontal; en los bordes el
  // gesto vuelve a la pagina, asi las compuertas se cierran sin un flick extra.
  useEffect(() => {
    const flujo = flujoRef.current;
    if (!flujo) return undefined;
    flujo.scrollLeft = 0;
    let destino = 0;
    let frame = null;

    const medir = () => setHayMas(flujo.scrollLeft < flujo.scrollWidth - flujo.clientWidth - 2);
    const paso = () => {
      const diff = destino - flujo.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        flujo.scrollLeft = destino;
        frame = null;
        return;
      }
      flujo.scrollLeft += diff * 0.14;
      frame = requestAnimationFrame(paso);
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = flujo.scrollWidth - flujo.clientWidth;
      if (max <= 0) return;
      const siguiente = destino + e.deltaY;
      if (siguiente < 0 && destino <= 0) return;
      if (siguiente > max && destino >= max) return;
      e.preventDefault();
      e.stopPropagation();
      destino = Math.min(Math.max(siguiente, 0), max);
      if (frame === null) frame = requestAnimationFrame(paso);
    };
    const onScroll = () => {
      if (frame === null) destino = flujo.scrollLeft;
      medir();
    };

    flujo.addEventListener('wheel', onWheel, { passive: false });
    flujo.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(medir, 50);
    return () => {
      clearTimeout(t);
      flujo.removeEventListener('wheel', onWheel);
      flujo.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ultimo, panel, lang]);

  const elegir = (k) => {
    setHover(null);
    setActivo((actual) => (actual === k ? null : k));
  };

  const seguir = (e) => {
    const r = escenaRef.current.getBoundingClientRect();
    moverRotulo.current?.x(e.clientX - r.left + 18);
    moverRotulo.current?.y(e.clientY - r.top + 18);
  };

  // Con teclado no hay cursor: el rotulo se para al lado de la pieza.
  const rotularDesde = (k, g) => {
    const r = escenaRef.current.getBoundingClientRect();
    const b = g.getBoundingClientRect();
    gsap.set(rotuloRef.current, { x: b.right - r.left + 16, y: b.top - r.top + b.height / 2 - 20 });
    setHover(k);
  };

  const elegido = ultimo != null ? projects[ultimo] : null;
  const rotulado = hover != null ? projects[hover] : null;
  const encendido = activo == null && enfocado != null ? projects[enfocado] : null;
  const numero = (p) => String(p.order).padStart(2, '0');

  const caso = useMemo(() => {
    if (!elegido) return null;
    const spec = elegido.spec ?? {};
    return {
      highlights: clean(pick(elegido.highlights, lang)),
      problema: pick(spec.problem, lang),
      restricciones: clean(pick(spec.constraints, lang)),
      resultado: pick(spec.outcome, lang),
    };
  }, [elegido, lang]);

  return (
    <div
      ref={escenaRef}
      className={`mapa ${activo != null ? 'is-abierto' : ''}`}
      onClick={() => setActivo(null)}
    >
      <div
        ref={pilarRef}
        className="mapa__pilar"
        style={{ aspectRatio: `${ANCHO} / ${ALTO + 2 * EXTRA}` }}
      >
        <svg
          viewBox={`0 ${-EXTRA} ${ANCHO} ${ALTO + 2 * EXTRA}`}
          role="group"
          aria-label={t(lang, 'projects')}
        >
          {projects.map((p, k) => (
            <g
              key={p.id}
              ref={(el) => {
                piezasRef.current[k] = el;
              }}
              className={`mapa__pieza ${activo === k ? 'is-activa' : ''} ${
                activo == null && enfocado === k ? 'is-encendida' : ''
              }`}
              role="button"
              tabIndex={0}
              aria-pressed={activo === k}
              aria-label={`${p.name} — ${pick(p.kicker, lang)}`}
              onClick={(e) => {
                e.stopPropagation();
                elegir(k);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  elegir(k);
                }
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'mouse') return;
                seguir(e);
                setHover(k);
              }}
              onPointerMove={seguir}
              onPointerLeave={() => setHover(null)}
              onFocus={(e) => e.currentTarget.matches(':focus-visible') && rotularDesde(k, e.currentTarget)}
              onBlur={() => setHover(null)}
            >
              <path d={piezas[k].d} />
            </g>
          ))}
        </svg>
      </div>

      <div ref={rotuloRef} className={`mapa__rotulo ${rotulado ? 'is-visible' : ''}`} aria-hidden="true">
        {rotulado && (
          <>
            <span className="mapa__rotulo-meta">
              {numero(rotulado)} · {pick(rotulado.kicker, lang)}
            </span>
            <span className="mapa__rotulo-fila">
              {rotulado.logo && <img className="mapa__rotulo-logo" src={rotulado.logo} alt="" />}
              <span className="mapa__rotulo-nombre font-dharma">{rotulado.name}</span>
            </span>
          </>
        )}
      </div>

      {/* Tactil: el nombre de la pieza encendida, abajo. Tocarlo abre el proyecto,
          igual que tocar la pieza. */}
      <button
        type="button"
        className={`mapa__leyenda ${encendido ? 'is-visible' : ''}`}
        tabIndex={encendido ? 0 : -1}
        aria-hidden={encendido ? undefined : true}
        onClick={(e) => {
          e.stopPropagation();
          if (enfocado != null) elegir(enfocado);
        }}
      >
        {encendido && (
          <>
            <span className="mapa__rotulo-meta">
              {numero(encendido)} / {String(N).padStart(2, '0')} · {pick(encendido.kicker, lang)}
            </span>
            <span className="mapa__rotulo-fila">
              {encendido.logo && <img className="mapa__rotulo-logo" src={encendido.logo} alt="" />}
              <span className="mapa__leyenda-nombre font-dharma">{encendido.name}</span>
            </span>
            <span className="mapa__leyenda-pista">{t(lang, 'tapToOpen')}</span>
          </>
        )}
      </button>

      <section
        ref={panelRef}
        className="mapa__panel"
        style={panel ?? undefined}
        aria-hidden={activo == null ? true : undefined}
        aria-label={elegido?.name}
        onClick={(e) => e.stopPropagation()}
      >
        {elegido && caso && (
          <>
            <header className="mapa__cabeza">
              <div className="mapa__meta">
                <span>
                  {numero(elegido)} / {String(N).padStart(2, '0')}
                </span>
                <span>{pick(elegido.kicker, lang)}</span>
                {!isPlaceholder(elegido.year) && <span>{elegido.year}</span>}
                {!isPlaceholder(elegido.role) && <span>{elegido.role}</span>}
                <button type="button" className="mapa__volver" onClick={() => setActivo(null)}>
                  {t(lang, 'backToMap')}
                </button>
              </div>
              <div className="mapa__identidad">
                {elegido.logo && <img className="mapa__logo" src={elegido.logo} alt={`${elegido.name} logo`} />}
                <h2 className="mapa__nombre font-dharma">{elegido.name}</h2>
              </div>
            </header>

            <div ref={flujoRef} className={`mapa__flujo no-scrollbar ${hayMas ? 'hay-mas' : ''}`}>
              <p className="mapa__bajada">{pick(elegido.tagline, lang)}</p>
              {!isPlaceholder(elegido.url) && (
                <a className="mapa__link" href={elegido.url} target="_blank" rel="noreferrer">
                  {t(lang, esRepo(elegido.url) ? 'seeCode' : 'seeItLive')}
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </a>
              )}
              {elegido.image && <Lamina key={elegido.id} src={elegido.image} alt={elegido.name} />}

              {!isPlaceholder(caso.problema) && (
                <section className="mapa__bloque mapa__bloque--columna">
                  <h3 className="mapa__titulo">{t(lang, 'theSpec')}</h3>
                  <p className="mapa__parrafo">{caso.problema}</p>
                  {caso.restricciones.length > 0 && (
                    <ul className="mapa__restricciones">
                      {caso.restricciones.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                  {!isPlaceholder(caso.resultado) && <p className="mapa__resultado">→ {caso.resultado}</p>}
                </section>
              )}

              {caso.highlights.length > 0 && (
                <section className="mapa__bloque mapa__bloque--columna">
                  <h3 className="mapa__titulo">{t(lang, 'whatItDoes')}</h3>
                  <ol className="mapa__puntos">
                    {caso.highlights.map((h, i) => (
                      <li key={i}>
                        <span>{String(i + 1).padStart(2, '0')}</span>
                        <p>{h}</p>
                      </li>
                    ))}
                  </ol>
                  {elegido.stack.length > 0 && <p className="mapa__stack">{elegido.stack.join(' · ')}</p>}
                </section>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Projects;
