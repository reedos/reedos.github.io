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
    button.title = 'Appearance: Auto → Dark → Light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#000000' : '#f5f6f7';
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
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
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
