(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('mobile-nav');
  var backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!toggle || !nav) return;

  function openNav() {
    nav.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  toggle.addEventListener('click', function () {
    if (nav.hidden) {
      openNav();
    } else {
      closeNav();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeNav);
  }

  Array.prototype.forEach.call(nav.querySelectorAll('a'), function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !nav.hidden) {
      closeNav();
      toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 767 && !nav.hidden) {
      closeNav();
    }
  });
})();
