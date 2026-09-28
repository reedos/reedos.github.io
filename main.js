/* Shared source-based layer previews: synchronized information and stack artwork. */
(() => {
  document.querySelectorAll('[data-layer-demo]').forEach(demo => {
    const svg = demo.querySelector('.layer-preview');
    const button = demo.querySelector('.stack-motion-toggle');
    const layers = [...svg.querySelectorAll('.slab')];
    const number = demo.querySelector('[data-active-number]');
    const name = demo.querySelector('[data-active-name]');

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const ascending = layers.map((_, i) => i);
    const sequence = [...ascending, ...ascending.slice(1, -1).reverse()];
    let step = 0, visible = false, paused = false, motionOptIn = false, timer;
    const paint = () => {
      const active = layers[sequence[step]];
      layers.forEach(layer => layer.classList.toggle('is-demo-active', layer === active));
      number.textContent = `${svg.dataset.layerKind === 'gradient' ? 'LEVEL' : 'LAYER'} ${active.dataset.layerNumber}`;
      name.textContent = active.dataset.layerName;

      number.style.color = active.style.color;
    };
    const sync = () => {
      clearInterval(timer);
      const allowed = !reduced.matches || motionOptIn;
      button.textContent = paused || !allowed ? 'Play animation' : 'Pause animation';
      button.setAttribute('aria-pressed', String(!paused && allowed));
      if (visible && !paused && allowed && !document.hidden) {
        timer = setInterval(() => { step = (step + 1) % sequence.length; paint(); }, 800);
      }
    };
    button.hidden = false;
    button.addEventListener('click', () => {
      if (reduced.matches && !motionOptIn) { motionOptIn = true; paused = false; }
      else paused = !paused;
      sync();
    });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { motionOptIn = false; sync(); });
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .2 }).observe(svg);
    paint(); sync();
  });
})();

/* Appearance and the small-screen menu. All content and links work without JavaScript. */
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  const label = button.querySelector('.theme-label');
  const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const choices = ['system', 'dark', 'light'];
  let preference = choices.includes(root.dataset.preference) ? root.dataset.preference : 'system';

  function applyTheme() {
    const theme = preference === 'system' ? (deviceTheme.matches ? 'dark' : 'light') : preference;
    root.dataset.preference = preference;
    root.dataset.theme = theme;
    const next = choices[(choices.indexOf(preference) + 1) % choices.length];
    const currentName = preference === 'system' ? `automatic (${theme})` : preference;
    label.textContent = preference === 'system' ? 'Auto' : preference === 'dark' ? 'Dark' : 'Light';
    button.setAttribute('aria-label', `Appearance: ${currentName}. Switch to ${next === 'system' ? 'automatic' : next}.`);
    button.title = 'Appearance: Auto, Dark, Light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#000000' : '#f1f2ed';
    document.querySelectorAll('[data-layout-link]').forEach((link) => {
      const url = new URL(location.href);
      url.searchParams.set('layout', link.dataset.layoutLink);
      url.searchParams.set('theme', preference);
      url.hash = '';
      link.href = url.href;
    });
  }

  applyTheme();
  button.hidden = false;
  button.addEventListener('click', () => {
    preference = choices[(choices.indexOf(preference) + 1) % choices.length];
    try { localStorage.setItem('reed-hub-theme', preference); } catch {}
    applyTheme();
    // Keep an explicitly shared theme link in sync with the visible choice.
    if (new URLSearchParams(location.search).has('theme')) {
      try {
        const url = new URL(location.href);
        url.searchParams.set('theme', preference);
        history.replaceState(null, '', url);
      } catch {}
    }
  });
  deviceTheme.addEventListener('change', () => {
    if (preference === 'system') applyTheme();
  });
})();

(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!toggle || !navigation) return;

  const label = toggle.querySelector('.menu-label');
  const smallScreen = window.matchMedia('(max-width: 800px)');

  function setOpen(open, restoreFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    label.textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) toggle.focus();
  }

  toggle.hidden = false;
  document.documentElement.classList.add('menu-ready');

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open && smallScreen.matches) {
      const first = navigation.querySelector('a');
      if (first) first.focus();
    }
  });

  // The links come before the toggle in the page, so a plain Tab would leave the header and the
  // focusin handler below would close the menu. While it is open, Tab cycles links and toggle.
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || toggle.getAttribute('aria-expanded') !== 'true' || !smallScreen.matches) return;
    const stops = [...navigation.querySelectorAll('a'), toggle];
    const at = stops.indexOf(document.activeElement);
    const next = at === -1 ? 0 : (at + (event.shiftKey ? -1 : 1) + stops.length) % stops.length;
    event.preventDefault();
    stops[next].focus();
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setOpen(false);
    if (smallScreen.matches && link.hash && link.origin === location.origin) {
      const destination = document.getElementById(link.hash.slice(1));
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
        destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) setOpen(false);
  });

  document.addEventListener('focusin', (event) => {
    if (!event.target.closest('.site-header')) setOpen(false);
  });

  smallScreen.addEventListener('change', () => setOpen(false));
})();

/* The alternative gallery uses native scrolling; it never advances automatically. */
(() => {
  const root = document.documentElement;
  const layout = root.dataset.layout || 'chapters';
  document.querySelectorAll('[data-layout-link]').forEach((link) => {
    const url = new URL(location.href);
    url.searchParams.set('layout', link.dataset.layoutLink);
    url.searchParams.set('theme', root.dataset.preference || 'dark');
    url.hash = '';
    link.href = url.href;
    if (link.dataset.layoutLink === layout) link.setAttribute('aria-current', 'true');
  });
  if (layout !== 'gallery') return;
  const track = document.querySelector('.projects-track');
  if (!track) return;
  const cards = [...track.querySelectorAll('.project')];
  const choices = [...document.querySelectorAll('[data-project-choice]')];
  const controls = document.querySelector('.gallery-controls');
  const previous = controls.querySelector('[data-gallery-prev]');
  const next = controls.querySelector('[data-gallery-next]');
  const position = controls.querySelector('.gallery-position');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let queued = false;

  function update() {
    queued = false;
    const left = track.getBoundingClientRect().left;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const delta = Math.abs(card.getBoundingClientRect().left - left);
      if (delta < distance) { distance = delta; current = index; }
    });
    choices.forEach((choice, index) => {
      if (index === current) choice.setAttribute('aria-current', 'true');
      else choice.removeAttribute('aria-current');
    });
    previous.disabled = current === 0;
    next.disabled = current === cards.length - 1;
    position.textContent = `${current + 1} / ${cards.length}`;
  }
  function select(index) {
    const chosen = Math.max(0, Math.min(cards.length - 1, index));
    const left = cards[chosen].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }
  choices.forEach((choice) => choice.addEventListener('click', (event) => {
    // Preserve modified-click and open-in-new-tab behavior.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(Number(choice.dataset.projectChoice));
  }));
  previous.addEventListener('click', () => select(current - 1));
  next.addEventListener('click', () => select(current + 1));
  track.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  // Do not intercept keys from the filter's range input or any other controls.
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-roledescription', 'carousel');
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); select(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); select(current - 1); }
  });
  window.addEventListener('resize', update);
  controls.hidden = false;
  update();
})();

/* Signal Lab demonstration. DSP code from reedos/ee-labs, MIT.
 * Source fbfb067d187b85f8e1e4081ea7c485dc032de714; see assets/previews/EE-Labs-MIT.txt.
 * This is a portfolio demonstration, not an embedded or reproduced app interface.
 */
(() => {
  'use strict';
// Second-order IIR sections, from the Robert Bristow-Johnson audio EQ cookbook.
//
// One section, not a cascade. A single biquad with a Q knob teaches more than a
// Butterworth order selector: Q is directly visible as the height of the resonant
// peak (|H(f0)| = Q exactly, for a lowpass — see the tests), and the time-domain
// ringing that comes with it is visible in the same glance.

const BIQUAD_MODES = [
  'lowpass',
  'highpass',
  'bandpass',
  'notch',
  'peaking',
  'allpass',
]

// Kept well inside the unit circle. The UI clamps to these too, so isStable()
// should never be able to fail from user input.
// Q_MAX tracks the widest Q a hand-over from Circuit Lab can name: a series
// RLC reaches the old ceiling of 40 with ordinary component values, and a
// design clamp BELOW the UI's knob silently rebuilt a different filter than
// the knob claimed. At float64 a Q of 100 is still nowhere near trouble —
// the pole pair sits at radius ≈ 1 − w0/(2Q), fully resolved.
const FREQ_MIN = 1
const FREQ_MAX_RATIO = 0.499
const Q_MIN = 0.05
const Q_MAX = 100

/**
 * Coefficients for one section, already normalized by a0 so that a0 = 1.
 * Returns `{ b0, b1, b2, a1, a2 }`.
 */
function designBiquad({ mode, freq, q = Math.SQRT1_2, gainDb = 0 }, sampleRate) {
  const f0 = Math.min(Math.max(freq, FREQ_MIN), sampleRate * FREQ_MAX_RATIO)
  const Q = Math.min(Math.max(q, Q_MIN), Q_MAX)

  const w0 = (2 * Math.PI * f0) / sampleRate
  const cosw = Math.cos(w0)
  const sinw = Math.sin(w0)
  const alpha = sinw / (2 * Q)
  const A = Math.pow(10, gainDb / 40)

  let b0
  let b1
  let b2
  let a0
  let a1
  let a2

  switch (mode) {
    case 'lowpass':
      b0 = (1 - cosw) / 2
      b1 = 1 - cosw
      b2 = (1 - cosw) / 2
      a0 = 1 + alpha
      a1 = -2 * cosw
      a2 = 1 - alpha
      break
    case 'highpass':
      b0 = (1 + cosw) / 2
      b1 = -(1 + cosw)
      b2 = (1 + cosw) / 2
      a0 = 1 + alpha
      a1 = -2 * cosw
      a2 = 1 - alpha
      break
    case 'bandpass': // constant 0 dB peak gain
      b0 = alpha
      b1 = 0
      b2 = -alpha
      a0 = 1 + alpha
      a1 = -2 * cosw
      a2 = 1 - alpha
      break
    case 'notch':
      b0 = 1
      b1 = -2 * cosw
      b2 = 1
      a0 = 1 + alpha
      a1 = -2 * cosw
      a2 = 1 - alpha
      break
    case 'peaking':
      b0 = 1 + alpha * A
      b1 = -2 * cosw
      b2 = 1 - alpha * A
      a0 = 1 + alpha / A
      a1 = -2 * cosw
      a2 = 1 - alpha / A
      break
    case 'allpass':
      b0 = 1 - alpha
      b1 = -2 * cosw
      b2 = 1 + alpha
      a0 = 1 + alpha
      a1 = -2 * cosw
      a2 = 1 - alpha
      break
    default:
      throw new Error(`unknown biquad mode: ${mode}`)
  }

  return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: a1 / a0, a2: a2 / a0 }
}

/**
 * |H(f)|, from substituting z = e^{jw} into (b0 + b1 z^-1 + b2 z^-2)/(1 + a1 z^-1 + a2 z^-2).
 *
 * This is the naive form on purpose — it reads as the definition. The RBJ appendix
 * gives a cancellation-free variant in terms of phi = sin^2(w/2) that is better
 * conditioned at a deep notch, where numerator terms cancel to ~1e-16. The true
 * value there is 0, so the loss of precision is harmless for plotting, and one
 * implementation is worth more than two.
 */
function biquadResponse({ b0, b1, b2, a1, a2 }, f, sampleRate) {
  const w = (2 * Math.PI * f) / sampleRate
  const c1 = Math.cos(w)
  const s1 = Math.sin(w)
  const c2 = Math.cos(2 * w)
  const s2 = Math.sin(2 * w)

  const numRe = b0 + b1 * c1 + b2 * c2
  const numIm = -(b1 * s1 + b2 * s2)
  const denRe = 1 + a1 * c1 + a2 * c2
  const denIm = -(a1 * s1 + a2 * s2)

  const den = Math.hypot(denRe, denIm)
  if (den === 0) return Infinity
  return Math.hypot(numRe, numIm) / den
}

/** arg H(f) in radians. Not plotted yet, but free and useful for the allpass story. */
function biquadPhase({ b0, b1, b2, a1, a2 }, f, sampleRate) {
  const w = (2 * Math.PI * f) / sampleRate
  const c1 = Math.cos(w)
  const s1 = Math.sin(w)
  const c2 = Math.cos(2 * w)
  const s2 = Math.sin(2 * w)
  const numRe = b0 + b1 * c1 + b2 * c2
  const numIm = -(b1 * s1 + b2 * s2)
  const denRe = 1 + a1 * c1 + a2 * c2
  const denIm = -(a1 * s1 + a2 * s2)
  return Math.atan2(numIm, numRe) - Math.atan2(denIm, denRe)
}

/**
 * Magnitude of the pole radius. The impulse response decays as r^n, which is what
 * sets how long the filter rings — and therefore how much pre-roll the chain needs
 * before an FFT frame is clean.
 */
function poleRadius({ a1, a2 }) {
  const disc = a1 * a1 - 4 * a2
  if (disc < 0) return Math.sqrt(Math.abs(a2)) // complex pair
  const r = (Math.abs(a1) + Math.sqrt(disc)) / 2
  return Math.max(Math.abs(r), Math.abs(a2) / (r || 1))
}

/** Poles strictly inside the unit circle. */
function isStable({ a1, a2 }) {
  return Math.abs(a2) < 1 && Math.abs(a1) < 1 + a2
}

/**
 * The section's poles and zeros as points on the z-plane.
 *
 * Multiply the difference equation through by z^2 and the transfer function is
 * (b0 z^2 + b1 z + b2) / (z^2 + a1 z + a2), so both sets are the roots of an
 * ordinary quadratic and no iterative solver is needed. Returned as
 * `{ poles, zeros }`, each a list of `[re, im]`.
 *
 * This is the same filter said a third way. The magnitude curve is what these
 * marks do to a point walking around the unit circle: close to a pole the
 * response rises, close to a zero it falls, and a zero exactly ON the circle
 * puts an exact null at that frequency. Q, which the curve shows as peak height,
 * is here the pole's distance from the circle.
 */
function biquadPolesZeros({ b0, b1, b2, a1, a2 }) {
  return { poles: quadRoots(1, a1, a2), zeros: quadRoots(b0, b1, b2) }
}

/**
 * Roots of a z^2 + b z + c, degenerating gracefully as the degree drops.
 *
 * A TRAILING zero coefficient lowers the degree in z^-1 — a first-order
 * section stored as {b0, b1, 0} is (b0 z + b1)/z after multiplying through,
 * one genuine root plus a pole at the origin that is only delay bookkeeping.
 * Dividing the common z out first keeps the z-plane free of phantom marks at
 * the centre.
 */
function quadRoots(a, b, c) {
  if (Math.abs(c) < 1e-18) {
    // Degree drops: az^2 + bz = z(az + b) — the z root is bookkeeping.
    if (Math.abs(b) < 1e-18) return []
    if (Math.abs(a) < 1e-18) return []
    return [[-b / a, 0]]
  }
  if (Math.abs(a) < 1e-18) {
    if (Math.abs(b) < 1e-18) return []
    return [[-c / b, 0]]
  }
  const disc = b * b - 4 * a * c
  if (disc >= 0) {
    const s = Math.sqrt(disc)
    return [
      [(-b + s) / (2 * a), 0],
      [(-b - s) / (2 * a), 0],
    ]
  }
  const s = Math.sqrt(-disc)
  return [
    [-b / (2 * a), s / (2 * a)],
    [-b / (2 * a), -s / (2 * a)],
  ]
}

/**
 * Samples until the impulse response has decayed below `eps`.
 *
 * Floored at 2: the decay model r^n only describes the recursive part, but the
 * numerator holds two samples of input memory whatever the poles do. With the
 * poles at (or numerically indistinguishable from) the origin — f0 = fs/4 at
 * Q = 0.5 lands exactly there — the formula alone said "settled after 1 sample"
 * of a kernel whose second tap is 0.5, and renderChain trusted it.
 */
function settleSamples(coeffs, eps = 1e-6) {
  const r = poleRadius(coeffs)
  if (Number.isNaN(r) || r >= 1) return Infinity
  return Math.max(2, r > 0 ? Math.ceil(Math.log(eps) / Math.log(r)) : 0)
}

/**
 * A stateful Direct Form I section. `process(x)` is literally the difference
 * equation:
 *
 *   y[n] = b0*x[n] + b1*x[n-1] + b2*x[n-2] - a1*y[n-1] - a2*y[n-2]
 *
 * Transposed Direct Form II is the usual professional choice — it needs two state
 * variables instead of four and has better numerical behavior in fixed point or
 * float32. Neither matters at float64 with Q <= 100, and DF-I has the property that
 * counts here: the code is the equation on the page.
 */
function makeBiquad(coeffs) {
  const { b0, b1, b2, a1, a2 } = coeffs
  let x1 = 0
  let x2 = 0
  let y1 = 0
  let y2 = 0
  return (x) => {
    const y = b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
    x2 = x1
    x1 = x
    y2 = y1
    y1 = y
    return y
  }
}

// ------------------------------------------------------------- filter order

/**
 * Butterworth section Qs for a cascade of total order N (even): the k-th
 * section needs Q = 1/(2 cos((2k+1)π/2N)). For N = 4 that is 0.5412 and
 * 1.3066 — and NOT 0.7071 twice, which is the whole content of the "Order is
 * a choice" lesson.
 */
function butterworthQs(order) {
  const out = []
  for (let k = 0; k < order / 2; k++) {
    out.push(1 / (2 * Math.cos(((2 * k + 1) * Math.PI) / (2 * order))))
  }
  return out
}

/**
 * A first-order section — one pole, and for the high-pass one zero at DC —
 * from the bilinear transform with the corner pre-warped so |H(fc)| is
 * exactly 1/√2. Expressed in the same {b0,b1,b2,a1,a2} shape (b2 = a2 = 0),
 * so every downstream consumer — makeBiquad, biquadResponse, the z-plane —
 * works unchanged.
 *
 * There is no Q. That is not a missing feature: one pole cannot resonate,
 * which is exactly what the order control exists to teach.
 */
function designFirstOrder({ mode, freq }, sampleRate) {
  const f0 = Math.min(Math.max(freq, FREQ_MIN), sampleRate * FREQ_MAX_RATIO)
  const K = Math.tan((Math.PI * f0) / sampleRate)
  const a0 = K + 1
  if (mode === 'highpass') {
    return { b0: 1 / a0, b1: -1 / a0, b2: 0, a1: (K - 1) / a0, a2: 0 }
  }
  return { b0: K / a0, b1: K / a0, b2: 0, a1: (K - 1) / a0, a2: 0 }
}

/**
 * The cascade for a low-pass or high-pass of a chosen order, as a list of
 * sections. Order 2 is the plain RBJ section with the user's Q; order 1 has
 * no Q to set; order 4 is a true Butterworth, whose section Qs are decided by
 * the mathematics rather than the knob.
 */
function designCascade({ mode, freq, q, order = 2 }, sampleRate) {
  const n = Number(order) || 2
  if (n === 1) return [designFirstOrder({ mode, freq }, sampleRate)]
  if (n === 2) return [designBiquad({ mode, freq, q }, sampleRate)]
  return butterworthQs(n).map((bq) => designBiquad({ mode, freq, q: bq }, sampleRate))
}

function square(n, fs) {
  const p = 250 * (n / fs);
  return p - Math.floor(p) < 0.5 ? 1 : -1;
}
// Exact one-sided peak amplitudes of the 32-sample, 50% duty square.
// A_h = 4 / (N sin(pi h/N)); unlike the continuous 4/(pi h) series,
// this includes sampling effects and matches the waveform being processed.
function harmonicLevels(mode, cutoff) {
  const coeffs = designBiquad({ mode, freq: cutoff, q: Math.SQRT1_2 }, 8000);
  return Array.from({ length: 8 }, (_, i) => {
    const order = 2 * i + 1, frequency = order * 250;
    const input = 4 / (32 * Math.sin(Math.PI * order / 32));
    return { order, frequency, input, output: input * biquadResponse(coeffs, frequency, 8000) };
  });
}
function paths(mode, cutoff) {
  const fs = 8000;
  const coeffs = designBiquad({ mode, freq: cutoff, q: Math.SQRT1_2 }, fs);
  const process = makeBiquad(coeffs);
  // The source app pre-rolls its filter. 4096 samples exceeds 1e-12 settling
  // for the complete cutoff range used here (100–2200 Hz, Q = 1/sqrt(2)).
  const input = [], output = [];
  for (let n = -4096; n <= 160; n++) {
    const x = square(n, fs), y = process(x);
    if (n >= 0) { input.push(x); output.push(y); }
  }
  const f = n => n.toFixed(2);
  const waveLimit = 2.5; // Fixed for both modes and the full cutoff sweep; no amplitude autoscaling.
  const wave = values => values.map((v, n) => `${n ? 'L' : 'M'}${f(96 + n / 160 * 1032)},${f(341 - v / waveLimit * 130)}`).join(' ');
  const response = [];
  for (let n = 0; n <= 320; n++) {
    const freq = 4000 * n / 320; // Fixed 0–4 kHz linear axis, independent of cutoff.
    const db = Math.max(-60, Math.min(3, 20 * Math.log10(Math.max(1e-12, biquadResponse(coeffs, freq, fs)))));
    response.push(`${n ? 'L' : 'M'}${f(96 + n / 320 * 1032)},${f(822 - (db + 60) / 63 * 232)}`);
  }
  return { input: wave(input), output: wave(output), response: response.join(' '), waveLimit, cutoffX: 96 + cutoff / 4000 * 1032, cutoffY: 822 - (-3.010299956639812 + 60) / 63 * 232 };
}
  const root = document.getElementById('ee-demo');
  if (!root) return;
  const byId = id => document.getElementById(id);
  const slider = byId('ee-cutoff');
  const play = byId('ee-play');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let mode = 'highpass', playing = false, frame = 0, lastDraw = 0;
  let visible = false, wanted = true, motionOptIn = false, elapsed = 0, previous;
  let phaseOffset = Math.acos((1150 - Number(slider.value)) / 1050);
  function draw() {
    const cutoff = Number(slider.value);
    const p = paths(mode, cutoff);
    for (const h of harmonicLevels(mode, cutoff)) {
      const column = root.querySelector(`[data-harmonic="${h.order}"]`);
      const x = 96 + h.frequency / 4000 * 1032;
      const db = 20 * Math.log10(Math.max(1e-12, h.output));
      const y = 822 - (Math.max(-60, Math.min(3, db)) + 60) / 63 * 232;
      column.querySelector('.harmonic-output').setAttribute('d', `M${x} 822V${y}`);
      column.querySelector('.harmonic-tip').setAttribute('cy', y);
      column.querySelector('[data-harmonic-reading]').textContent = `${h.frequency} Hz: input ${(20 * Math.log10(h.input)).toFixed(1)} dB, filtered ${db.toFixed(1)} dB relative to unit peak amplitude.`;
    }
    byId('ee-input-path').setAttribute('d', p.input);
    byId('ee-output-path').setAttribute('d', p.output);
    byId('ee-response-path').setAttribute('d', p.response);
    byId('ee-cutoff-line').setAttribute('d', 'M' + p.cutoffX + ' 590V822');
    byId('ee-cutoff-dot').setAttribute('cx', p.cutoffX);
    byId('ee-cutoff-dot').setAttribute('cy', p.cutoffY);
    const heading = (mode === 'lowpass' ? 'Low-pass' : 'High-pass') + ' a square';
    byId('ee-plot-heading').textContent = heading;
    byId('ee-plot-title').textContent = 'Signal Lab: ' + heading.toLowerCase();
    byId('ee-plot-desc').textContent = 'A sampled 250 Hz square wave before and after a ' + cutoff + ' Hz second-order ' + mode + ' filter. The lower plot uses a fixed linear 0 to 4000 Hz axis and a fixed minus 60 to plus 3 decibel range. Dashed spectral lines show input harmonics and teal lines show filtered harmonics, in decibels relative to unit peak amplitude. The gold curve is filter gain. The response is minus 3.01 decibels at cutoff. Normalized waveform amplitude uses a fixed minus 2.5 to plus 2.5 scale. Sample rate 8000 Hz; Q equals one over the square root of two.';
    byId('ee-plot-cutoff').textContent = cutoff + ' Hz';
    byId('ee-cutoff-value').value = cutoff + ' Hz';
    slider.setAttribute('aria-valuetext', cutoff + ' hertz');
  }
  function syncMotion() {
    cancelAnimationFrame(frame);
    previous = undefined;
    const allowed = !motion.matches || motionOptIn;
    playing = wanted && allowed && visible && !document.hidden;
    play.setAttribute('aria-pressed', String(wanted && allowed));
    play.textContent = wanted && allowed ? 'Pause filter sweep' : 'Play filter sweep';
    if (playing) frame = requestAnimationFrame(tick);
  }
  function tick(now) {
    if (!playing) return;
    if (previous !== undefined) elapsed += Math.min(now - previous, 100);
    previous = now;
    if (now - lastDraw >= 50) {
      const phase = elapsed / 7000 * Math.PI * 2 + phaseOffset;
      slider.value = Math.round((1150 - 1050 * Math.cos(phase)) / 10) * 10;
      draw();
      lastDraw = now;
    }
    frame = requestAnimationFrame(tick);
  }
  for (const nextMode of ['lowpass', 'highpass']) {
    byId('ee-' + nextMode).addEventListener('click', () => {
      mode = nextMode;
      for (const other of ['lowpass', 'highpass']) byId('ee-' + other).setAttribute('aria-pressed', String(other === mode));
      draw();
    });
  }
  slider.addEventListener('input', () => {
    wanted = false; elapsed = 0;
    phaseOffset = Math.acos((1150 - Number(slider.value)) / 1050);
    syncMotion(); draw();
  });
  play.addEventListener('click', () => {
    if (motion.matches && !motionOptIn) { motionOptIn = true; wanted = true; }
    else wanted = !wanted;
    syncMotion();
  });
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncMotion(); }, { threshold: .2 }).observe(root);
  }
  motion.addEventListener('change', () => { motionOptIn = false; syncMotion(); });
  draw();
  syncMotion();
  root.querySelector('.ee-demo-controls').hidden = false;
})();

/* Analytic Smith-chart sweep. Synthetic load values, never measured telemetry. */
(() => {
  const svg = document.querySelector('.rf-preview');
  const button = document.querySelector('.rf-motion-toggle');
  if (!svg || !button) return;
  const get = name => svg.querySelector(`[data-rf-${name}]`);
  const marker = get('marker'), vector = get('vector'), ring = get('ring');
  const load = get('load'), vswr = get('vswr'), loss = get('loss');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, paused = false, motionOptIn = false, frame;
  let elapsed = 0, previous;
  function reflection(resistance, reactance) {
    const denominator = (resistance + 50) ** 2 + reactance ** 2;
    const real = (resistance ** 2 + reactance ** 2 - 50 ** 2) / denominator;
    const imaginary = 100 * reactance / denominator;
    const magnitude = Math.hypot(real, imaginary);
    return { real, imaginary, magnitude, vswr: (1 + magnitude) / (1 - magnitude), loss: magnitude === 0 ? Infinity : -20 * Math.log10(magnitude) };
  }
  function sample(phase) {
    const resistance = 75 + 50 * Math.sin(phase);
    const reactance = 80 * Math.sin(2 * phase);
    return { resistance, reactance, ...reflection(resistance, reactance) };
  }
  function draw(phase) {
    const value = sample(phase);
    const x = 500 + 398 * value.real, y = 500 - 398 * value.imaginary;
    marker.setAttribute('cx', x); marker.setAttribute('cy', y);
    vector.setAttribute('d', `M500 500L${x} ${y}`);
    ring.setAttribute('r', 398 * value.magnitude);
    const displayedX = Math.round(value.reactance * 10) / 10;
    load.textContent = `${value.resistance.toFixed(1)} ${displayedX < 0 ? '−' : '+'} j${Math.abs(displayedX).toFixed(1)} Ω`;
    vswr.textContent = value.vswr.toFixed(3);
    loss.textContent = `${value.loss.toFixed(3)} dB`;
  }
  const trace = Array.from({ length: 361 }, (_, i) => {
    const value = sample(i / 360 * 2 * Math.PI);
    return `${i ? 'L' : 'M'}${500 + 398 * value.real} ${500 - 398 * value.imaginary}`;
  }).join('');
  get('trace').setAttribute('d', trace);
  draw(0);
  function tick(time) {
    if (previous !== undefined) elapsed += Math.min(time - previous, 100);
    previous = time;
    draw(elapsed / 18000 * 2 * Math.PI);
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); previous = undefined;
    const allowed = !reduced.matches || motionOptIn;
    button.textContent = paused || !allowed ? 'Play animation' : 'Pause animation';
    button.setAttribute('aria-pressed', String(!paused && allowed));
    if (visible && !paused && allowed && !document.hidden) frame = requestAnimationFrame(tick);
  }
  button.hidden = false;
  button.addEventListener('click', () => {
    if (reduced.matches && !motionOptIn) { motionOptIn = true; paused = false; }
    else paused = !paused;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { motionOptIn = false; sync(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .2 }).observe(svg);
  sync();
})();

/* Low-cost visual tours. Only images move; text and links remain still. */
(() => {
  document.querySelectorAll('[data-motion-scene]').forEach(scene => {
    const film = scene.querySelector('.ledger-film');
    const target = film || scene.querySelector('img');
    const button = scene.querySelector('.scene-motion-toggle');
    if (!target || !button || !target.animate) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let animation, visible = false, wanted = true, motionOptIn = false;
    const sync = () => {
      const allowed = !reduced.matches || motionOptIn;
      const active = wanted && allowed;
      button.textContent = `${active ? 'Pause' : 'Play'} ${film ? 'preview' : 'motion'}`;
      button.setAttribute('aria-pressed', String(active));
      if (!animation) return;
      if (active && visible && !document.hidden) animation.play();
      else animation.pause();
    };
    const build = () => {
      const time = animation?.currentTime || 0;
      animation?.cancel();
      // Finish with the investment capture aligned to the viewport's top.
      const travel = film ? scene.querySelector('.ledger-capture-crop').offsetTop : 0;
      const first = film ? 'translateY(0px)' : 'scale(1)';
      const last = film ? `translateY(-${travel}px)` : 'scale(1.18)';
      const keyframes = film ? [
        { transform: first, offset: 0 },
        { transform: first, offset: .12 },
        { transform: last, offset: .4 },
        { transform: last, offset: .65 },
        { transform: first, offset: .9 },
        { transform: first, offset: 1 }
      ] : [
        { transform: first, offset: 0, easing: 'ease-in-out' },
        { transform: last, offset: .5, easing: 'ease-in-out' },
        { transform: first, offset: 1 }
      ];
      animation = target.animate(keyframes, {
        duration: film ? 12000 : 13000,
        iterations: Infinity,
        easing: film ? 'ease-in-out' : 'linear'
      });
      animation.pause(); animation.currentTime = time; sync();
    };
    button.hidden = false;
    button.addEventListener('click', () => {
      if (reduced.matches && !motionOptIn) { motionOptIn = true; wanted = true; }
      else wanted = !wanted;
      sync();
    });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', () => { motionOptIn = false; sync(); });
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .2 }).observe(scene);
    const resize = new ResizeObserver(build);
    resize.observe(scene);
    if (film) {
      resize.observe(film);
      film.querySelectorAll('img').forEach(image => image.addEventListener('load', build));
    }
    build();
  });
})();

/* Sun/moon action toggle, retaining automatic preference until selected. */
(() => {
  const button = document.querySelector('#appearance');
  const root = document.documentElement;
  const device = matchMedia('(prefers-color-scheme: dark)');
  let preference = root.dataset.preference || 'dark';
  const apply = () => {
    root.dataset.preference = preference;
    root.dataset.theme = preference === 'system' ? (device.matches ? 'dark' : 'light') : preference;
    const action = root.dataset.theme === 'dark' ? 'Use light mode' : 'Use dark mode';
    button.setAttribute('aria-label', action);
    button.title = action;
    document.querySelector('meta[name="theme-color"]').content = root.dataset.theme === 'dark' ? '#000000' : '#f1f2ed';
  };
  button.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('reed-hub-theme', preference); } catch {}
    const url = new URL(location.href);
    if (url.searchParams.has('theme')) { url.searchParams.set('theme', preference); history.replaceState(null, '', url); }
    apply();
  });
  device.addEventListener('change', apply);
  apply();
})();

/* The Intelligence Factory: a loop rendered frame by frame from the site's own 3D. Plays only while on screen. */
(() => {
  const video = document.querySelector('.if-film');
  const button = document.querySelector('.if-motion-toggle');
  if (!video || !button) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, paused = false, motionOptIn = false;
  // Level labels, synced to the video's own clock. Names and scale lines are the factory's own (#steps, pinned
  // scenario). Each entry starts at a loop time in seconds; level 0 is a gap while the iris closes, so the next
  // level is named in the black of the dive, before it is revealed.
  const LEVELS = ['', 'Scale across', 'Grid & campus', 'Power room & data hall', 'The rack', 'Compute tray', 'GPU package & tokens'];
  const SCALES = {
    '1 power': '345 kV · 2,000 km across', '2 power': '345 kV · 1.6 km across', '2 heat': '100 MW out · 1.6 km across',
    '3 power': '800 V · 70 m across', '4 power': '50 V · 2.3 m tall',
    '5 power': '12 V · 44 cm wide', '5 data': '800G · 44 cm wide', '5 heat': 'cold plates · 44 cm wide',
    '6 power': '0.8 V · 10 cm across', '6 data': 'HBM · 10 cm across',
  };
  const TIMELINE = [
    [0, 6, 'power'], [0.2, 6, 'data'], [3.0, 5, 'power'], [4.0, 5, 'data'], [5.2, 5, 'heat'], [6.2, 2, 'heat'],
    [9.0, 1, 'power'], [10.17, 0], [10.25, 2, 'power'], [11.11, 0], [11.19, 3, 'power'], [12.04, 0], [12.12, 4, 'power'],
    [13.0, 0], [13.08, 5, 'power'], [13.95, 0], [14.03, 6, 'power'],
  ];
  // what the moving lines and colors are: the factory's own legend for that level and layer (its #legend)
  const LEGENDS = {
    '1 power': [["#b69cff", "345–500 kV grid"]],
    '2 power': [["#b69cff", "345 kV"], ["#ffb14e", "34.5 kV"]],
    '2 heat': [["#ff5a6e", "Warm water up"], ["#ff8a4a", "Warm air out"], ["#d6e6ff", "Evaporation"], ["#3f8cff", "Makeup water"]],
    '3 power': [["#ffb14e", "34.5 kV"], ["#e8ff5a", "800 V DC"], ["#3f8cff", "Supply water"], ["#ff5a6e", "Return water"]],
    '4 power': [["#e8ff5a", "800 V DC"], ["#47cfff", "≈50 V DC"], ["#3f8cff", "Supply"], ["#ff5a6e", "Return"]],
    '5 power': [["#47cfff", "≈50 V"], ["#5ce1c6", "12 V"], ["#e9fbff", "≈0.8 V"], ["#3f8cff", "Supply"], ["#ff5a6e", "Return"]],
    '5 data': [["#ff5fd2", "NVLink"], ["#ffa3e4", "NVLink-C2C"], ["#a6f35a", "To the NIC and optics"]],
    '5 heat': [["#ffc34a", "Heat into the plates"], ["#3f8cff", "Supply"], ["#ff5a6e", "Return"], ["#ff8a4a", "Fan air"]],
    '6 power': [["#e9fbff", "≈0.8 V, rising"]],
    '6 data': [["#b08cff", "HBM"], ["#7fe3ff", "Die to die"], ["#ff5fd2", "NVLink out"]],
  };
  const LOOP = 14.8, FADE_IN = .15, FADE_OUT = .1;
  const tag = video.parentElement.querySelector('.if-level');
  const kicker = tag && tag.querySelector('[data-if-kicker]');
  const name = tag && tag.querySelector('[data-if-name]');
  const scale = tag && tag.querySelector('[data-if-scale]');
  const layers = video.parentElement.querySelector('.if-layers');
  const layerNames = layers ? [...layers.querySelectorAll('[data-if-layer]')] : [];
  const legend = layers && layers.querySelector('[data-if-legend]');
  let shown = '';
  function paintLevel(time) {
    if (!tag) return;
    const t = ((time % LOOP) + LOOP) % LOOP;
    let i = TIMELINE.length - 1;
    while (i > 0 && TIMELINE[i][0] > t) i--;
    const [start, level, layer] = TIMELINE[i];
    const prev = TIMELINE[(i + TIMELINE.length - 1) % TIMELINE.length], next = TIMELINE[(i + 1) % TIMELINE.length];
    const end = i === TIMELINE.length - 1 ? LOOP : next[0];
    let opacity = 0;
    if (level) {
      const fadeIn = prev[1] !== level ? Math.min(1, (t - start) / FADE_IN) : 1;
      const fadeOut = next[1] !== level ? Math.min(1, (end - t) / FADE_OUT) : 1;
      opacity = Math.max(0, Math.min(fadeIn, fadeOut));
      const key = `${level} ${layer}`;
      if (key !== shown) {
        shown = key;
        kicker.textContent = `Level ${level} / 6`;
        name.textContent = LEVELS[level];
        scale.textContent = SCALES[key] || '';
        if (layers) {
          layerNames.forEach(el => el.classList.toggle('is-active', el.dataset.ifLayer === layer));
          legend.replaceChildren(...(LEGENDS[key] || []).map(([color, text]) => {
            const item = document.createElement('span');
            item.style.setProperty('--c', color);
            item.textContent = text;
            return item;
          }));
        }
      }
    }
    tag.style.opacity = opacity.toFixed(3);
    if (layers) layers.style.opacity = tag.style.opacity;
  }
  let ticking = false;
  const frameTick = 'requestVideoFrameCallback' in HTMLVideoElement.prototype
    ? () => video.requestVideoFrameCallback((now, meta) => { try { paintLevel(meta.mediaTime); } finally { tick(); } })
    : () => requestAnimationFrame(() => { try { paintLevel(video.currentTime); } finally { tick(); } });
  function tick() { if (video.paused) { ticking = false; return; } frameTick(); }
  video.addEventListener('playing', () => { if (!ticking) { ticking = true; frameTick(); } });
  ['seeked', 'pause', 'loadeddata'].forEach(type => video.addEventListener(type, () => paintLevel(video.currentTime)));
  function label() {
    const playing = !paused && (!reduced.matches || motionOptIn);
    button.textContent = playing ? 'Pause video' : 'Play video';
    button.setAttribute('aria-pressed', String(playing));
  }
  function sync() {
    label();
    const allowed = !reduced.matches || motionOptIn;
    if (visible && !paused && allowed && !document.hidden) {
      video.play().catch(error => {
        // AbortError: our own pause() interrupted it as the card left the screen, so it is not a refusal
        if (error && error.name === 'AbortError') return;
        paused = true; label();   // autoplay refused (e.g. Low Power Mode): the poster stays
      });
    } else if (!video.paused) video.pause();
  }
  video.muted = true;
  button.hidden = false;
  button.addEventListener('click', () => {
    if (reduced.matches && !motionOptIn) { motionOptIn = true; paused = false; }
    else paused = !paused;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { motionOptIn = false; sync(); });
  if (!('IntersectionObserver' in window)) { visible = true; sync(); return; }
  // start fetching a screen ahead, play only while at least a fifth of it shows
  new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) { video.preload = 'auto'; observer.disconnect(); }
  }, { rootMargin: '100% 100%' }).observe(video);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .2 }).observe(video);
  label();
})();
