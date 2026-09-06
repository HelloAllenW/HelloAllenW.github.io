(() => {
  const map = document.querySelector('.reading-map');
  if (!map) return;
  const list = map.querySelector('.reading-map-list');
  const toggle = map.querySelector('.reading-map-toggle');
  const preview = map.querySelector('.reading-map-preview');
  const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 701px)');
  const links = [...list.querySelectorAll('a')];
  const entries = links.map(link => {
    let heading;
    try { heading = document.getElementById(decodeURIComponent(link.hash.slice(1))); } catch (_) {}
    if (!heading) return null;
    link.dataset.level = heading.tagName.slice(1);
    link.setAttribute('aria-label', link.textContent.trim());
    let excerpt = '';
    for (let node = heading.nextElementSibling; node && !/^H[1-6]$/.test(node.tagName); node = node.nextElementSibling) {
      if (node.tagName === 'P' && node.textContent.trim()) { excerpt = node.textContent.trim(); break; }
    }
    return { link, heading, excerpt };
  }).filter(Boolean);
  if (!entries.length) { map.hidden = true; return; }
  const hidePreview = () => { preview.hidden = true; };
  const showPreview = entry => {
    if (!fine.matches) return;
    preview.href = entry.link.href;
    preview.querySelector('.reading-map-title').textContent = entry.link.textContent.trim();
    preview.querySelector('.reading-map-excerpt').textContent = entry.excerpt.slice(0, 180);
    preview.hidden = false;
    const rect = entry.link.getBoundingClientRect();
    const y = Math.max(16, Math.min(innerHeight - preview.offsetHeight - 16, rect.top + rect.height / 2 - preview.offsetHeight / 2));
    preview.style.top = `${y}px`;
  };
  entries.forEach(entry => {
    entry.link.addEventListener('pointerenter', () => showPreview(entry));
    entry.link.addEventListener('focus', () => showPreview(entry));
  });
  map.addEventListener('pointerleave', hidePreview);
  map.addEventListener('focusout', event => { if (!map.contains(event.relatedTarget)) hidePreview(); });
  const close = () => {
    map.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    hidePreview();
  };
  toggle.addEventListener('click', () => {
    const open = map.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    if (open) list.querySelector('[aria-current]')?.scrollIntoView({ block: 'nearest' });
  });
  map.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('pointerdown', event => { if (!map.contains(event.target)) close(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = map.classList.contains('is-open');
    close();
    if (open) toggle.focus();
  });
  let pending = false;
  let active;
  const update = () => {
    pending = false;
    let current = entries[0];
    for (const entry of entries) {
      if (entry.heading.getBoundingClientRect().top <= 160) current = entry;
      else break;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = entries[entries.length - 1];
    if (current === active) return;
    active?.link.removeAttribute('aria-current');
    current.link.setAttribute('aria-current', 'location');
    active = current;
  };
  const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
  const resize = () => {
    map.style.setProperty('--map-step', `${Math.max(8, Math.min(16, innerHeight * .68 / entries.length))}px`);
    hidePreview();
    schedule();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', resize);
  fine.addEventListener('change', close);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.querySelector('.post-content'));
  resize();
})();
