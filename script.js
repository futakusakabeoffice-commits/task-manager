(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('mobile-nav');
  var backdrop = document.querySelector('.mobile-nav-backdrop');
  var reserveBtn = document.querySelector('.mobile-reserve');
  var reservePopover = document.getElementById('mobile-reserve-popover');
  var telReveals = Array.prototype.map.call(document.querySelectorAll('.tel-reveal'), function (wrap) {
    return {
      wrap: wrap,
      trigger: wrap.querySelector('.tel-reveal__trigger'),
      popover: wrap.querySelector('.tel-reveal__popover')
    };
  }).filter(function (item) {
    return item.trigger && item.popover;
  });

  function closeAllTelReveals() {
    telReveals.forEach(function (item) {
      if (item.popover.hidden) return;
      item.popover.hidden = true;
      item.trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function closeReserve() {
    if (!reservePopover || reservePopover.hidden) return;
    reservePopover.hidden = true;
    reserveBtn.setAttribute('aria-expanded', 'false');
  }

  function openReserve() {
    if (!reservePopover) return;
    closeNav();
    closeAllTelReveals();
    reservePopover.hidden = false;
    reserveBtn.setAttribute('aria-expanded', 'true');
  }

  function openNav() {
    if (!nav) return;
    closeReserve();
    closeAllTelReveals();
    nav.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    if (!nav || nav.hidden) return;
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  if (toggle && nav) {
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
  }

  if (reserveBtn && reservePopover) {
    reserveBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      if (reservePopover.hidden) {
        openReserve();
      } else {
        closeReserve();
      }
    });

    document.addEventListener('click', function (event) {
      if (!reservePopover.hidden && !reservePopover.contains(event.target) && event.target !== reserveBtn) {
        closeReserve();
      }
    });
  }

  telReveals.forEach(function (item) {
    item.trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var wasHidden = item.popover.hidden;
      closeNav();
      closeReserve();
      closeAllTelReveals();
      if (wasHidden) {
        item.popover.hidden = false;
        item.trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (telReveals.length) {
    document.addEventListener('click', function (event) {
      telReveals.forEach(function (item) {
        if (!item.popover.hidden && !item.wrap.contains(event.target)) {
          item.popover.hidden = true;
          item.trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (nav && !nav.hidden) {
      closeNav();
      toggle.focus();
      return;
    }
    if (reservePopover && !reservePopover.hidden) {
      closeReserve();
      reserveBtn.focus();
      return;
    }
    telReveals.forEach(function (item) {
      if (!item.popover.hidden) {
        item.popover.hidden = true;
        item.trigger.setAttribute('aria-expanded', 'false');
        item.trigger.focus();
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      closeNav();
      closeReserve();
    }
  });
})();
