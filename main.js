/* Only the small-screen navigation needs JavaScript. All content works without it. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!toggle || !navigation) return;

  const label = toggle.querySelector('.menu-label');
  const smallScreen = window.matchMedia('(max-width: 1024px)');

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
