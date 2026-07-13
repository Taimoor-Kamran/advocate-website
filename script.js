/* ==========================================================================
   BILLIONS WORKS INTERNATIONAL LAW FIRM — shared JavaScript (vanilla, no dependencies)

   Contents:
     1. Slide-in menu  (hamburger open, X close, nested EXPERIENCE panel)
     2. Search bar toggle
     3. Practice areas dropdown filter  (practice-areas.html only)
     4. Fade-in animations on scroll
     5. Contact form validation  (contact.html only)

   Sections 3 and 5 safely do nothing on pages that lack those elements.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ========================================================================
     1. SLIDE-IN MENU
     ======================================================================== */

  var menu        = document.getElementById('mobileMenu');
  var overlay     = document.getElementById('menuOverlay');
  var menuToggle  = document.querySelector('.menu-toggle');   // hamburger
  var menuClose   = document.querySelector('.menu-close');    // X icon
  var menuPanels  = document.querySelector('.menu-panels');   // panel slider
  var submenuOpen = document.querySelector('.submenu-open');  // "Experience"
  var submenuBack = document.querySelector('.submenu-back');  // "< Back"

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('visible');
    document.body.classList.add('menu-open');       // lock page scroll
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    // Reset to the main panel so the menu reopens in its default state
    menuPanels.classList.remove('show-sub');
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);     // tap outside to close

  // Nested EXPERIENCE submenu: slide to sub panel / back to main panel
  submenuOpen.addEventListener('click', function () {
    menuPanels.classList.add('show-sub');
  });
  submenuBack.addEventListener('click', function () {
    menuPanels.classList.remove('show-sub');
  });

  // Escape key closes the menu (and the search bar, handled below)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeSearch();
    }
  });

  /* ========================================================================
     2. SEARCH BAR TOGGLE
     ======================================================================== */

  var searchBar    = document.getElementById('searchBar');
  var searchToggle = document.querySelector('.search-toggle');
  var searchClose  = document.querySelector('.search-close');
  var searchInput  = searchBar.querySelector('input');

  function openSearch() {
    searchBar.classList.add('open');
    searchToggle.setAttribute('aria-expanded', 'true');
    searchInput.focus();
  }

  function closeSearch() {
    searchBar.classList.remove('open');
    searchToggle.setAttribute('aria-expanded', 'false');
  }

  // The magnifier icon toggles the bar open/closed
  searchToggle.addEventListener('click', function () {
    if (searchBar.classList.contains('open')) closeSearch();
    else openSearch();
  });
  searchClose.addEventListener('click', closeSearch);

  /* ========================================================================
     3. PRACTICE AREAS DROPDOWN FILTER  (practice-areas.html only)
     Filters .practice-item elements by their data-category attribute.
     ======================================================================== */

  var filterToggle   = document.getElementById('filterToggle');
  var filterDropdown = document.getElementById('filterDropdown');
  var filterLabel    = document.getElementById('filterLabel');
  var filterEmpty    = document.getElementById('filterEmpty');

  if (filterToggle && filterDropdown) {

    // Open/close the dropdown
    filterToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = filterDropdown.classList.toggle('open');
      filterToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Clicking anywhere else on the page closes the dropdown
    document.addEventListener('click', function () {
      filterDropdown.classList.remove('open');
      filterToggle.setAttribute('aria-expanded', 'false');
    });

    // Handle a filter choice
    filterDropdown.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.filter;                 // e.g. "litigation"
        var items = document.querySelectorAll('.practice-item');
        var visibleCount = 0;

        // Show items whose data-category matches (or all for "all")
        items.forEach(function (item) {
          var match = (key === 'all') || (item.dataset.category === key);
          item.classList.toggle('hidden', !match);
          if (match) {
            visibleCount++;
            // Re-trigger the fade-in so filtered items animate nicely
            item.classList.add('visible');
          }
        });

        // Show "no results" message if nothing matched
        filterEmpty.hidden = visibleCount > 0;

        // Update the toggle's label + highlight the active option
        filterLabel.textContent = btn.textContent.trim();
        filterDropdown.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });
      });
    });
  }

  /* ========================================================================
     4. FADE-IN ANIMATIONS ON SCROLL
     Adds .visible to each .fade-in element the first time it scrolls
     into view. The animation itself lives in style.css.
     ======================================================================== */

  var faders = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);   // animate once, then stop watching
        }
      });
    }, {
      threshold: 0.12,               // fire when ~12% of the element is visible
      rootMargin: '0px 0px -40px'    // slightly before it fully enters
    });

    faders.forEach(function (el) { observer.observe(el); });
  } else {
    // Very old browser: just show everything
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ========================================================================
     5. CONTACT FORM  (contact.html only — front-end validation)
     No data is sent anywhere. To receive real submissions, connect a
     service such as Formspree or Netlify Forms — see README.md.
     ======================================================================== */

  var form = document.getElementById('contactForm');

  if (form) {
    var status = document.getElementById('formStatus');

    form.addEventListener('submit', function (e) {
      e.preventDefault();   // stop the browser from reloading the page

      var name    = form.querySelector('#name').value.trim();
      var email   = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();

      // Basic checks — adjust wording freely
      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields before sending.';
        status.className = 'form-status error';
        return;
      }

      // Simple email shape check: something@something.something
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status error';
        return;
      }

      // Success (front-end only)
      status.textContent = 'Thank you, ' + name +
        '. Your message has been recorded — we will be in touch shortly.';
      status.className = 'form-status success';
      form.reset();
    });
  }

});
