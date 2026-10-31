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

  /* copy email button */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "";
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = "已复制 ✓";
        setTimeout(function () { copyBtn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = email; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* scroll reveal */
  var revealEls = document.querySelectorAll(
    ".section-head, .prod-card, .case-band, .case-note, .case-cta, .industry-grid .ind-card, .gatev, .loop-note, .phone-points li, .phone-strip figure, .fit-card, .pt-card, .contact-split > div, .ws-card, .fde-step, .cta-card"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();
