// Irene Romero Sanz · JS ligero, sin dependencias
(function () {
  // Menú móvil
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Sombra de la cabecera al hacer scroll
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Aparición suave de elementos
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Contadores animados
  var counters = document.querySelectorAll('[data-count]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  // Formulario de contacto
  // En local/prueba abre el correo del usuario con el mensaje ya redactado.
  // Para producción: pon en el <form> un action de Formspree/Netlify Forms
  // y borra la clase "mailto-form" (el formulario se enviará sin JS).
  var form = document.querySelector('form.mailto-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var trap = form.querySelector('input[name="web"]');
      if (trap && trap.value) return; // antispam: campo trampa relleno
      var d = new FormData(form);
      var to = form.getAttribute('data-to');
      var subject = 'Consulta web: ' + (d.get('tema') || 'General');
      var body = 'Nombre: ' + d.get('nombre') + '\n' +
                 'Teléfono: ' + (d.get('telefono') || '-') + '\n' +
                 'Email: ' + d.get('email') + '\n\n' + d.get('mensaje');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var ok = document.getElementById('form-ok');
      if (ok) ok.hidden = false;
    });
  }

  // Año en el pie
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
