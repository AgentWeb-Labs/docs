/* Click-pinned TOC highlight. Mintlify's scrollspy only marks a section
   active once it scrolls to the top, so bottom-of-page sections never
   highlight when clicked. On click we move Mintlify's own active markers
   (li[data-active]/[data-active-deepest] + a[aria-current]) to the
   clicked entry - native green text and dot, no custom styling - and
   keep them there until the reader scrolls on their own. */
(function () {
  var pinned = null;

  function items() {
    return Array.prototype.slice.call(document.querySelectorAll('li.toc-item'));
  }

  function apply() {
    if (!pinned) return;
    items().forEach(function (li) {
      var a = li.querySelector('a[href^="#"]');
      var isTarget = a && a.getAttribute('href') === pinned;
      if (isTarget) {
        li.setAttribute('data-active', 'true');
        li.setAttribute('data-active-deepest', 'true');
        a.setAttribute('aria-current', 'location');
      } else {
        li.removeAttribute('data-active');
        li.removeAttribute('data-active-deepest');
        if (a) a.removeAttribute('aria-current');
      }
    });
  }

  document.addEventListener(
    'click',
    function (e) {
      var a = e.target && e.target.closest && e.target.closest('li.toc-item a[href^="#"]');
      if (!a) return;
      pinned = a.getAttribute('href');
      apply();
    },
    true
  );

  // A real scroll gesture releases the pin; the scrollspy takes over again.
  ['wheel', 'touchmove'].forEach(function (ev) {
    document.addEventListener(ev, function () { pinned = null; }, { passive: true });
  });

  // Reassert over React re-renders while pinned.
  var scheduling = false;
  new MutationObserver(function () {
    if (!pinned || scheduling) return;
    var target = document.querySelector('li.toc-item a[href="' + (window.CSS && CSS.escape ? CSS.escape(pinned).replace(/\\#/, '#') : pinned) + '"]');
    var li = target && target.closest('li.toc-item');
    if (li && li.getAttribute('data-active-deepest') === 'true') return;
    scheduling = true;
    requestAnimationFrame(function () { scheduling = false; apply(); });
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-active', 'data-active-deepest', 'aria-current'] });

  // Page navigation drops the pin.
  var lastPath = location.pathname;
  setInterval(function () {
    if (location.pathname !== lastPath) { lastPath = location.pathname; pinned = null; }
  }, 500);
})();
