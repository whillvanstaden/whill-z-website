(() => {
  const widget = document.querySelector('.follow-widget');
  const toggle = widget.querySelector('.follow-toggle');
  const panel = widget.querySelector('.follow-panel');
  let pinned = false;
  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '−' : '+';
  }
  toggle.addEventListener('click', () => {
    pinned = !pinned;
    setOpen(pinned);
  });
  widget.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) setOpen(true);
  });
  widget.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && !pinned && !widget.contains(document.activeElement)) setOpen(false);
  });
  widget.addEventListener('focusout', event => {
    if (!widget.contains(event.relatedTarget)) { pinned = false; setOpen(false); }
  });
  document.addEventListener('click', event => {
    if (!widget.contains(event.target)) { pinned = false; setOpen(false); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      pinned = false;
      setOpen(false);
      toggle.focus();
    }
  });
})();
