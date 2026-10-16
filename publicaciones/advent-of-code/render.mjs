// Regenera el carrusel (slides/slide-NN.png a 2x + advent-of-code-carrusel.pdf) y el
// video (advent-of-code-dia10.mp4, 1080x1350 a 30 fps).
//
//   node publicaciones/advent-of-code/render.mjs            # los dos
//   node publicaciones/advent-of-code/render.mjs carrusel   # solo el carrusel
//   node publicaciones/advent-of-code/render.mjs video      # solo el video
//
// Mismo esquema que publicaciones/gridwright-tokens/render.mjs: servidor propio en
// 127.0.0.1 que sirve SOLO esta carpeta, Playwright desde node_modules de gridwright.
// El video se arma cuadro por cuadro con window.render(t) y ffmpeg.
import http from 'node:http';
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PW = resolve(AQUI, '../../../gridwright/node_modules/.pnpm/playwright@1.62.1/node_modules/playwright/index.mjs');
const { chromium } = await import(pathToFileURL(PW).href).catch(() => {
  console.error('No encuentro Playwright en', PW, '— instalar gridwright o ajustar la ruta.');
  process.exit(1);
});
const QUE = process.argv[2] ?? 'todo';

const TIPOS = { '.html': 'text/html', '.png': 'image/png', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  const ruta = join(AQUI, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!ruta.startsWith(AQUI)) { res.writeHead(404).end(); return; }
  let cuerpo;
  try { cuerpo = await readFile(ruta); } catch { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream' }).end(cuerpo);
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const BASE = `http://127.0.0.1:${server.address().port}`;

async function abrir(browser, archivo, escala) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: escala });
  await page.goto(`${BASE}/${archivo}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (!await page.evaluate(() => document.fonts.check('700 100px dharma-gothic-e'))) {
    console.warn(`AVISO: Dharma no cargo en ${archivo}, el titular sale en Aileron. ¿Hay red?`);
  }
  return page;
}

async function carrusel(browser) {
  const page = await abrir(browser, 'carrusel.html', 2);
  const desbordan = await page.evaluate(() => [...document.querySelectorAll('.slide')].map((s, i) => {
    const top = s.getBoundingClientRect().top;
    const fondo = Math.max(...[...s.children].map((c) => c.getBoundingClientRect().bottom - top));
    return fondo > 1262 ? i + 1 : null;
  }).filter(Boolean));
  if (desbordan.length) console.warn('AVISO: se pasan de la caja util las slides', desbordan.join(', '));

  await mkdir(join(AQUI, 'slides'), { recursive: true });
  const slides = await page.locator('.slide').all();
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: join(AQUI, 'slides', `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }
  const paginas = join(AQUI, 'slides', '_paginas.html');
  const imgs = slides.map((_, i) => `<img src="slide-${String(i + 1).padStart(2, '0')}.png">`).join('');
  await writeFile(paginas, '<!doctype html><style>@page{size:1080px 1350px;margin:0}html,body{margin:0}'
    + 'img{display:block;width:1080px;height:1350px;break-after:page}img:last-child{break-after:auto}</style>' + imgs);
  const pdf = await browser.newPage();
  await pdf.goto(`${BASE}/slides/_paginas.html`, { waitUntil: 'networkidle' });
  await pdf.pdf({ path: join(AQUI, 'advent-of-code-carrusel.pdf'), width: '1080px', height: '1350px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await rm(paginas);
  console.log(`carrusel: ${slides.length} slides y advent-of-code-carrusel.pdf`);
}

async function video(browser) {
  const FPS = 30;
  const page = await abrir(browser, 'animacion.html', 1);
  const duracion = await page.evaluate(() => window.DURACION);
  const frames = join(AQUI, 'frames');
  await rm(frames, { recursive: true, force: true });
  await mkdir(frames);
  const cuadro = page.locator('#cuadro');
  const total = duracion * FPS;
  for (let f = 0; f < total; f++) {
    await page.evaluate((t) => window.render(t), f / FPS);
    await cuadro.screenshot({ path: join(frames, `f-${String(f).padStart(4, '0')}.png`) });
  }
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(frames, 'f-%04d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-movflags', '+faststart',
    join(AQUI, 'advent-of-code-dia10.mp4')]);
  await rm(frames, { recursive: true });
  console.log(`video: ${total} cuadros, advent-of-code-dia10.mp4`);
}

const browser = await chromium.launch({ channel: 'chrome' });
try {
  if (QUE !== 'video') await carrusel(browser);
  if (QUE !== 'carrusel') await video(browser);
} finally {
  await browser.close();
  server.close();
}
