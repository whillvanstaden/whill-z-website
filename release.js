(() => {
  const cards = [...document.querySelectorAll('[data-live-at]')];
  function updateReleases() {
    const now = Date.now();
    for (const card of cards) {
      if (now >= Date.parse(card.dataset.liveAt) && !card.classList.contains('is-live')) {
        card.classList.add('is-live');
        card.querySelector('.release-status').textContent = 'Live now';
        card.querySelector('.release-link').textContent = 'Listen now ↗';
      }
    }
  }
  updateReleases();
  setInterval(updateReleases, 1000);
  document.addEventListener('visibilitychange', updateReleases);
  window.addEventListener('pageshow', updateReleases);
})();
