// Display controls. Dark mode follows the system setting until the toggle
// overrides it. The colorblind palette is the default, and the standard
// red-and-green palette is there for anyone who wants the tools' colors. Both
// choices are remembered in localStorage and applied before first paint by
// the inline script in <head>. Printing opens every fold first.
(function () {
  var root = document.documentElement;
  var controls = document.querySelector('.controls');
  if (!controls) return;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var theme = controls.querySelector('[data-control="theme"]');
  var palette = controls.querySelector('[data-control="palette"]');

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : media.matches;
  }
  function isStandard() {
    return root.getAttribute('data-palette') === 'standard';
  }
  function remember(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  // Labels say what pressing does. The second word is dropped on narrow screens.
  function label(button, first, rest) {
    button.textContent = '';
    button.appendChild(document.createTextNode(first));
    var more = document.createElement('span');
    more.className = 'more';
    more.textContent = ' ' + rest;
    button.appendChild(more);
  }
  function render() {
    label(theme, isDark() ? 'Light' : 'Dark', 'mode');
    theme.setAttribute('aria-pressed', String(isDark()));
    label(palette, isStandard() ? 'Colorblind' : 'Standard', 'palette');
    palette.setAttribute('aria-pressed', String(isStandard()));
  }

  theme.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    remember('theme', next);
    render();
  });
  palette.addEventListener('click', function () {
    if (isStandard()) {
      root.removeAttribute('data-palette');
      remember('palette', '');
    } else {
      root.setAttribute('data-palette', 'standard');
      remember('palette', 'standard');
    }
    render();
  });

  // Folds print open. Remember which were closed so the page goes back to how
  // the reader left it.
  var reopened = [];
  window.addEventListener('beforeprint', function () {
    reopened = Array.prototype.filter.call(document.querySelectorAll('details.fold'), function (d) { return !d.open; });
    reopened.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () {
    reopened.forEach(function (d) { d.open = false; });
    reopened = [];
  });
  media.addEventListener('change', render);

  controls.hidden = false;
  render();

  // Split view on the Home hunk: before and after side by side. Desktop only,
  // the stylesheet forces unified on narrow screens. Remembered like the rest.
  var hero = document.querySelector('.hero');
  if (hero) {
    var unified = hero.querySelector('.lines.unified');
    var split = hero.querySelector('.lines.split');
    var views = hero.querySelectorAll('[data-view]');
    function setView(v) {
      if (!split || !unified) return;
      split.hidden = v !== 'split';
      unified.hidden = v === 'split';
      views.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === v)); });
    }
    var savedView = null;
    try { savedView = localStorage.getItem('view'); } catch (e) {}
    if (savedView) setView(savedView);
    views.forEach(function (b) {
      b.addEventListener('click', function () { setView(b.getAttribute('data-view')); remember('view', b.getAttribute('data-view')); });
    });
  }
})();
