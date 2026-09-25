(() => {
  const widget = document.querySelector('.follow-widget');
  if (!widget) return;
  const toggle = widget.querySelector('.follow-toggle');
  const panel = widget.querySelector('.follow-panel');
  let automatic = false;
  let autoOpened = false;
  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '−' : '+';
  }
  function close() {
    automatic = false;
    setOpen(false);
  }
  function checkBottom() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const atBottom = maxScroll > 40 && window.scrollY > 0 && maxScroll - window.scrollY <= 40;
    if (automatic && !atBottom) close();
    if (atBottom && !autoOpened) {
      autoOpened = true;
      if (panel.hidden) {
        automatic = true;
        setOpen(true);
      }
    }
  }
  window.addEventListener('scroll', checkBottom, { passive: true });
  window.addEventListener('resize', checkBottom);
  window.addEventListener('load', checkBottom);
  window.addEventListener('pageshow', checkBottom);
  toggle.addEventListener('click', () => {
    automatic = false;
    setOpen(panel.hidden);
  });
  widget.addEventListener('focusout', event => {
    if (!widget.contains(event.relatedTarget)) close();
  });
  document.addEventListener('click', event => {
    if (!widget.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      close();
      toggle.focus();
    }
  });
})();
