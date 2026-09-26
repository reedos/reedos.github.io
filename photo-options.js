(() => {
  const track = document.querySelector('.photo-review-track');
  const controls = document.querySelector('.photo-review-controls');
  const slides = [...track.querySelectorAll('figure')];
  const play = document.querySelector('[data-photo-play]');
  const status = document.querySelector('[data-photo-status]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const stop = () => {
    clearInterval(timer);
    timer = undefined;
    play.textContent = 'Play slideshow';
    play.setAttribute('aria-pressed', 'false');
    status.setAttribute('aria-live', 'polite');
  };
  const move = (step) => {
    const next = (current() + step + slides.length) % slides.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduced.matches ? 'instant' : 'smooth' });
  };
  controls.hidden = false;
  document.querySelector('[data-photo-prev]').addEventListener('click', () => { stop(); move(-1); });
  document.querySelector('[data-photo-next]').addEventListener('click', () => { stop(); move(1); });
  play.addEventListener('click', () => {
    if (timer) return stop();
    if (reduced.matches) return;
    timer = setInterval(() => move(1), 7000);
    play.textContent = 'Pause slideshow';
    play.setAttribute('aria-pressed', 'true');
    status.setAttribute('aria-live', 'off');
  });
  track.addEventListener('scroll', () => { status.textContent = `${current() + 1} / ${slides.length}`; }, { passive: true });
  track.addEventListener('pointerdown', stop);
  track.addEventListener('mouseenter', stop);
  track.addEventListener('focusin', stop);
  track.addEventListener('keydown', (event) => {
    stop();
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); }).observe(track);
  const syncMotion = () => {
    stop();
    play.disabled = reduced.matches;
    if (reduced.matches) play.textContent = 'Reduced motion enabled';
  };
  reduced.addEventListener('change', syncMotion);
  syncMotion();
})();
