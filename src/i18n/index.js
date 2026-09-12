/**
 * i18n del portfolio. Ingles por defecto, espanol como segundo idioma.
 *
 * No usamos i18next: la pagina es Astro estatico con islas de React, y lo unico
 * que hace falta es un diccionario y un evento. El idioma se guarda en
 * localStorage y se avisa con `lang:change`, el mismo patron que ya usan
 * `contact:open` y `split:change`.
 *
 * El texto renderizado por Astro (que es HTML plano) se actualiza por
 * `data-i18n`, sin recargar la pagina.
 */

export const LANGS = ['en', 'es'];
export const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'portfolio-lang';

export const ui = {
  en: {
    socials: 'Socials',
    role: 'Software Engineer',
    method: 'Spec-Driven Development',
    contact: 'Contact',
    projects: 'Projects',
    tryScrolling: 'Try scrolling',
    rights: 'All rights reserved.',

    contactTitle: "Let's talk",
    formGreeting: 'Hi Luciano, I am',
    formFrom: 'from',
    formBecause: '. I am reaching out because',
    formReply: '. You can reach me at',
    fieldName: 'your name',
    fieldCompany: 'where you work',
    fieldMessage: 'what you have in mind',
    fieldEmail: 'your email',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Sent. I will get back to you shortly.',
    sendFailed: "That didn't go through. Open in your mail app",
    closeLabel: 'Close',

    theSpec: 'The spec',
    whatItDoes: 'What it does',
    seeItLive: 'See it live',
    seeCode: 'See the code',
    backToMap: 'Back to the map',
    tapToOpen: 'Tap to open',

    dreamLine: 'Building my dream at',
    myDream: 'My dream',
    howWeWork: 'How we work',
    fromHere: 'Projects that came from here',
  },
  es: {
    socials: 'Redes',
    role: 'Software Engineer',
    method: 'Spec-Driven Development',
    contact: 'Contacto',
    projects: 'Proyectos',
    tryScrolling: 'Probá scrollear',
    rights: 'Todos los derechos reservados.',

    contactTitle: 'Hablemos',
    formGreeting: 'Hola Luciano, soy',
    formFrom: 'de',
    formBecause: '. Te escribo porque',
    formReply: '. Podés responderme a',
    fieldName: 'tu nombre',
    fieldCompany: 'dónde trabajás',
    fieldMessage: 'en qué estás pensando',
    fieldEmail: 'tu email',
    send: 'Enviar',
    sending: 'Enviando…',
    sent: 'Listo, tu mensaje salió. Te respondo a la brevedad.',
    sendFailed: 'No salió. Abrir en tu correo',
    closeLabel: 'Cerrar',

    theSpec: 'La spec',
    whatItDoes: 'Qué hace',
    seeItLive: 'Ver el sitio',
    seeCode: 'Ver el código',
    backToMap: 'Volver al mapa',
    tapToOpen: 'Tocá para abrir',

    dreamLine: 'Construyendo mi sueño en',
    myDream: 'Mi sueño',
    howWeWork: 'Cómo trabajamos',
    fromHere: 'Proyectos que salieron de acá',
  },
};

export const getLang = () => {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  let stored = null;
  try {
    stored = window.localStorage?.getItem(STORAGE_KEY) ?? null;
  } catch {
    // Leer localStorage tira excepcion si el navegador bloquea el storage.
    return DEFAULT_LANG;
  }
  // El `typeof` no es redundante: sin el, TS no puede descartar el null.
  if (typeof stored === 'string' && LANGS.includes(stored)) return stored;
  return DEFAULT_LANG;
};

const FADE_MS = 260;
const STAGGER_MS = 28;
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const sinAnimacion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

let cambiando = false;

export const setLang = async (lang) => {
  if (!LANGS.includes(lang) || cambiando) return;
  cambiando = true;

  try {
    window.localStorage?.setItem(STORAGE_KEY, lang);
  } catch {
    // Modo incognito o storage bloqueado: el idioma igual cambia en memoria.
  }
  document.documentElement.lang = lang;

  // El texto se reemplaza escondido detras del fade, y `lang:change` se emite
  // en ese mismo instante: asi el HTML de Astro y las islas de React cambian
  // juntos y no se ve un idioma pisando al otro.
  const conmutar = () => {
    applyStaticText(lang);
    window.dispatchEvent(new CustomEvent('lang:change', { detail: { lang } }));
  };

  if (sinAnimacion()) {
    conmutar();
    cambiando = false;
    return;
  }

  const els = [...document.querySelectorAll('[data-i18n]')];
  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * STAGGER_MS}ms`;
    el.classList.add('i18n-out');
  });

  await espera(FADE_MS + els.length * STAGGER_MS);
  conmutar();
  els.forEach((el) => el.classList.remove('i18n-out'));

  await espera(FADE_MS + els.length * STAGGER_MS);
  els.forEach((el) => {
    el.style.transitionDelay = '';
  });
  cambiando = false;
};

export const t = (lang, key) => ui[lang]?.[key] ?? ui[DEFAULT_LANG][key] ?? key;

/** Traduce el HTML que renderizo Astro, marcado con `data-i18n`. */
export const applyStaticText = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (ui[lang]?.[key]) el.textContent = ui[lang][key];
  });
};

/** Devuelve el campo traducible de un proyecto, con fallback a ingles. */
export const pick = (field, lang) => {
  if (field == null) return field;
  if (Array.isArray(field) || typeof field === 'string') return field;
  return field[lang] ?? field[DEFAULT_LANG] ?? '';
};
