// Site script: theme toggle, phone menu, Evidence/Reflection tabs,
// route rail highlighting, screenshot lightbox and missing-image handling.
(function () {
  var root = document.documentElement;

  // Theme toggle: flips data-theme on <html> and remembers the choice
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Phone menu: the sidebar collapses to a bar with a toggle button
  var side = document.querySelector('.side');
  var menuBtn = document.querySelector('.side__toggle');
  if (side && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = side.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Tabs: each [data-tabs] block has buttons that show one panel at a time
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      // Arrow keys move between tabs, as screen reader users expect
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        select(next); next.focus();
      });
    });
    function select(active) {
      tabs.forEach(function (tab) {
        var on = tab === active;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
  });

  // Route rail: highlight the stop currently on screen
  var links = document.querySelectorAll('.route__line a');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Lightbox: click a screenshot to see it full size
  var box = document.getElementById('lightbox');
  function closeBox() { box.hidden = true; }
  if (box) {
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.lightbox__close')) closeBox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
  }

  document.querySelectorAll('main img').forEach(function (img) {
    // If a screenshot is missing, hide its figure instead of showing a broken image icon
    function hide() {
      var fig = img.closest('.shot') || img;
      fig.hidden = true;
      var group = img.closest('.shots');
      if (group && !group.querySelector('.shot:not([hidden])')) group.hidden = true;
    }
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide);

    if (box && img.closest('.shot')) {
      img.addEventListener('click', function () {
        box.querySelector('img').src = img.src;
        box.querySelector('img').alt = img.alt;
        var cap = img.closest('.shot').querySelector('figcaption');
        box.querySelector('figcaption').textContent = cap ? cap.textContent : '';
        box.hidden = false;
      });
    }
  });

  // Open external links in a new tab so the lecturer never loses the portfolio
  document.querySelectorAll('main a[href^="http"]').forEach(function (a) {
    a.target = '_blank'; a.rel = 'noopener';
  });
})();
