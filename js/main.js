(function () {
  "use strict";

  /* nav scroll state */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile toggle */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* stat counters */
  var counted = false;
  function runCounters() {
    if (counted) return;
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    counted = true;
    els.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var start = null;
      var dur = 1400;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll(
    ".section-head, .compare-col, .callout, .gate, .panel, .phone-points li, .phone-note, .product, .matrix-note, .fde-step, .fde-scenes, .cta-card"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
            var b = en.target.querySelector("b[data-count]");
            if (b || en.target.hasAttribute("data-count")) runCounters();
          }
        });
      },
      { threshold: 0.16 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
    var heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
      var io2 = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { runCounters(); io2.disconnect(); }
          });
        },
        { threshold: 0.4 }
      );
      io2.observe(heroStats);
    }
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
    runCounters();
  }
})();
