/* OVO Match · app.js
   السوايب والماتش ورسم الكوبايات والشير. الداتا والأسعار في data.js */
(() => {
'use strict';

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const el = (tag, cls, txt) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
};
const clamp = v => Math.max(0, Math.min(1, v));
const rnd = n => Math.floor(Math.random() * n);
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
};
function mix(a, b, k) {
  const h = c => [1, 3, 5].map(j => parseInt(c.slice(j, j + 2), 16));
  const A = h(a), B = h(b);
  return '#' + A.map((v, j) => Math.round(v + (B[j] - v) * k).toString(16).padStart(2, '0')).join('');
}
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* ---------- strings ---------- */
const STR = {
  ar: {
    chem: 'الكيميا', hint: 'يمين = عجبني · شمال = لأ · فوق = سوبر لايك ⭐',
    mTitle: 'حصل ماتش!', mSub: 'إنت و {d} عاجبين بعض 😍',
    cash: 'ورّي الكاشير 🧾', share: 'شير على الستوري 📸', keep: 'كمّل سوايب', also: 'ممكن يعجبوك كمان 👀',
    order: 'ورّي الشاشة دي للكاشير 👇', back: 'رجوع',
    pTitle: 'ولا ماتش؟ 🫠', pSub: 'إنت صعب الإرضاء! تحب نختارلك إحنا ولا تبدأ من الأول؟',
    setup: 'بلايند ديت: اختارولي 🙈', again: 'ابدأ من الأول',
    cur: 'ج', curLong: 'جنيه', M: 'وسط', L: 'كبير', addons: 'إضافات',
    green: 'جرين فلاج', red: 'ريد فلاج', like: 'عجبني', nope: 'لأ', sup: 'سوبر لايك',
    lang: 'English', restart: 'ابدأ من الأول', undo: 'رجّع آخر كارت',
    shareText: 'لقيت ماتشي في OVO: {d} 💙', storyBottom: 'لقيت ماتشي في OVO 💙', storyLoc: 'كامب شيزار · إسكندرية',
    saved: 'الصورة اتنزلت ✅', shareFail: 'معرفناش نعمل الصورة، جرّب تاني'
  },
  en: {
    chem: 'Chemistry', hint: 'Right = like · Left = nope · Up = Super Like ⭐',
    mTitle: "It's a Match!", mSub: 'You and {d} like each other 😍',
    cash: 'Show the cashier 🧾', share: 'Share to story 📸', keep: 'Keep swiping', also: 'You might also like 👀',
    order: 'Show this screen to the cashier 👇', back: 'Back',
    pTitle: 'No match? 🫠', pSub: 'Tough crowd! Want us to pick for you, or start over?',
    setup: 'Blind date: pick for me 🙈', again: 'Start over',
    cur: 'EGP', curLong: 'EGP', M: 'M', L: 'L', addons: 'Add-ons',
    green: 'Green flag', red: 'Red flag', like: 'LIKE', nope: 'NOPE', sup: 'SUPER LIKE',
    lang: 'عربي', restart: 'Start over', undo: 'Undo last card',
    shareText: 'Found my match at OVO: {d} 💙', storyBottom: 'Found my match at OVO 💙', storyLoc: 'Camp Shezar · Alexandria',
    saved: 'Image saved ✅', shareFail: "Couldn't make the image, try again"
  }
};
const CHIPS = {
  ar: {hot: 'سخن ☕', cold: 'ساقع 🧊', caf: 'فيه كافيين ⚡', nocof: 'من غير قهوة', nutty: 'مكسرات 🥜', choc: 'شوكولاتة 🍫', caramel: 'كراميل 🍯', cookie: 'بسكوت 🍪', berry: 'توت 🫐', tropical: 'استوائي 🥭', fruit: 'فواكه 🍓', citrus: 'حامض 🍋', fizzy: 'فوّار 🫧', strong: 'تقيل 💪', milky: 'كريمي 🥛', fresh: 'فريش 🍃', sweet: 'حلو 🍬'},
  en: {hot: 'Hot ☕', cold: 'Iced 🧊', caf: 'Caffeine ⚡', nocof: 'No coffee', nutty: 'Nutty 🥜', choc: 'Chocolatey 🍫', caramel: 'Caramel 🍯', cookie: 'Cookies 🍪', berry: 'Berry 🫐', tropical: 'Tropical 🥭', fruit: 'Fruity 🍓', citrus: 'Citrus 🍋', fizzy: 'Fizzy 🫧', strong: 'Strong 💪', milky: 'Creamy 🥛', fresh: 'Fresh 🍃', sweet: 'Sweet 🍬'}
};
const TASTE = ['nutty', 'choc', 'caramel', 'cookie', 'berry', 'tropical', 'fruit', 'citrus', 'fizzy', 'strong', 'milky', 'fresh', 'sweet'];

/* ---------- state ---------- */
const S = {lang: 'ar', cur: null, shown: null, seen: new Set(), matched: new Set(), W: {}, likes: [], L: 0, N: 0, sw: 0, total: 0, hist: []};
const isAr = () => S.lang === 'ar';
const t = k => (STR[S.lang][k] != null ? STR[S.lang][k] : k);
const MAX_SW = 15;

/* ---------- drinks ---------- */
const fUse = {}, gUse = {};
const D = MENU.map((r, i) => {
  const [name, price, gk, fk, o = {}] = r;
  const g = GROUPS[gk], fl = fk ? FLAVORS[fk] : null;
  const tags = new Set([g.tags, fl ? fl[1] : '', o.t || ''].join(' ').split(' ').filter(Boolean));
  const low = Math.min(...(Array.isArray(price) ? price.filter(v => v != null) : [price]));
  tags.add(low <= 90 ? 'p1' : low <= 135 ? 'p2' : 'p3');
  let bio = o.b;
  if (!bio && fl && fl.length > 2) {
    fUse[fk] = (fUse[fk] || 0) + 1;
    bio = fl[2 + (fUse[fk] - 1) % (fl.length - 2)];
  }
  gUse[gk] = (gUse[gk] || 0) + 1;
  return {
    i, name, p: price, g: gk, fk, cat: g.cat, x: g.x, k: o.k, cup: o.u || g.cup,
    col: o.c || (g.fc && fl ? fl[0] : g.col),
    acc: !o.c && !g.fc && fl ? fl[0] : null,
    bio: bio || g.cat,
    f: o.f || g.f[(gUse[gk] - 1) % g.f.length],
    tags: [...tags], slug: slug(name)
  };
});
const START = STARTERS.map(n => D.findIndex(d => d.name === n)).filter(i => i >= 0);
const sizes = p => Array.isArray(p) ? [[p[0], 'M'], [p[1], 'L']].filter(x => x[0] != null) : [[p, '']];
const priceTxt = p => sizes(p).map(x => x[0]).join(' / ') + ' ' + t('cur');

/* ---------- cup drawings ---------- */
const INK = '#12305C', BLUE = '#1F6FCC', CREAM = '#FFF8EE';
const st = (w = 4.5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const SHADOW = `<ellipse cx="100" cy="227" rx="62" ry="7" fill="${INK}" opacity=".13"/>`;
const clip = (id, p) => `<clipPath id="${id}"><path d="${p}"/></clipPath>`;
const glass = (id, p) => `<path d="${p}" fill="#fff" fill-opacity=".45"/>` + clip(id, p);
const outline = p => `<path d="${p}" fill="none" ${st()}/>`;
const layer = (id, inner) => `<g clip-path="url(#${id})">${inner}</g>`;
const shine = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>`;
const straw = (x1, y1, x2, y2, c = BLUE, w = 8) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${INK}" stroke-width="${w + 5}" stroke-linecap="round"/>` +
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const ice = (x, y, r) => `<rect x="${x}" y="${y}" width="24" height="22" rx="5" transform="rotate(${r} ${x + 12} ${y + 11})" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="2.5"/>`;
const steam = (x, y) => `<path d="M${x} ${y}c-7-8 7-12 0-22M${x + 16} ${y - 6}c-7-8 7-12 0-22M${x + 32} ${y}c-7-8 7-12 0-22" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity=".3"/>`;
const heart = (x, y, s, c) => `<path d="M0 6c-5-3-9-6-9-10 0-3 2-5 5-5 2 0 3 1 4 3 1-2 2-3 4-3 3 0 5 2 5 5 0 4-4 7-9 10z" transform="translate(${x} ${y}) scale(${s})" fill="${c}"/>`;
const leaf = (x, y, r) => `<path d="M0 0C6-9 18-9 24 0C18 9 6 9 0 0Z" transform="translate(${x} ${y}) rotate(${r})" fill="#4CAF6A" ${st(2.5)}/>`;
const wheel = (cx, cy, r, c) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" ${st(3.5)}/><circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="${mix(c, '#ffffff', .5)}"/>` +
  `<path d="M${cx} ${cy - r + 6}V${cy + r - 6}M${cx - r + 6} ${cy}H${cx + r - 6}" stroke="#fff" stroke-width="2.5"/>`;
const handle = (p, w) => `<path d="${p}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/><path d="${p}" fill="none" stroke="#fff" stroke-width="${w - 7}" stroke-linecap="round"/>`;

const CUPS = {
  iced(d, id) {
    const P = 'M52 62H148L137 214H63Z';
    return SHADOW + straw(116, 120, 134, 8) + glass(id, P) + layer(id,
      `<rect x="40" y="84" width="120" height="140" fill="${d.col}"/>` +
      (d.acc ? `<path d="M40 184Q70 174 100 184T160 184V224H40Z" fill="${d.acc}"/>` : '') +
      (d.tags.includes('milky') ? `<rect x="40" y="84" width="120" height="16" fill="${mix(d.col, '#ffffff', .55)}"/>` : '') +
      ice(64, 92, -12) + ice(100, 104, 14) + ice(78, 128, 24) + shine(66, 76, 74, 204)) +
      outline(P) + `<rect x="46" y="52" width="108" height="14" rx="6" fill="#fff" ${st()}/>`;
  },
  frappe(d, id) {
    const P = 'M54 92H146L136 214H64Z';
    return SHADOW + straw(112, 130, 128, 6) + clip(id, P) + `<path d="${P}" fill="${d.col}"/>` + layer(id,
      (d.acc ? `<path d="M56 112L72 124L88 112L104 124L120 112L136 124L152 112" fill="none" stroke="${d.acc}" stroke-width="5" stroke-linejoin="round"/>` : '') +
      shine(66, 100, 74, 206)) + outline(P) +
      `<path d="M58 92C54 74 70 66 78 72C80 56 98 52 104 64C112 50 132 58 128 72C140 70 146 84 142 92Z" fill="${CREAM}" ${st(3.5)}/>` +
      `<path d="M70 80Q84 70 96 80T122 78" fill="none" stroke="${d.acc || '#C98A3D'}" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M50 92Q50 34 100 30Q150 34 150 92Z" fill="#fff" fill-opacity=".3" ${st()}/>` +
      `<rect x="46" y="88" width="108" height="10" rx="5" fill="#fff" ${st()}/>`;
  },
  shake(d, id) {
    const P = 'M56 72Q62 150 78 192H122Q138 150 144 72Z', sp = ['#E5533D', BLUE, '#F2C94C', '#4CAF6A'];
    return SHADOW + straw(118, 120, 142, 8, '#E5533D') +
      `<path d="M88 190H112V206H88Z" fill="#fff" ${st()}/><ellipse cx="100" cy="212" rx="38" ry="8" fill="#fff" ${st()}/>` +
      glass(id, P) + layer(id, `<rect x="40" y="84" width="120" height="120" fill="${d.col}"/>` + shine(68, 90, 82, 182)) + outline(P) +
      `<path d="M54 76C46 58 66 46 78 54C80 34 104 28 110 44C120 30 146 40 138 58C152 60 152 76 146 76Z" fill="${CREAM}" ${st(3.5)}/>` +
      [[74, 62, 20], [92, 48, -30], [116, 52, 40], [130, 64, -10], [100, 66, 70]].map((p, k) =>
        `<rect x="${p[0]}" y="${p[1]}" width="9" height="3.5" rx="1.75" transform="rotate(${p[2]} ${p[0] + 4.5} ${p[1] + 1.75})" fill="${sp[k % 4]}"/>`).join('') +
      `<path d="M104 28Q106 16 116 10" fill="none" ${st(3)}/><circle cx="102" cy="34" r="10" fill="#E5533D" ${st(3.5)}/>`;
  },
  smooth(d, id) {
    const P = 'M54 66H146L136 214H64Z';
    return SHADOW + straw(98, 140, 112, 10, BLUE, 12) + glass(id, P) + layer(id,
      `<rect x="40" y="78" width="120" height="140" fill="${d.col}"/>` +
      [[72, 100], [118, 120], [90, 150], [124, 176], [78, 190], [104, 96]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${mix(d.col, '#ffffff', .4)}"/>`).join('') +
      shine(66, 82, 74, 204)) + outline(P) +
      `<path d="M118 66A22 22 0 0 1 162 66Z" fill="${mix(d.col, '#E5533D', .15)}" ${st(3.5)}/><path d="M126 66A14 14 0 0 1 154 66Z" fill="${mix(d.col, '#ffffff', .5)}"/>`;
  },
  juice(d, id) {
    const P = 'M60 68H140L133 214H67Z';
    return SHADOW + straw(84, 130, 70, 12, '#E5533D') + glass(id, P) + layer(id,
      `<rect x="40" y="86" width="120" height="140" fill="${d.col}"/>` +
      (d.g === 'lem' ? ice(74, 94, -10) + ice(104, 106, 16) : '') + shine(70, 84, 77, 204)) +
      outline(P) + wheel(138, 70, 20, mix(d.col, '#ffffff', .1));
  },
  mojito(d, id) {
    const P = 'M58 62H142L136 214H64Z';
    return SHADOW + straw(112, 130, 130, 8) + glass(id, P) + layer(id,
      `<rect x="40" y="76" width="120" height="150" fill="${d.col}" fill-opacity=".88"/>` +
      leaf(70, 170, -20) + leaf(100, 196, 15) + leaf(108, 150, -40) + ice(66, 84, -14) + ice(104, 96, 12) +
      [[84, 130, 4], [120, 178, 3], [76, 200, 3.5], [126, 122, 2.5], [94, 166, 2.5]].map(b => `<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="none" stroke="#fff" stroke-width="2"/>`).join('') +
      shine(68, 80, 75, 204)) + outline(P) + leaf(70, 62, -60) + leaf(78, 60, -110) + wheel(144, 64, 16, '#9BD35A');
  },
  cloudy(d, id) {
    const P = 'M58 64H142L136 214H64Z';
    return SHADOW + straw(114, 130, 132, 8) +
      `<defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="${mix(d.col, '#ffffff', .55)}"/><stop offset="1" stop-color="${d.col}"/></linearGradient></defs>` +
      clip(id, P) + `<path d="${P}" fill="url(#${id}g)"/>` + layer(id, shine(68, 84, 75, 204)) + outline(P) +
      `<path d="M62 70C52 56 70 44 82 52C86 36 110 34 116 48C126 38 146 46 140 60C150 62 148 76 138 76H68C60 76 56 72 62 70Z" fill="#fff" ${st(3.5)}/>`;
  },
  can(d) {
    const C = '<rect x="66" y="44" width="68" height="168" rx="12"';
    return SHADOW + `${C} fill="${d.col}"/>` +
      `<path d="M66 112L134 92V124L66 144Z" fill="#fff" opacity=".9"/>` +
      `<path d="M106 86L86 128H100L92 164L118 116H104L112 86Z" fill="#F2C94C" ${st(3.5)}/>` +
      `<rect x="76" y="58" width="8" height="140" rx="4" fill="#fff" opacity=".3"/>` + `${C} fill="none" ${st()}/>` +
      `<rect x="70" y="36" width="60" height="12" rx="5" fill="#D7DEE8" ${st()}/><rect x="70" y="206" width="60" height="10" rx="5" fill="#D7DEE8" ${st()}/>`;
  },
  cone(d, id) {
    const C = 'M70 124L130 124L100 214Z';
    const top = d.k === 'boba'
      ? [[88, 70], [104, 76], [96, 92], [116, 96], [80, 100], [110, 112]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#3B2416" ${st(2)}/>`).join('')
      : d.k === 'chunk'
        ? [[86, 72, 10], [108, 80, -15], [94, 98, 25], [118, 104, 5]].map(p => `<rect x="${p[0]}" y="${p[1]}" width="12" height="10" rx="2" transform="rotate(${p[2]} ${p[0] + 6} ${p[1] + 5})" fill="#3B2416" ${st(2)}/>`).join('')
        : '';
    return SHADOW + clip(id, C) + `<path d="${C}" fill="#E3A857"/>` +
      layer(id, `<path d="M60 140L120 200M60 164L100 204M80 124L132 176M100 124L136 160M140 140L80 200M140 164L100 204M120 124L68 176M100 124L64 160" stroke="#B9772F" stroke-width="3"/>`) + outline(C) +
      `<path d="M62 128C56 110 78 102 100 104C122 102 144 110 138 128Z" fill="${d.col}" ${st()}/>` +
      `<path d="M72 108C70 92 86 84 100 86C114 84 130 92 128 108Z" fill="${d.col}" ${st()}/>` +
      `<path d="M84 90C84 78 94 72 100 58C106 72 116 78 116 90Z" fill="${d.col}" ${st()}/>` + top;
  },
  mug(d) {
    const B = 'M50 94H146V180Q146 208 118 208H78Q50 208 50 180Z';
    const top = d.fk === 'mar'
      ? [[78, 86], [96, 82], [112, 88]].map(p => `<rect x="${p[0]}" y="${p[1]}" width="15" height="12" rx="4" fill="#fff" ${st(2.5)}/>`).join('')
      : d.acc ? `<path d="M70 96Q84 90 98 96T126 96" fill="none" stroke="${d.acc}" stroke-width="3.5" stroke-linecap="round"/>`
      : d.tags.includes('milky') ? heart(98, 95, .62, mix(d.col, '#ffffff', .7)) : '';
    return SHADOW + steam(80, 74) + handle('M146 114Q180 114 180 144Q180 174 146 174', 16) +
      `<path d="${B}" fill="#fff"/><rect x="50" y="150" width="96" height="18" fill="${BLUE}"/>` + heart(98, 157, .62, '#fff') +
      outline(B) + `<ellipse cx="98" cy="96" rx="46" ry="10" fill="${d.col}" ${st(4)}/>` + top;
  },
  small(d, id) {
    const P = 'M62 126H138Q136 186 100 188Q64 186 62 126Z';
    const g = SHADOW + `<ellipse cx="100" cy="196" rx="64" ry="12" fill="#fff" ${st()}/>` +
      handle('M134 138Q160 138 158 156Q156 174 130 172', 12) +
      clip(id, P) + `<path d="${P}" fill="#fff"/>` + layer(id, `<rect x="50" y="146" width="100" height="10" fill="${BLUE}"/>`) + outline(P) +
      `<ellipse cx="100" cy="127" rx="37" ry="8" fill="${d.col}" ${st(3.5)}/>` +
      (d.tags.includes('milky') ? heart(100, 126, .5, mix(d.col, '#ffffff', .7)) : `<ellipse cx="100" cy="127" rx="26" ry="5" fill="${mix(d.col, '#D9A066', .45)}"/>`) +
      steam(84, 110);
    return d.g === 'shot' ? `<g transform="translate(100 200) scale(.84) translate(-100 -200)">${g}</g>` : g;
  },
  turk(d, id) {
    const P = 'M68 112H132L127 184Q100 194 73 184Z';
    return SHADOW + `<ellipse cx="100" cy="198" rx="60" ry="11" fill="#fff" ${st()}/>` +
      handle('M130 124Q148 124 147 138Q146 152 128 150', 10) +
      clip(id, P) + `<path d="${P}" fill="#fff"/>` + layer(id,
        `<rect x="60" y="126" width="80" height="11" fill="${BLUE}"/>` +
        [76, 88, 100, 112, 124].map(x => `<circle cx="${x}" cy="131.5" r="2.6" fill="#F2C94C"/>`).join('') +
        `<path d="M60 172Q100 166 140 172" stroke="${BLUE}" stroke-width="3" fill="none"/>`) + outline(P) +
      `<ellipse cx="100" cy="113" rx="32" ry="6.5" fill="${mix(d.col, '#E8C9A0', .55)}" ${st(3.5)}/>` +
      [[90, 112], [104, 114], [112, 111], [96, 115]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.8" fill="${mix(d.col, '#ffffff', .8)}"/>`).join('') +
      steam(84, 94);
  },
  tea(d, id) {
    const P = 'M70 96H130L122 206H78Z';
    return SHADOW + steam(82, 76) + glass(id, P) + layer(id,
      `<rect x="60" y="110" width="80" height="100" fill="${d.col}" fill-opacity=".92"/>` + shine(78, 102, 84, 198)) + outline(P) +
      `<path d="M116 98Q138 100 140 128" fill="none" stroke="${INK}" stroke-width="2.5"/>` +
      `<rect x="131" y="126" width="18" height="20" rx="3" fill="${BLUE}" ${st(3)}/>` + heart(140, 136, .5, '#fff');
  },
  v60(d, id) {
    const P = 'M62 140H138L134 196Q132 212 100 212Q68 212 66 196Z';
    return SHADOW + handle('M136 152Q156 154 154 172Q152 190 134 190', 10) + glass(id, P) +
      layer(id, `<rect x="50" y="176" width="100" height="40" fill="${d.col}"/>`) + outline(P) +
      handle('M144 82Q160 84 158 98Q156 110 138 110', 10) +
      `<path d="M56 74H144L122 128H78Z" fill="#fff" ${st()}/><ellipse cx="100" cy="80" rx="40" ry="5" fill="${mix(d.col, '#8A5A3B', .4)}"/>` +
      `<path d="M86 90L93 120M100 90V122M114 90L107 120" stroke="#C9DBF2" stroke-width="3" stroke-linecap="round"/>` +
      `<rect x="70" y="126" width="60" height="10" rx="4" fill="#fff" ${st()}/>`;
  },
  bottle(d) {
    const P = 'M84 42H116V62Q138 74 138 100V198Q138 212 124 212H76Q62 212 62 198V100Q62 74 84 62Z';
    return SHADOW + `<path d="${P}" fill="${d.col}" fill-opacity=".6" ${st()}/>` +
      `<path d="M70 104V196" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/>` +
      `<rect x="62" y="124" width="76" height="42" fill="#fff" ${st()}/>` + heart(100, 145, .9, BLUE) +
      `<path d="M66 184H134M66 192H134" stroke="#fff" stroke-width="3" opacity=".8"/>` +
      `<rect x="82" y="26" width="36" height="18" rx="4" fill="${BLUE}" ${st()}/>`;
  }
};
let UID = 0;
function cupSVG(d, standalone) {
  const id = 'cup' + (++UID), draw = CUPS[d.cup] || CUPS.iced;
  return `<svg ${standalone ? 'xmlns="http://www.w3.org/2000/svg" width="800" height="960" ' : ''}viewBox="0 0 200 240" aria-hidden="true">${draw(d, id)}</svg>`;
}
const MASCOT = '<svg viewBox="0 0 150 140" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 118c-10-14-12-34-6-52 7-22 30-34 50-28 12 4 20 12 23 22"/><path d="M22 118c8 6 22 8 36 6"/><path d="M34 62q5-6 10 0M54 58q5-6 10 0"/><path d="M36 74l4 3M42 73l3 3M58 70l4 3M64 69l3 3" stroke-width="3"/><path d="M48 82q5 4 10 0" stroke-width="3.5"/><rect x="82" y="36" width="50" height="12" rx="5"/><path d="M85 48l6 74h32l6-74"/><path d="M88 66h38l-2 22H90z" fill="currentColor" opacity=".35"/><path d="M38 96q22 8 50-4"/><path d="M44 106q20 6 42-2"/><path d="M28 124l-4 10M46 126l2 9"/><path d="M10 30c0-5 7-6 8 0 1-6 8-5 8 0 0 5-8 9-8 9s-8-4-8-9z" fill="currentColor" stroke-width="2"/></svg>';

/* ---------- elements ---------- */
const deck = $('#deck'), landing = $('#landing'), game = $('#game'), files = $('#files');
const ovMatch = $('#match'), ovCash = $('#cashier'), ovPicky = $('#picky');
const bUndo = $('#bUndo'), bNope = $('#bNope'), bSup = $('#bSup'), bLike = $('#bLike'), bLang = $('#bLang'), bRestart = $('#bRestart');
const mFill = $('#mFill'), mEmoji = $('#mEmoji');

/* ---------- photos (images/slug.webp, falls back to the drawing) ---------- */
const PH = {};
function addPhoto(box, d) {
  if (PH[d.slug] === 'no') return;
  const im = new Image();
  im.className = 'photo'; im.alt = ''; im.decoding = 'async';
  im.onload = () => { PH[d.slug] = 'ok'; im.classList.add('ok'); };
  im.onerror = () => { PH[d.slug] = 'no'; im.remove(); };
  im.src = 'images/' + d.slug + '.webp';
  box.append(im);
}

/* ---------- matching ---------- */
const score = d => d.tags.reduce((s, x) => s + (S.W[x] || 0), 0) / Math.sqrt(d.tags.length);
const chem = () => Math.min(1, S.L * 0.28 + S.N * 0.05);
const free = () => D.filter(d => !S.seen.has(d.i) && !S.matched.has(d.i));
const bestLiked = () => S.likes.slice().reverse().reduce((b, i) => (b < 0 || score(D[i]) > score(D[b]) ? i : b), -1);

function pick() {
  const pool = free();
  if (!pool.length) return -1;
  if (S.total < 4) {
    const st0 = START.filter(i => !S.seen.has(i) && !S.matched.has(i));
    if (st0.length) {
      const seenTags = new Set(D.filter(d => S.seen.has(d.i)).flatMap(d => d.tags));
      let best = -1, low = Infinity;
      st0.sort(() => Math.random() - .5).forEach(i => {
        const ov = D[i].tags.filter(x => seenTags.has(x)).length / D[i].tags.length;
        if (ov < low) { low = ov; best = i; }
      });
      return best;
    }
  }
  if (Math.random() < .15) return pool[rnd(pool.length)].i;
  const last = S.cur != null ? D[S.cur].g : null;
  const top = pool.map(d => [score(d) + Math.random() * .4, d]).sort((a, b) => b[0] - a[0]).slice(0, 5).map(x => x[1]);
  return (top.find(d => d.g !== last) || top[0]).i;
}

function meter(full) {
  const c = full ? 1 : chem();
  mFill.style.width = Math.round(c * 100) + '%';
  mEmoji.textContent = ['🧊', '🙂', '😊', '😍', '💘'][Math.min(4, Math.floor(c * 4))];
}

/* ---------- card ---------- */
function chips(d) {
  const C = CHIPS[S.lang], has = x => d.tags.includes(x);
  const out = [has('hot') ? C.hot : C.cold, ['coffee', 'matcha', 'tea', 'energy'].some(has) ? C.caf : C.nocof];
  const taste = TASTE.find(has);
  if (taste) out.push(C[taste]);
  return out;
}
function renderCard(i) {
  deck.querySelectorAll('.card').forEach(c => c.remove());
  S.cur = i;
  const d = D[i], ar = isAr();
  const c = el('article', 'card enter');
  c.setAttribute('aria-label', d.name);
  const art = el('div', 'art');
  art.style.background = mix(d.col, '#ffffff', .8);
  art.innerHTML = cupSVG(d);
  addPhoto(art, d);
  art.append(el('span', 'cat', d.cat[ar ? 1 : 0]), el('span', 'price', priceTxt(d.p)));
  const info = el('div', 'info');
  info.append(el('h2', 'name', d.name), el('p', 'bio', d.bio[ar ? 1 : 0]));
  const ch = el('div', 'chips');
  chips(d).forEach(x => ch.append(el('span', null, x)));
  const fl = el('ul', 'flags'), g = el('li', 'g'), r = el('li', 'r');
  g.append(el('b', null, t('green')), el('span', null, d.f[ar ? 1 : 0]));
  r.append(el('b', null, t('red')), el('span', null, d.f[ar ? 3 : 2]));
  fl.append(g, r);
  info.append(ch, fl);
  c.append(art, info, el('div', 'stamp like', t('like')), el('div', 'stamp nope', t('nope')), el('div', 'stamp sup', t('sup')));
  deck.append(c);
  bindDrag(c);
  bUndo.disabled = !S.hist.length;
}
function nextCard() {
  const i = pick();
  if (i < 0) { if (S.likes.length) matchWith(bestLiked()); else showPicky(); return; }
  renderCard(i);
}

/* ---------- swipe ---------- */
let busy = false, gen = 0;
function stamps(c, dx, dy) {
  const q = k => c.querySelector('.stamp.' + k);
  q('like').style.opacity = clamp(dx / 100);
  q('nope').style.opacity = clamp(-dx / 100);
  q('sup').style.opacity = Math.abs(dx) < 70 ? clamp(-dy / 110) : 0;
}
function bindDrag(c) {
  let s = null;
  const reset = () => { c.style.transition = 'transform .3s cubic-bezier(.2,.9,.3,1.25)'; c.style.transform = ''; stamps(c, 0, 0); };
  c.addEventListener('pointerdown', e => {
    if (busy || (e.pointerType === 'mouse' && e.button !== 0)) return;
    s = {x: e.clientX, y: e.clientY, t: performance.now(), dx: 0, dy: 0, id: e.pointerId};
    try { c.setPointerCapture(e.pointerId); } catch (_) {}
    c.classList.remove('enter');
    c.style.transition = 'none';
  });
  c.addEventListener('pointermove', e => {
    if (!s || e.pointerId !== s.id) return;
    s.dx = e.clientX - s.x; s.dy = e.clientY - s.y;
    c.style.transform = `translate(${s.dx}px,${s.dy}px) rotate(${s.dx / 16}deg)`;
    stamps(c, s.dx, s.dy);
  });
  c.addEventListener('pointerup', e => {
    if (!s || e.pointerId !== s.id) return;
    const {dx, dy} = s, quick = performance.now() - s.t < 260, h = Math.abs(dx) > Math.abs(dy);
    s = null;
    if (dx > 110 || (quick && h && dx > 45)) fly(c, 'like', dy);
    else if (dx < -110 || (quick && h && dx < -45)) fly(c, 'nope', dy);
    else if (dy < -120 || (quick && !h && dy < -45)) fly(c, 'super', dy, dx);
    else reset();
  });
  c.addEventListener('pointercancel', () => { if (s) { s = null; reset(); } });
}
function fly(c, a, dy = 0, dx = 0) {
  if (busy) return;
  busy = true;
  const g0 = gen;
  c.classList.remove('enter');
  stamps(c, a === 'like' ? 200 : a === 'nope' ? -200 : 0, a === 'super' ? -200 : 0);
  const W = innerWidth * 1.4, H = innerHeight * 1.2;
  c.style.transition = 'transform .34s ease-in';
  void c.offsetWidth;
  c.style.transform = a === 'like' ? `translate(${W}px,${dy - 40}px) rotate(30deg)`
    : a === 'nope' ? `translate(${-W}px,${dy - 40}px) rotate(-30deg)`
    : `translate(${dx}px,${-H}px) rotate(${dx / 16}deg)`;
  setTimeout(() => { c.remove(); busy = false; if (g0 === gen) swipe(a); }, 320);
}
function act(a) { const c = deck.querySelector('.card'); if (c && !busy) fly(c, a); }

function swipe(a) {
  const d = D[S.cur];
  S.hist.push({i: d.i, W: {...S.W}, likes: [...S.likes], L: S.L, N: S.N, sw: S.sw});
  S.seen.add(d.i); S.sw++; S.total++;
  const w = a === 'super' ? 2 : a === 'like' ? 1 : -0.7;
  d.tags.forEach(x => { S.W[x] = (S.W[x] || 0) + w; });
  if (a === 'nope') S.N++; else { S.L++; S.likes.push(d.i); }
  meter();
  if (a === 'super') return matchWith(d.i);
  if (a === 'like' && chem() >= 1) return matchWith(bestLiked());
  if (S.sw >= MAX_SW) { if (S.likes.length) matchWith(bestLiked()); else showPicky(); return; }
  nextCard();
}
function undo() {
  if (busy || !S.hist.length) return;
  const h = S.hist.pop();
  S.seen.delete(h.i);
  Object.assign(S, {W: h.W, likes: h.likes, L: h.L, N: h.N, sw: h.sw});
  S.total--;
  meter();
  renderCard(h.i);
}
function restart() {
  gen++; busy = false;
  Object.assign(S, {cur: null, shown: null, seen: new Set(), matched: new Set(), W: {}, likes: [], L: 0, N: 0, sw: 0, total: 0, hist: []});
  ovMatch.hidden = ovCash.hidden = ovPicky.hidden = true;
  deck.querySelectorAll('.card').forEach(c => c.remove());
  meter();
  nextCard();
}

/* ---------- match ---------- */
function orderBlock(d) {
  const ar = isAr(), out = [el('div', 'oname', d.name), el('div', 'ocat', d.cat[ar ? 1 : 0])];
  const sz = el('div', 'osz');
  sizes(d.p).forEach(([v, s]) => {
    const b = el('span', 'sz');
    if (s) b.append(el('i', null, t(s)), ' ');
    b.append(String(v));
    sz.append(b);
  });
  sz.append(el('span', 'cur', t('curLong')));
  out.push(sz);
  const ex = EXTRAS[d.x];
  if (ex) {
    const ul = el('ul', 'oad');
    ex.forEach(e => {
      const li = el('li'), pr = el('b', null, '+' + e[2]);
      pr.dir = 'ltr';
      li.append(el('span', null, ar ? e[1] : e[0]), pr);
      ul.append(li);
    });
    out.push(el('h4', null, t('addons')), ul);
  }
  return out;
}
function hearts() {
  const box = $('#hearts');
  box.replaceChildren();
  for (let k = 0; k < 14; k++) {
    const h = el('span', null, k % 3 ? '💙' : '🤍');
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDelay = Math.random() * 3.6 + 's';
    h.style.fontSize = 16 + Math.random() * 20 + 'px';
    box.append(h);
  }
}
function matchWith(i) {
  if (i < 0) return showPicky();
  S.matched.add(i);
  S.shown = i;
  meter(true);
  const d = D[i];
  $('#mSub').textContent = t('mSub').replace('{d}', d.name);
  const av = $('#avDrink');
  av.innerHTML = cupSVG(d);
  addPhoto(av, d);
  $('#mCard').replaceChildren(...orderBlock(d));
  const recs = free().map(x => [score(x) + Math.random() * .1, x]).sort((a, b) => b[0] - a[0]).slice(0, 3).map(x => x[1]);
  $('#aList').replaceChildren(...recs.map(x => {
    const b = el('button');
    b.append(x.name, el('span', null, priceTxt(x.p)));
    b.onclick = () => matchWith(x.i);
    return b;
  }));
  hearts();
  ovMatch.hidden = false;
  ovMatch.scrollTop = 0;
  prepShare(d);
}
function showPicky() { $('#pSub').textContent = t('pSub'); ovPicky.hidden = false; }
function keepSwiping() {
  ovMatch.hidden = true;
  $('#hearts').replaceChildren();
  Object.assign(S, {likes: [], L: 0, N: 0, sw: 0, hist: []});
  meter();
  nextCard();
}

/* ---------- story image ---------- */
const svgURL = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
function rr(x, X, Y, w, h, r) {
  x.beginPath(); x.moveTo(X + r, Y);
  x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
  x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath();
}
function wrap(x, text, cx, y, maxW, lh, maxL) {
  const words = String(text).split(' ');
  let line = '', n = 1;
  for (let k = 0; k < words.length; k++) {
    const test = line ? line + ' ' + words[k] : words[k];
    if (line && x.measureText(test).width > maxW) {
      if (n === maxL) {
        let s = line + '…';
        while (s.length > 2 && x.measureText(s).width > maxW) s = s.slice(0, -2) + '…';
        x.fillText(s, cx, y);
        return y;
      }
      x.fillText(line, cx, y); y += lh; n++; line = words[k];
    } else line = test;
  }
  x.fillText(line, cx, y);
  return y;
}
async function storyBlob(d, withArt) {
  const ar = isAr(), F = '"Baloo Bhaijaan 2",system-ui,sans-serif', W = 1080, H = 1920, bio = d.bio[ar ? 1 : 0];
  const sample = ['OVO', t('mTitle'), d.name, bio, t('storyBottom'), t('storyLoc')].join(' ');
  try { await Promise.all(['600', '700', '800'].map(w => document.fonts.load(`${w} 40px "Baloo Bhaijaan 2"`, sample))); } catch (e) {}
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');
  try { x.direction = ar ? 'rtl' : 'ltr'; } catch (e) {}
  x.fillStyle = '#1F6FCC'; x.fillRect(0, 0, W, H);
  x.fillStyle = 'rgba(255,255,255,.08)';
  [[930, 170, 300, 120, -.25], [140, 1830, 320, 130, .15], [80, 620, 160, 70, .4]].forEach(b => { x.beginPath(); x.ellipse(b[0], b[1], b[2], b[3], b[4], 0, Math.PI * 2); x.fill(); });
  x.textAlign = 'center';
  x.fillStyle = '#fff';
  x.font = `800 170px ${F}`; x.fillText('OVO', W / 2, 250);
  x.font = `600 34px ${F}`; x.globalAlpha = .85; x.fillText('SPECIALTY COFFEE & MILKSHAKES', W / 2, 305); x.globalAlpha = 1;
  x.font = `800 92px ${F}`; x.fillText(t('mTitle'), W / 2, 440);
  rr(x, 90, 500, 900, 1110, 72); x.fill();
  x.fillStyle = mix(d.col, '#ffffff', .8); rr(x, 130, 540, 820, 560, 52); x.fill();
  if (withArt) {
    const photo = PH[d.slug] === 'ok';
    const im = await loadImg(photo ? 'images/' + d.slug + '.webp' : svgURL(cupSVG(d, true)));
    if (im) {
      const iw = im.naturalWidth || 800, ih = im.naturalHeight || 960;
      const s = photo ? Math.max(820 / iw, 560 / ih) : Math.min(820 / iw, 560 / ih) * .92, w = iw * s, h = ih * s;
      x.save(); rr(x, 130, 540, 820, 560, 52); x.clip();
      x.drawImage(im, 130 + (820 - w) / 2, 540 + (560 - h) / 2, w, h);
      x.restore();
    }
    const m = await loadImg(svgURL(MASCOT.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="280" style="color:#ffffff" ')));
    if (m) x.drawImage(m, 70, 80, 180, 168);
  }
  x.fillStyle = '#12305C'; x.font = `800 80px ${F}`;
  let y = wrap(x, d.name, W / 2, 1200, 800, 88, 2);
  y += 84;
  x.fillStyle = '#1F6FCC'; x.font = `800 60px ${F}`; x.fillText(priceTxt(d.p), W / 2, y);
  x.fillStyle = '#5D7396'; x.font = `600 46px ${F}`; wrap(x, bio, W / 2, y + 76, 780, 60, 3);
  x.fillStyle = '#fff'; x.font = `800 56px ${F}`; x.fillText(t('storyBottom'), W / 2, 1730);
  x.font = `600 38px ${F}`; x.globalAlpha = .9; x.fillText('Ovo.coffee.eg · ' + t('storyLoc'), W / 2, 1800); x.globalAlpha = 1;
  return new Promise((res, rej) => {
    try { c.toBlob(b => (b ? res(b) : rej(new Error('blob'))), 'image/png'); } catch (e) { rej(e); }
  });
}
let shareP = null, shareFile = null, shareTok = 0;
function prepShare(d) {
  const tok = ++shareTok;
  shareFile = null;
  shareP = storyBlob(d, true).catch(() => storyBlob(d, false))
    .then(b => {
      const f = new File([b], `ovo-match-${d.slug}.png`, {type: 'image/png'});
      if (tok === shareTok) shareFile = f;
      return f;
    })
    .catch(() => null);
}
function toast(msg) {
  const n = el('div', null, msg);
  Object.assign(n.style, {position: 'fixed', left: '50%', bottom: '26px', transform: 'translateX(-50%)', zIndex: 99, background: '#12305C', color: '#fff', padding: '10px 18px', borderRadius: '999px', fontWeight: 700, boxShadow: '0 6px 0 rgba(0,0,0,.15)', whiteSpace: 'nowrap'});
  document.body.append(n);
  setTimeout(() => n.remove(), 2200);
}
async function doShare() {
  const d = D[S.shown];
  const f = shareFile || await shareP;
  if (!f) return toast(t('shareFail'));
  if (navigator.canShare && navigator.canShare({files: [f]})) {
    try { await navigator.share({files: [f], text: t('shareText').replace('{d}', d.name)}); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  const a = el('a');
  a.href = URL.createObjectURL(f);
  a.download = f.name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  toast(t('saved'));
}

/* ---------- language & screens ---------- */
function setLang(l, save) {
  S.lang = l;
  const h = document.documentElement;
  h.lang = l; h.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(n => { n.textContent = t(n.dataset.t); });
  bLang.textContent = l === 'ar' ? 'EN' : 'ع';
  [[bLang, 'lang'], [bRestart, 'restart'], [bUndo, 'undo'], [bNope, 'nope'], [bSup, 'sup'], [bLike, 'like']]
    .forEach(([b, k]) => b.setAttribute('aria-label', t(k)));
  if (save) store.set('ovoLang', l);
  if (!busy && !game.hidden && S.cur != null && deck.querySelector('.card')) renderCard(S.cur);
}
function startGame() {
  landing.hidden = true; files.hidden = true; game.hidden = false;
  meter();
  if (!deck.querySelector('.card')) nextCard();
}
function showFiles() {
  landing.hidden = true; game.hidden = true; files.hidden = false;
  $('#fCount').textContent = D.length;
  $('#fList').textContent = D.map(d => `${d.slug}.webp   ← ${d.name}`).join('\n');
}
function route() {
  if (location.hash === '#files') return showFiles();
  files.hidden = true;
  const q = new URLSearchParams(location.search).get('lang'), saved = q || store.get('ovoLang');
  if (saved === 'ar' || saved === 'en') { setLang(saved, !!q); startGame(); }
  else { landing.hidden = false; game.hidden = true; }
}

/* ---------- wiring ---------- */
$('#heroMascot').innerHTML = MASCOT;
$('#avMe').innerHTML = MASCOT;
document.querySelectorAll('.langs button').forEach(b => { b.onclick = () => { setLang(b.dataset.lang, true); startGame(); }; });
bLang.onclick = () => setLang(isAr() ? 'en' : 'ar', true);
bRestart.onclick = restart;
bUndo.onclick = undo;
bNope.onclick = () => act('nope');
bSup.onclick = () => act('super');
bLike.onclick = () => act('like');
$('#bKeep').onclick = keepSwiping;
$('#bShare').onclick = doShare;
$('#bCash').onclick = () => { $('#cBody').replaceChildren(...orderBlock(D[S.shown])); ovCash.hidden = false; };
$('#bBack').onclick = () => { ovCash.hidden = true; };
$('#bSetup').onclick = () => {
  ovPicky.hidden = true;
  const pool = free();
  matchWith(pool.length ? pool.map(d => [score(d) + Math.random() * .5, d.i]).sort((a, b) => b[0] - a[0])[0][1] : rnd(D.length));
};
$('#bAgain').onclick = () => { ovPicky.hidden = true; restart(); };
document.addEventListener('keydown', e => {
  if (game.hidden || !ovMatch.hidden || !ovCash.hidden || !ovPicky.hidden) return;
  if (e.key === 'ArrowRight') act('like');
  else if (e.key === 'ArrowLeft') act('nope');
  else if (e.key === 'ArrowUp') { e.preventDefault(); act('super'); }
  else if (e.key === 'Backspace' || e.key.toLowerCase() === 'z') undo();
});
window.addEventListener('hashchange', route);
route();
})();