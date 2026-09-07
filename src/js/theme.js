// Display controls. Dark mode follows the system setting until the toggle
// overrides it. The colorblind palette is off until asked for. Both choices
// are remembered in localStorage and applied before first paint by the inline
// script in <head>.
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
  function isColorblind() {
    return root.getAttribute('data-palette') === 'colorblind';
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
    label(palette, isColorblind() ? 'Standard' : 'Colorblind', 'palette');
    palette.setAttribute('aria-pressed', String(isColorblind()));
  }

  theme.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    remember('theme', next);
    render();
  });
  palette.addEventListener('click', function () {
    if (isColorblind()) {
      root.removeAttribute('data-palette');
      remember('palette', '');
    } else {
      root.setAttribute('data-palette', 'colorblind');
      remember('palette', 'colorblind');
    }
    render();
  });
  media.addEventListener('change', render);

  controls.hidden = false;
  render();
})();
