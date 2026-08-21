/* Click-pinned TOC highlight. Mintlify's scrollspy only marks a section
   active once it scrolls to the top, so sections near the page bottom
   never highlight when clicked. This pins the highlight to whatever the
   reader clicked, and hands control back to the scrollspy the moment
   they scroll on their own. */
(function () {
  var pinned = null;

  function links() {
    return Array.prototype.slice.call(
      document.querySelectorAll('.toc-item a[href^="#"]')
    );
  }

  function apply() {
    links().forEach(function (l) {
      if (pinned && l.getAttribute('href') === pinned) {
        l.setAttribute('data-aw-current', 'true');
      } else {
        l.removeAttribute('data-aw-current');
      }
    });
    if (pinned) {
      document.body.setAttribute('data-aw-toc-pinned', 'true');
    } else {
      document.body.removeAttribute('data-aw-toc-pinned');
    }
  }

  document.addEventListener(
    'click',
    function (e) {
      var a = e.target && e.target.closest && e.target.closest('.toc-item a[href^="#"]');
      if (!a) return;
      pinned = a.getAttribute('href');
      apply();
    },
    true
  );

  // A real scroll gesture releases the pin so the scrollspy takes over.
  ['wheel', 'touchmove'].forEach(function (ev) {
    document.addEventListener(
      ev,
      function () {
        if (pinned) {
          pinned = null;
          apply();
        }
      },
      { passive: true }
    );
  });

  // Survive React re-renders and client-side page changes.
  new MutationObserver(function () {
    if (pinned && !document.querySelector('.toc-item a[data-aw-current]')) apply();
  }).observe(document.body, { subtree: true, childList: true });

  // Page navigation drops the pin.
  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      pinned = null;
      apply();
    }
  }, 500);
})();
