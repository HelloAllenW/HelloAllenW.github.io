(() => {
  const body = document.body;
  const syncTheme = () => {
    const dark = body.classList.contains('dark-theme');
    document.querySelectorAll('.theme-toggle').forEach(el => el.setAttribute('aria-checked', String(dark)));
    document.querySelectorAll('[data-set-theme]').forEach(el => el.setAttribute('aria-pressed', String((el.dataset.setTheme === 'dark') === dark)));
  };
  const setTheme = dark => {
    body.classList.toggle('dark-theme', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
    syncTheme();
  };
  syncTheme();
  document.querySelectorAll('.theme-toggle').forEach(el => el.addEventListener('click', () => setTheme(!body.classList.contains('dark-theme'))));
  document.querySelectorAll('[data-set-theme]').forEach(el => el.addEventListener('click', () => setTheme(el.dataset.setTheme === 'dark')));
  const mobile = matchMedia('(max-width: 700px)');
  const directory = document.querySelector('.tag-directory');
  if (directory && mobile.matches) directory.open = false;
  const video = document.querySelector('.landing-video');
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('.motion-toggle');
  let pausedByUser = false;
  function loadVideo() {
    if (motion.matches || (navigator.connection && navigator.connection.saveData)) {
      video.pause(); video.removeAttribute('src'); video.load(); video.classList.remove('is-playing'); button.hidden = true; return;
    }
    const src = mobile.matches ? video.dataset.mobile : video.dataset.desktop;
    if (video.getAttribute('src') !== src) { video.classList.remove('is-playing'); video.src = src; }
    if (!pausedByUser && !document.hidden) video.play().catch(() => { button.hidden = false; button.textContent = 'Play background'; button.setAttribute('aria-label', 'Play background animation'); });
  }
  video.addEventListener('playing', () => { video.classList.add('is-playing'); button.hidden = false; button.textContent = 'Pause background'; button.setAttribute('aria-label', 'Pause background animation'); });
  video.addEventListener('error', () => { video.classList.remove('is-playing'); button.hidden = true; });
  button.addEventListener('click', () => {
    pausedByUser = !video.paused;
    if (pausedByUser) { video.pause(); button.textContent = 'Play background'; button.setAttribute('aria-label', 'Play background animation'); }
    else video.play().catch(() => {});
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else loadVideo(); });
  mobile.addEventListener('change', loadVideo); motion.addEventListener('change', loadVideo); loadVideo();
})();
