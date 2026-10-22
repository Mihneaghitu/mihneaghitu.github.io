(function () {
  var root = document.documentElement;

  // ---- Light / dark theme toggle ----
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  var toggle = document.getElementById('themeToggle');
  function labelToggle() {
    var label = isDark() ? 'Switch to light theme' : 'Switch to dark theme';
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  }
  if (toggle) {
    labelToggle();
    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      labelToggle();
    });
    // Keep the label right if the system theme changes while no choice is saved
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', labelToggle);
    }
  }

  // ---- Mobile menu ----
  var links = document.getElementById('navLinks');
  var menu = document.getElementById('menuToggle');
  if (menu && links) {
    menu.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // ---- BibTeX toggles ----
  document.querySelectorAll('[data-bib]').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.getAttribute('data-bib'));
      if (el) el.classList.toggle('open');
    });
  });

  // ---- Footer year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
