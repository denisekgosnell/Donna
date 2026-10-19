#!/usr/bin/env node
/*
 * Renders build/video/the-bottle.html to PNG frames with the preinstalled
 * Playwright Chromium, then assembles the video assets with ffmpeg.
 *
 *   node build/video/render.js              full render (1740 frames) into assets/video/
 *   node build/video/render.js --frames 60  smoke test: 60 frames, outputs stay in build/scratch/bottle/
 *   node build/video/render.js --skip-frames  reuse frames already in build/scratch/bottle/
 *
 * Chromium comes from PLAYWRIGHT_BROWSERS_PATH (/opt/pw-browsers). Never run
 * `playwright install` here.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let playwright;
try { playwright = require('playwright'); }
catch (e) { playwright = require('/opt/node-tools/node_modules/playwright'); }
const { chromium } = playwright;

process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';

const ROOT = path.resolve(__dirname, '..', '..');
const HTML = path.join(ROOT, 'build', 'video', 'the-bottle.html');
const SCRATCH = path.join(ROOT, 'build', 'scratch', 'bottle');
const ASSETS = path.join(ROOT, 'assets', 'video');
const FPS = 30;
const TOTAL = 1740;
const STILLS = { 'the-bottle-poster.png': 450, 'the-bottle-1.png': 300, 'the-bottle-2.png': 900, 'the-bottle-3.png': 1550 };

const args = process.argv.slice(2);
function flag(name) { return args.indexOf(name) !== -1; }
function opt(name, dflt) { const i = args.indexOf(name); return i !== -1 && args[i + 1] ? args[i + 1] : dflt; }

const frames = Math.min(TOTAL, parseInt(opt('--frames', String(TOTAL)), 10));
const smoke = frames < TOTAL;
const outDir = smoke ? SCRATCH : ASSETS;
const prefix = smoke ? 'smoke-' : '';

function run(cmd, cmdArgs) {
  console.log('$ ' + cmd + ' ' + cmdArgs.join(' '));
  execFileSync(cmd, cmdArgs, { stdio: 'inherit' });
}
function sizeOf(p) { return fs.statSync(p).size; }

async function renderFrames() {
  fs.mkdirSync(SCRATCH, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => { console.error('page error:', e.message); process.exitCode = 1; });
  await page.goto('file://' + HTML + '?frame=0');
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL_FRAMES);
  if (total !== TOTAL) throw new Error('page reports ' + total + ' frames, expected ' + TOTAL);

  const probe = await page.evaluate(() => window.__fontProbe());
  console.log('font probe:', JSON.stringify(probe));
  const qa = await page.evaluate(() => window.__qa());
  console.log('self test:', JSON.stringify(qa));
  if (qa.overlapCount > 0) { console.error('items overlap text in ' + qa.overlapCount + ' frame checks'); process.exitCode = 1; }
  if (qa.counts.A !== 10 || qa.counts.B[0] !== 10 || qa.counts.B[1] !== 30 || qa.counts.C[0] !== 30 || qa.counts.C[1] !== 2) {
    console.error('counter totals are off: ' + JSON.stringify(qa.counts)); process.exitCode = 1;
  }

  const t0 = Date.now();
  for (let n = 0; n < frames; n++) {
    const dataUrl = await page.evaluate((k) => {
      window.seek(k);
      return document.getElementById('stage').toDataURL('image/png');
    }, n);
    const buf = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
    fs.writeFileSync(path.join(SCRATCH, 'frame-' + String(n).padStart(5, '0') + '.png'), buf);
    if (n % 100 === 0 || n === frames - 1) {
      const el = (Date.now() - t0) / 1000;
      console.log('frame ' + n + '/' + (frames - 1) + '  ' + el.toFixed(1) + 's');
    }
  }
  await browser.close();
}

function encode() {
  fs.mkdirSync(outDir, { recursive: true });
  const input = path.join(SCRATCH, 'frame-%05d.png');
  const mp4 = path.join(outDir, prefix + 'the-bottle.mp4');
  const webm = path.join(outDir, prefix + 'the-bottle.webm');
  const vf = 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p';
  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-stats',
    '-framerate', String(FPS), '-i', input, '-frames:v', String(frames),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-vf', vf,
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(FPS), '-an', mp4]);
  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-stats',
    '-framerate', String(FPS), '-i', input, '-frames:v', String(frames),
    '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '3',
    '-vf', vf, '-pix_fmt', 'yuv420p', '-r', String(FPS), '-an', webm]);
  for (const name of Object.keys(STILLS)) {
    const n = STILLS[name];
    const src = path.join(SCRATCH, 'frame-' + String(n).padStart(5, '0') + '.png');
    if (!fs.existsSync(src)) { console.log('skip ' + name + ' (frame ' + n + ' not rendered)'); continue; }
    fs.copyFileSync(src, path.join(outDir, prefix + name));
  }
  console.log('\nwritten:');
  for (const f of fs.readdirSync(outDir).filter((f) => f.startsWith(prefix + 'the-bottle')).sort()) {
    console.log('  ' + path.join(outDir, f) + '  ' + sizeOf(path.join(outDir, f)) + ' bytes');
  }
  const mp4Size = sizeOf(mp4);
  if (mp4Size > 15 * 1024 * 1024) { console.error('mp4 is over the 15 MB budget'); process.exitCode = 1; }
  run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=codec_name,pix_fmt,width,height,r_frame_rate,nb_frames:format=duration,size', '-of', 'default=noprint_wrappers=1', mp4]);
}

(async () => {
  if (!flag('--skip-frames')) await renderFrames();
  if (!flag('--skip-encode')) encode();
})().catch((e) => { console.error(e); process.exit(1); });
