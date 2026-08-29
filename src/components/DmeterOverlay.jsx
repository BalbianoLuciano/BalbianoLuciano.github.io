import React, { useEffect, useState } from 'react';
import RadialOverlay from './utils/RadialOverlay.jsx';
import dmeter from '../data/dmeter.json';
import projectsData from '../data/projects.json';
import { pick, t } from '../i18n/index.js';
import { useLang } from '../i18n/useLang.js';

/**
 * Apartado sobre Dmeter, donde Luciano trabaja.
 *
 * Se abre desde la palabra DMETER del hero con la misma mascara radial que
 * Contact y el detalle de proyecto (spec 001, Ley 2), y se monta a nivel Layout
 * por la Ley 3. Sin scroll vertical: todo entra en una pantalla.
 */

const isPlaceholder = (v) => !v || String(v).startsWith('TODO');

const DmeterOverlay = () => {
  const lang = useLang();
  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    const onOpen = (event) => {
      const { x, y } = event.detail ?? {};
      setOrigin({
        x: typeof x === 'number' ? x : window.innerWidth / 2,
        y: typeof y === 'number' ? y : window.innerHeight / 2,
      });
    };

    window.addEventListener('dmeter:open', onOpen);
    return () => window.removeEventListener('dmeter:open', onOpen);
  }, []);

  if (!origin) return null;

  // Los proyectos que salieron de ahi, en el orden en que aparecen en el riel.
  const susProyectos = projectsData.projects
    .filter((p) => dmeter.projectIds.includes(p.id))
    .sort((a, b) => a.order - b.order);

  const roleDetail = pick(dmeter.roleDetail, lang);

  return (
    <RadialOverlay origin={origin} onClose={() => setOrigin(null)} label={dmeter.name}>
      <div className="relative flex h-full w-full flex-col justify-center gap-5 overflow-hidden px-6 py-12 md:px-16 md:py-14">
        <header className="flex shrink-0 flex-col gap-3">
          <p className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
            {t(lang, 'myDream')}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <img
              src={dmeter.logo}
              alt=""
              aria-hidden="true"
              className="h-12 w-auto max-w-[80px] shrink-0 object-contain object-left md:h-16"
            />
            <h2 className="min-w-0 font-dharma text-[34px] uppercase leading-none tracking-widest md:text-[52px] lg:text-[68px]">
              {dmeter.name}
            </h2>
          </div>

          <p className="max-w-3xl font-outfit text-base leading-relaxed text-white/70 md:text-lg">
            {pick(dmeter.pitch, lang)}
          </p>

          {!isPlaceholder(roleDetail) && (
            <p className="max-w-3xl font-outfit text-sm leading-relaxed text-white/70 md:text-base">
              {roleDetail}
            </p>
          )}
        </header>

        <section className="flex shrink-0 flex-col gap-3">
          <h3 className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
            {t(lang, 'howWeWork')}
          </h3>
          <div
            data-lenis-prevent
            className="flex items-start gap-4 no-scrollbar overflow-x-auto overflow-y-hidden pb-2"
          >
            {dmeter.process.map((paso) => (
              <article
                key={paso.n}
                className="flex w-[74vw] shrink-0 flex-col gap-2 border-l border-white/15 pl-4 pr-2 sm:w-[46vw] lg:w-[26vw]"
              >
                <span className="font-outfit text-xs tracking-[0.2em] text-white/30">{paso.n}</span>
                <h4 className="font-outfit text-sm font-medium leading-snug text-white">
                  {pick(paso.title, lang)}
                </h4>
                <p className="line-clamp-4 font-outfit text-sm leading-relaxed text-white/60">
                  {pick(paso.text, lang)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex shrink-0 flex-col gap-2">
          <h3 className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
            {t(lang, 'fromHere')}
          </h3>
          <p className="font-outfit text-sm uppercase tracking-[0.15em] text-white/60">
            {susProyectos.map((p) => p.name).join(' · ')}
          </p>
        </section>

        <footer className="flex shrink-0 flex-wrap items-center gap-4">
          <a
            href={dmeter.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-outfit text-sm uppercase tracking-[0.2em] text-white underline-offset-8 transition-opacity hover:underline"
          >
            {t(lang, 'seeItLive')}
            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </a>
        </footer>
      </div>
    </RadialOverlay>
  );
};

export default DmeterOverlay;
