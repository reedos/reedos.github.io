(() => {
  const track = document.querySelector('.photo-review-track');
  if (!track) return;
  // The shipped gallery has no visible transport controls. Any interaction
  // permanently holds playback for this visit, preserving manual exploration.
  if (track.classList.contains('field-track')) {
    // Autoplay while visible. Manual browsing (a swipe, a sideways scroll, arrow keys, keyboard
    // focus) holds it for the visit; a mouse resting on the photos pauses it only while there.
    // Scrolling the page past the gallery, or the page moving under a still pointer, is not
    // interaction with the gallery and must not stop it.
    const slides = [...track.querySelectorAll('figure')];
    const status = document.querySelector('[data-photo-status]');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let held = false;
    let hovering = false;
    let touching = false;
    let settling = false;
    let swiped = false;
    let touchStartLeft = 0;
    let timer;
    const current = () => Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    const move = (step) => {
      const next = (current() + step + slides.length) % slides.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: reduced.matches ? 'instant' : 'smooth' });
    };
    const sync = () => {
      clearInterval(timer);
      if (visible && !held && !hovering && !touching && !document.hidden && !reduced.matches) timer = setInterval(() => move(1), 4000);
    };
    const hold = () => { held = true; sync(); status.setAttribute('aria-live', 'polite'); };
    track.addEventListener('mousemove', (event) => {
      if (!hovering && (event.movementX || event.movementY)) { hovering = true; sync(); }
    });
    track.addEventListener('mouseleave', () => { if (hovering) { hovering = false; sync(); } });
    track.addEventListener('touchstart', () => { touching = true; swiped = false; touchStartLeft = track.scrollLeft; sync(); }, { passive: true });
    const touchDone = () => {
      if (!touching) return;
      touching = false;
      settling = true;
      // A sideways swipe, even one that snaps back to the same photo, is manual browsing; a touch
      // that only scrolled the page vertically is not. Let a flick settle before deciding.
      setTimeout(() => { settling = false; if (swiped) hold(); else sync(); }, 400);
    };
    track.addEventListener('touchend', touchDone, { passive: true });
    track.addEventListener('touchcancel', touchDone, { passive: true });
    track.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) hold();
    }, { passive: true });
    track.addEventListener('focusin', hold);
    track.addEventListener('keydown', (event) => {
      hold();
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    track.addEventListener('scroll', () => {
      if ((touching || settling) && Math.abs(track.scrollLeft - touchStartLeft) > 8) swiped = true;
      status.textContent = `${current() + 1} / ${slides.length}`;
    }, { passive: true });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .2 }).observe(track);
    return;
  }
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
