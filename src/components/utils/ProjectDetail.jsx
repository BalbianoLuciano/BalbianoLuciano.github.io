import React from 'react';
import { pick, t } from '../../i18n/index.js';
import { useLang } from '../../i18n/useLang.js';

/**
 * Detalle de un proyecto dentro del RadialOverlay.
 *
 * Una sola pantalla, sin scroll vertical (spec 001, Ley 1). Lo que no entra se
 * resuelve con el riel horizontal de highlights, no con overflow-y.
 */

const isPlaceholder = (v) => !v || String(v).startsWith('TODO');
const hasContent = (value) =>
  Array.isArray(value) ? value.some((v) => !isPlaceholder(v)) : !isPlaceholder(value);

const ProjectDetail = ({ project }) => {
  const lang = useLang();
  const highlights = (pick(project.highlights, lang) ?? []).filter((h) => !isPlaceholder(h));
  const rawSpec = project.spec ?? {};
  const spec = {
    problem: pick(rawSpec.problem, lang),
    constraints: pick(rawSpec.constraints, lang) ?? [],
    outcome: pick(rawSpec.outcome, lang),
  };

  return (
    <div className="relative isolate flex h-full w-full flex-col justify-center gap-5 overflow-hidden px-6 py-12 md:px-16 md:py-14">
      {project.image && (
        <>
          <img
            src={project.image}
            alt={project.name}
            className="absolute right-0 top-0 -z-10 h-full w-full object-cover object-top opacity-20 md:w-3/5"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-dark via-dark/90 to-transparent"
          />
        </>
      )}
      <header className="flex shrink-0 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-4 font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
          <span>{String(project.order).padStart(2, '0')}</span>
          <span>{pick(project.kicker, lang)}</span>
          {hasContent(project.role) && <span>{project.role}</span>}
          {hasContent(project.year) && <span>{project.year}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {project.logo && (
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="h-12 w-auto max-w-[160px] shrink-0 object-contain object-left md:h-16 md:max-w-[220px]"
            />
          )}
          <h2 className="min-w-0 font-dharma text-[34px] uppercase leading-none tracking-widest md:text-[52px] lg:text-[68px]">
            {project.name}
          </h2>
        </div>

        <p className="max-w-3xl font-outfit text-base leading-relaxed text-white/70 md:text-lg">
          {pick(project.tagline, lang)}
        </p>
      </header>

      {hasContent(spec.problem) && (
        <section className="flex max-w-3xl shrink-0 flex-col gap-2">
          <h3 className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
            {t(lang, 'theSpec')}
          </h3>
          <p className="font-outfit text-sm leading-relaxed text-white/70 md:text-base">
            {spec.problem}
          </p>
          {hasContent(spec.constraints) && (
            <ul className="flex flex-col gap-1 pt-1">
              {spec.constraints
                .filter((c) => !isPlaceholder(c))
                .map((c, i) => (
                  <li
                    key={i}
                    className="font-outfit text-sm leading-relaxed text-white/50 before:mr-2 before:content-['—']"
                  >
                    {c}
                  </li>
                ))}
            </ul>
          )}
          {hasContent(spec.outcome) && (
            <p className="pt-1 font-outfit text-sm leading-relaxed text-white md:text-base">
              → {spec.outcome}
            </p>
          )}
        </section>
      )}

      {highlights.length > 0 && (
        <section className="flex min-h-0 shrink-0 flex-col gap-3">
          <h3 className="font-outfit text-xs uppercase tracking-[0.2em] text-white/40">
            {t(lang, 'whatItDoes')}
          </h3>
          <div
            data-lenis-prevent
            className="flex items-start gap-4 no-scrollbar overflow-x-auto overflow-y-hidden pb-2"
          >
            {highlights.map((highlight, i) => (
              <article
                key={i}
                className="flex w-[74vw] shrink-0 flex-col gap-2 border-l border-white/15 pl-4 pr-2 sm:w-[46vw] lg:w-[26vw]"
              >
                <span className="font-outfit text-xs tracking-[0.2em] text-white/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* line-clamp y no overflow: sin scroll vertical (Ley 1), un
                    highlight largo tiene que cortar limpio, no a mitad de linea. */}
                <p className="line-clamp-5 font-outfit text-sm leading-relaxed text-white/80">
                  {highlight}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="flex shrink-0 flex-wrap items-center gap-3">
        <p className="font-outfit text-[11px] uppercase tracking-[0.15em] text-white/35">
          {project.stack.filter((t) => !isPlaceholder(t)).join(' · ')}
        </p>

        {hasContent(project.url) && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-outfit text-sm uppercase tracking-[0.2em] text-white underline-offset-8 transition-opacity hover:underline"
          >
            {t(lang, 'seeItLive')}
            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </a>
        )}
      </footer>
    </div>
  );
};

export default ProjectDetail;
