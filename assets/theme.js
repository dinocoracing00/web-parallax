/* Codipsia Milano — theme scripts */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     Parallax
     Any element with [data-parallax] moves relative to its section as
     the page scrolls. data-parallax-speed scales the movement
     (1 = default, negative values move in the opposite direction).
     ------------------------------------------------------------------ */

  function initParallax() {
    if (document.body.classList.contains('no-parallax')) return;

    var strength = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--parallax-strength')
    ) || 0.25;

    var items = [];
    var visible = new Set();
    var ticking = false;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        requestTick();
      },
      { rootMargin: '20% 0px' }
    );

    function collect() {
      items.forEach(function (el) { observer.unobserve(el); });
      visible.clear();
      items = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
      items.forEach(function (el) { observer.observe(el); });
    }

    function update() {
      ticking = false;
      if (reduceMotion.matches) return;

      var vh = window.innerHeight;
      visible.forEach(function (el) {
        var anchor = el.closest('[data-parallax-container]') || el.parentElement;
        var rect = anchor.getBoundingClientRect();
        // -1 when the container's center is at the bottom of the viewport, +1 at the top
        var progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
        var speed = parseFloat(el.getAttribute('data-parallax-speed') || '1');
        var offset = progress * rect.height * strength * speed;
        el.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
      });
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    collect();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    document.addEventListener('shopify:section:load', collect);
    document.addEventListener('shopify:section:unload', function () {
      window.requestAnimationFrame(collect);
    });
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */

  function initReveal() {
    if (!document.body.classList.contains('has-reveal')) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    function collect(root) {
      (root || document).querySelectorAll('[data-reveal]:not(.is-visible)').forEach(function (el) {
        // Inside the theme editor, show everything immediately
        if (window.Shopify && window.Shopify.designMode) el.classList.add('is-visible');
        else observer.observe(el);
      });
    }

    collect();
    document.addEventListener('shopify:section:load', function (event) {
      collect(event.target);
    });
  }

  /* ------------------------------------------------------------------
     Header: solid background once the user scrolls
     ------------------------------------------------------------------ */

  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var drawer = document.querySelector('[data-menu-drawer]');
    if (drawer) {
      drawer.addEventListener('toggle', function () {
        document.body.style.overflow = drawer.open ? 'hidden' : '';
      });
      var close = drawer.querySelector('[data-menu-close]');
      if (close) {
        close.addEventListener('click', function () {
          drawer.open = false;
        });
      }
    }
  }

  /* ------------------------------------------------------------------
     Quantity selectors
     ------------------------------------------------------------------ */

  function initQuantity() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-quantity-change]');
      if (!button) return;
      var input = button.parentElement.querySelector('input');
      var min = parseInt(input.min || '0', 10);
      var next = (parseInt(input.value, 10) || 0) + parseInt(button.getAttribute('data-quantity-change'), 10);
      input.value = Math.max(min, next);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* ------------------------------------------------------------------
     Product variant picker
     ------------------------------------------------------------------ */

  function initProductForms() {
    document.querySelectorAll('[data-product-form]').forEach(function (form) {
      var json = form.querySelector('[data-product-json]');
      if (!json) return;

      var variants = JSON.parse(json.textContent);
      var selects = form.querySelectorAll('[data-option-index]');
      var idInput = form.querySelector('input[name="id"]');
      var button = form.querySelector('[type="submit"]');
      var buttonLabel = button.querySelector('span');
      var priceTarget = document.querySelector(form.getAttribute('data-price-target'));
      var moneyFormat = form.getAttribute('data-money-format');

      function format(cents) {
        var value = (cents / 100).toFixed(2);
        var parts = value.split('.');
        var withSeparators = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + parts[1];
        return moneyFormat
          .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, withSeparators)
          .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/, parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
          .replace(/\{\{\s*amount_no_decimals\s*\}\}/, parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','))
          .replace(/\{\{\s*amount\s*\}\}/, parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1]);
      }

      selects.forEach(function (select) {
        select.addEventListener('change', function () {
          var chosen = Array.prototype.map.call(selects, function (s) { return s.value; });
          var variant = variants.find(function (v) {
            return v.options.every(function (opt, i) { return opt === chosen[i]; });
          });

          if (!variant) {
            button.disabled = true;
            buttonLabel.textContent = 'No disponible';
            return;
          }

          idInput.value = variant.id;
          button.disabled = !variant.available;
          buttonLabel.textContent = variant.available ? 'Añadir a la cesta' : 'Agotado';

          if (priceTarget) {
            var html = '<span>' + format(variant.price) + '</span>';
            if (variant.compare_at_price > variant.price) {
              html += '<s class="price__compare">' + format(variant.compare_at_price) + '</s>';
            }
            priceTarget.innerHTML = html;
          }

          var url = new URL(window.location.href);
          url.searchParams.set('variant', variant.id);
          window.history.replaceState({}, '', url.toString());
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Collection sort
     ------------------------------------------------------------------ */

  function initSort() {
    var select = document.querySelector('[data-sort-by]');
    if (!select) return;
    select.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', select.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    initReveal();
    initHeader();
    initQuantity();
    initProductForms();
    initSort();
  });
})();
