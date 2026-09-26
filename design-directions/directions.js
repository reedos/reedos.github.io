/* Presentation-only review controls. The main portfolio is unchanged. */
(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themes = ['light', 'dark', 'system'];
  const fieldPhotos = {
    ibex: { src: '../assets/images/alpine-ibex.webp', width: 900, height: 1200, ratio: 'portrait', species: 'Alpine ibex', alt: 'An Alpine ibex standing on a snow-covered rock ledge. Photograph by Reed Cameron Osaki.' },
    fox: { src: '../assets/images/red-fox.webp', width: 1920, height: 1280, ratio: 'landscape fox-photo', species: 'Red fox', alt: 'A red fox stepping forward. Photograph by Reed Cameron Osaki.' },
    flycatcher: { src: '../assets/images/vermilion-flycatcher.webp', width: 1920, height: 1280, ratio: 'landscape', species: 'Vermilion flycatcher', alt: 'A vermilion flycatcher perched on a branch. Photograph by Reed Cameron Osaki.' }
  };
  const directions = {
    studio: {
      description: 'A balanced introduction, two featured tools, and a compact project index. The strongest balance of engineering and photography.',
      tradeoff: 'Less theatrical; easier to browse.',
      field: 'fox', aside: 'flycatcher',
      photo: '../assets/images/alpine-ibex.webp', width: 900, height: 1200, ratio: 'portrait', species: 'Alpine ibex',
      alt: 'An Alpine ibex standing on a snow-covered rock ledge. Photograph by Reed Cameron Osaki.'
    },
    index: {
      description: 'A concise introduction followed by all five tools in a clear index. Direct links stay visible; the large desktop preview changes when you select a project title.',
      tradeoff: 'The fastest route to the tools; photography plays a smaller role.',
      field: 'fox', aside: 'ibex',
      photo: '../assets/images/vermilion-flycatcher.webp', width: 1920, height: 1280, ratio: 'landscape', species: 'Vermilion flycatcher',
      alt: 'A vermilion flycatcher perched on a branch. Photograph by Reed Cameron Osaki.'
    },
    journal: {
      description: 'An uninterrupted 4:3 photograph opens the page. Editorial project spreads follow, with a larger photography section and compact professional background.',
      tradeoff: 'The strongest photographic identity; a longer scroll to explore every tool.',
      field: 'ibex', aside: 'flycatcher',
      photo: '../assets/images/red-fox.webp', width: 1920, height: 1280, ratio: 'landscape fox-photo', species: 'Red fox',
      alt: 'A red fox stepping forward. Photograph by Reed Cameron Osaki.'
    }
  };
  const captions = {
    ee: 'EE Labs / Circuit response', rf: 'RF Reference / Verified Smith chart',
    gradient: 'Gradient Ascent / Technique map', stack: 'Stack Ledger / Capital spending', catalog: 'Field Catalog / Photo library'
  };
  let preference = 'system';
  try { const saved = localStorage.getItem('reed-design-theme'); if (themes.includes(saved)) preference = saved; } catch { /* Storage can be unavailable in private browsing. */ }
  const params = new URLSearchParams(location.search);
  if (themes.includes(params.get('theme'))) preference = params.get('theme');

  function applyTheme() {
    root.dataset.theme = preference === 'system' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference)));
  }
  function setDirection(value, updateAddress = true) {
    const key = Object.hasOwn(directions, value) ? value : 'studio';
    const direction = directions[key];
    root.dataset.direction = key;
    document.querySelectorAll('[data-direction-choice]').forEach(link => {
      if (link.dataset.directionChoice === key) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('direction-description').textContent = direction.description;
    const tradeoff = document.getElementById('direction-tradeoff');
    tradeoff.replaceChildren();
    const label = document.createElement('strong'); label.textContent = 'Tradeoff: ';
    tradeoff.append(label, direction.tradeoff);
    const photo = document.querySelector('.intro-photo img');
    photo.src = direction.photo; photo.width = direction.width; photo.height = direction.height;
    photo.alt = direction.alt; photo.className = 'wildlife-photo ' + direction.ratio;
    document.querySelector('.intro-photo figcaption span').textContent = direction.species;
    [['.field-landscape', direction.field], ['.field-aside figure', direction.aside]].forEach(([selector, name]) => {
      const field = fieldPhotos[name];
      const figure = document.querySelector(selector);
      const image = figure.querySelector('img');
      image.src = field.src; image.width = field.width; image.height = field.height;
      image.alt = field.alt; image.className = 'wildlife-photo ' + field.ratio;
      figure.querySelector('figcaption').textContent = field.species;
    });
    if (updateAddress) {
      const address = new URL(location.href); address.searchParams.set('direction', key);
      history.replaceState(null, '', address);
    }
  }
  document.querySelectorAll('[data-direction-choice]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); setDirection(link.dataset.directionChoice);
  }));
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
    preference = button.dataset.themeChoice;
    try { localStorage.setItem('reed-design-theme', preference); } catch { /* Keep the current session usable. */ }
    const address = new URL(location.href); address.searchParams.set('theme', preference); history.replaceState(null, '', address);
    applyTheme();
  }));
  document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.preview;
    const project = document.querySelector('[data-project="' + key + '"]');
    const source = project.querySelector('.project-image img');
    const image = document.getElementById('index-preview-image');
    image.src = source.getAttribute('src'); image.alt = source.alt;
    image.width = source.width; image.height = source.height;
    document.getElementById('index-preview-link').href = project.querySelector('.project-image').href;
    document.getElementById('index-preview-caption').textContent = captions[key];
    document.querySelectorAll('[data-preview]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
  }));
  systemTheme.addEventListener('change', applyTheme);
  applyTheme(); setDirection(params.get('direction'), false);
})();
