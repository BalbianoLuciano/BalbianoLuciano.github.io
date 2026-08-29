import { useEffect, useState } from 'react';
import { DEFAULT_LANG, getLang } from './index.js';

/**
 * Idioma actual dentro de una isla de React.
 *
 * Arranca en DEFAULT_LANG y no en getLang() para que el markup del servidor y
 * el del primer render del cliente coincidan: leer localStorage durante el
 * render romperia la hidratacion. El valor real se aplica en el efecto.
 */
export const useLang = () => {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    setLangState(getLang());
    const onChange = (e) => setLangState(e.detail?.lang ?? DEFAULT_LANG);
    window.addEventListener('lang:change', onChange);
    return () => window.removeEventListener('lang:change', onChange);
  }, []);

  return lang;
};

export default useLang;
