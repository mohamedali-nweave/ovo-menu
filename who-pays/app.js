/* Who Pays? · app.js */
(() => {
'use strict';

const MIN = 2, MAX = 30, SPIN_MS = 10000, TURNS = 10;
const STR = {
  ar: {title: 'مين هيدفع؟', howMany: 'عددكم كام؟', done: 'تم', range: `اكتب رقم من ${MIN} لـ ${MAX}`, finger: 'كل واحد يحط صباعه على رقم', win: 'رقم {n} هو اللي هيدفع', again: 'لفّة تانية', change: 'غيّر العدد', lang: 'EN'},
  en: {title: 'Who Pays?', howMany: 'How many people?', done: 'Done', range: `Enter a number from ${MIN} to ${MAX}`, finger: 'Everyone put a finger on a number', win: 'Number {n} pays', again: 'Spin again', change: 'Change number', lang: 'ع'}
};

const $ = s => document.querySelector(s);
const NS = 'http://www.w3.org/2000/svg';
const setup = $('#setup'), count = $('#count'), range = $('#range'), bDone = $('#bDone');
const play = $('#play'), msg = $('#msg'), wheel = $('#wheel'), slices = $('#slices'), pointer = $('#pointer'), after = $('#after');
const timer = $('#timer'), timerText = $('#timerText');
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* Always opens in English; Arabic only via the language button or ?lang=ar. */
let lang = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en';
let people = 0, angle = 0, winner = null, spinning = false, tick = 0;
const t = k => STR[lang][k];

/* Accepts Arabic-keyboard digits too. Returns the number, or null when it is not a whole number. */
function readCount() {
  const v = count.value.trim().replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c));
  return /^\d+$/.test(v) ? Number(v) : null;
}
function validate() {
  const n = readCount();
  const ok = n != null && n >= MIN && n <= MAX;
  bDone.disabled = !ok;
  range.hidden = ok || count.value.trim() === '';
}

/* Equal slices starting from the top, clockwise. */
const sliceSize = () => 360 / people;
const sliceCentre = i => -90 + (i + .5) * sliceSize();
const polar = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
function drawWheel() {
  const R = 98, step = sliceSize(), font = people <= 8 ? 15 : people <= 14 ? 12 : people <= 20 ? 9 : 7.5;
  slices.replaceChildren();
  for (let i = 0; i < people; i++) {
    const on = i === winner;
    const fill = on ? '#014BAA' : i % 2 ? '#E6EDF7' : '#FFFFFF';
    const [x0, y0] = polar(R, -90 + i * step), [x1, y1] = polar(R, -90 + (i + 1) * step);
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', `M0 0L${x0.toFixed(3)} ${y0.toFixed(3)}A${R} ${R} 0 ${step > 180 ? 1 : 0} 1 ${x1.toFixed(3)} ${y1.toFixed(3)}Z`);
    p.setAttribute('fill', fill);
    p.setAttribute('stroke', '#014BAA');
    p.setAttribute('stroke-width', '1.2');
    p.setAttribute('stroke-linejoin', 'round');
    const [lx, ly] = polar(86, sliceCentre(i));
    const n = document.createElementNS(NS, 'text');
    n.setAttribute('x', lx.toFixed(2));
    n.setAttribute('y', ly.toFixed(2));
    n.setAttribute('text-anchor', 'middle');
    n.setAttribute('dominant-baseline', 'central');
    n.setAttribute('font-size', font);
    n.setAttribute('font-weight', '800');
    n.setAttribute('fill', on ? '#FFFFFF' : '#014BAA');
    n.textContent = i + 1;
    slices.append(p, n);
  }
}

function randomBelow(n) {
  const limit = Math.floor(0x100000000 / n) * n, a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= limit);
  return a[0] % n;
}
function showMessage() {
  msg.classList.toggle('win', winner != null);
  msg.textContent = winner != null ? t('win').replace('{n}', winner + 1) : t('finger');
}
function spin() {
  spinning = true;
  winner = null;
  after.classList.add('off');
  drawWheel();
  showMessage();
  const pick = randomBelow(people);
  const jitter = (Math.random() - .5) * sliceSize() * .6;
  const target = sliceCentre(pick) + jitter;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const from = angle;
  const to = from + TURNS * 360 + (((target - from) % 360) + 360) % 360;
  const duration = reduce ? 600 : SPIN_MS;
  const anim = pointer.animate(
    [{transform: `rotate(${from}deg)`}, {transform: `rotate(${to}deg)`}],
    {duration, easing: 'cubic-bezier(.16,.72,.14,1)', fill: 'forwards'}
  );
  const showTime = () => { timerText.textContent = Math.max(1, Math.ceil((duration - (anim.currentTime || 0)) / 1000)); };
  timer.classList.remove('off');
  showTime();
  clearInterval(tick);
  tick = setInterval(showTime, 100);
  anim.onfinish = () => {
    clearInterval(tick);
    timer.classList.add('off');
    angle = to % 360;
    pointer.style.transform = `rotate(${angle}deg)`;
    anim.cancel();
    winner = pick;
    spinning = false;
    drawWheel();
    showMessage();
    after.classList.remove('off');
  };
}
/* Gives the wheel all the room the screen has left, on any phone or tablet, in either orientation. */
function fit() {
  if (play.hidden) return;
  const gap = parseFloat(getComputedStyle(play).rowGap) || 0;
  const wide = matchMedia('(orientation: landscape)').matches;
  const H = play.clientHeight, W = play.clientWidth;
  const h = wide ? H - timer.offsetHeight - gap : H - msg.offsetHeight - timer.offsetHeight - after.offsetHeight - gap * 3;
  const w = wide ? W - 2 * Math.max(150, W * .18) - gap * 2 : W;
  const size = Math.max(160, Math.floor(Math.min(w, h)));
  wheel.style.width = wheel.style.height = size + 'px';
}
function start() {
  people = readCount();
  count.blur();
  setup.hidden = true;
  play.hidden = false;
  document.body.classList.add('playing');
  fit();
  angle = 0;
  pointer.style.transform = 'rotate(0deg)';
  spin();
}
function reset() {
  document.body.classList.remove('playing');
  play.hidden = true;
  setup.hidden = false;
  winner = null;
  count.value = '';
  validate();
}
function setLang(l) {
  lang = l;
  store.set('ovoLang', l);
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.title = `${t('title')} · OVO`;
  document.querySelectorAll('[data-t]').forEach(n => { n.textContent = t(n.dataset.t); });
  $('#bLang').textContent = t('lang');
  if (!play.hidden) { showMessage(); fit(); }
}

count.addEventListener('input', validate);
setup.addEventListener('submit', e => { e.preventDefault(); if (!bDone.disabled) start(); });
$('#bAgain').onclick = () => { if (!spinning) spin(); };
$('#bChange').onclick = () => { if (!spinning) reset(); };
$('#bLang').onclick = () => setLang(lang === 'ar' ? 'en' : 'ar');
wheel.addEventListener('contextmenu', e => e.preventDefault());
new ResizeObserver(fit).observe(play);
window.addEventListener('resize', fit);
setLang(lang);
validate();
})();
