import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import RadialOverlay from './utils/RadialOverlay.jsx';
import BlankField from './utils/BlankField.jsx';
import socialLinks from './utils/socialLinks.json';
import { t } from '../i18n/index.js';
import { useLang } from '../i18n/useLang.js';

const linkFor = (name) => socialLinks.find((s) => s.name === name)?.url ?? '#';

// Config de EmailJS por variables de entorno. Si falta alguna, el formulario
// sigue siendo usable y cae al mailto en vez de romper.
const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
const canSend = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const EMPTY = { name: '', company: '', message: '', email: '' };

/**
 * Contacto. Se abre con el evento `contact:open`, que trae el origen de la
 * mascara radial.
 *
 * El formulario es un parrafo con huecos, no una pila de campos: se lee como
 * una frase y los inputs son solo lineas. Sin contenedores ni botones solidos.
 * Sin scroll (spec 001, Ley 1): todo entra en una pantalla.
 */
const Contact = () => {
  const lang = useLang();
  const [origin, setOrigin] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  useEffect(() => {
    const onOpen = (event) => {
      const { x, y } = event.detail ?? {};
      setOrigin({
        x: typeof x === 'number' ? x : window.innerWidth / 2,
        y: typeof y === 'number' ? y : window.innerHeight / 2,
      });
      setStatus('idle');
    };

    window.addEventListener('contact:open', onOpen);
    return () => window.removeEventListener('contact:open', onOpen);
  }, []);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const isComplete =
    form.name.trim() && form.message.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const mailto = `mailto:balbiano06@gmail.com?subject=${encodeURIComponent(
    `Portfolio — ${form.name || ''}`
  )}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name}${form.company ? ` (${form.company})` : ''}\n${form.email}`
  )}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete || status === 'sending') return;

    if (!canSend) {
      // Sin claves de EmailJS no inventamos un envio que no ocurre.
      window.location.href = mailto;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          company: form.company,
          message: form.message,
          reply_to: form.email,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  if (!origin) return null;

  return (
    <RadialOverlay origin={origin} onClose={() => setOrigin(null)} label="Contact">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-6 md:px-12">
        <h2 className="font-dharma text-center text-[44px] uppercase leading-none tracking-widest md:text-[72px] lg:text-[92px]">
          {t(lang, 'contactTitle')}
        </h2>

        {status === 'sent' ? (
          <p className="max-w-xl text-center font-outfit text-lg leading-relaxed text-white/80">
            {t(lang, 'sent')}
          </p>
        ) : (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="max-w-3xl font-outfit text-lg leading-loose text-white/70 md:text-2xl md:leading-loose"
          >
            <p>
              {t(lang, 'formGreeting')}
              <BlankField id="name" label={t(lang, 'fieldName')} value={form.name} onChange={set('name')} />
              {t(lang, 'formFrom')}
              <BlankField
                id="company"
                label={t(lang, 'fieldCompany')}
                value={form.company}
                onChange={set('company')}
              />
              {t(lang, 'formBecause')}
              <BlankField
                id="message"
                label={t(lang, 'fieldMessage')}
                value={form.message}
                onChange={set('message')}
                min={18}
                max={44}
              />
              {t(lang, 'formReply')}
              <BlankField
                id="email"
                label={t(lang, 'fieldEmail')}
                type="email"
                value={form.email}
                onChange={set('email')}
                min={14}
                max={34}
              />
              .
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-8">
              <button
                type="submit"
                disabled={!isComplete || status === 'sending'}
                className="font-outfit text-base uppercase tracking-[0.2em] text-white underline-offset-8 transition-opacity hover:underline disabled:cursor-not-allowed disabled:text-white/25 disabled:no-underline md:text-lg"
              >
                {status === 'sending' ? t(lang, 'sending') : `${t(lang, 'send')} →`}
              </button>

              {status === 'error' && (
                <a href={mailto} className="font-outfit text-sm text-white/50 underline underline-offset-4">
                  {t(lang, 'sendFailed')} →
                </a>
              )}
            </div>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-outfit text-sm text-white/40">
          <a href="mailto:balbiano06@gmail.com" className="transition-colors hover:text-white">
            balbiano06@gmail.com
          </a>
          <a href="tel:+5493735411941" className="transition-colors hover:text-white">
            (+54) 9 3735-411941
          </a>
          {['github', 'linkedin', 'instagram'].map((name) => (
            <a
              key={name}
              href={linkFor(name)}
              target="_blank"
              rel="noreferrer"
              className="uppercase tracking-[0.15em] transition-colors hover:text-white"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </RadialOverlay>
  );
};

export default Contact;
