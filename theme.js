// Runs before stylesheets so the saved palette is applied before the first paint.
(() => {
  const themes = [
    { id: 'noite', label: 'Noite suave', color: '#1d2728', scheme: 'dark' },
    { id: 'neblina', label: 'Neblina', color: '#293239', scheme: 'dark' },
    { id: 'areia', label: 'Areia', color: '#dfd6c2', scheme: 'light' },
    { id: 'salvia', label: 'Sálvia', color: '#cdd5c4', scheme: 'light' }
  ];
  const key = 'aph-em-cena-theme';
  let selected = 'noite';
  try {
    const saved = localStorage.getItem(key);
    if (themes.some(theme => theme.id === saved)) selected = saved;
  } catch { /* Keep a comfortable default when storage is unavailable. */ }

  function apply(id, persist = false) {
    const theme = themes.find(theme => theme.id === id);
    if (!theme) return;
    selected = theme.id;
    document.documentElement.dataset.theme = theme.id;
    document.documentElement.style.colorScheme = theme.scheme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme.color;
    document.querySelectorAll('[data-theme-select]').forEach(select => select.value = selected);
    if (persist) {
      try { localStorage.setItem(key, selected); } catch { /* The selection still works for this visit. */ }
    }
  }

  window.AphTheme = Object.freeze({ themes, current: () => selected });
  apply(selected);
  document.addEventListener('change', event => {
    if (event.target.matches('[data-theme-select]')) apply(event.target.value, true);
  });
  window.addEventListener('storage', event => {
    if (event.key === key) apply(event.newValue || 'noite');
  });
})();
