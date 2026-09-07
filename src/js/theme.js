// Dark mode follows the system setting. The toggle overrides it and remembers the choice.
(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  if (!button) return;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function current() {
    return root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light');
  }
  function label() {
    button.textContent = current() === 'dark' ? 'Light mode' : 'Dark mode';
  }
  button.hidden = false;
  label();
  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });
  media.addEventListener('change', label);
})();
