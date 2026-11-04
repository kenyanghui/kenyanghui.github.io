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

  /* OS 识别：高亮当前平台的下载行 */
  (function () {
    var ua = navigator.userAgent;
    var cur = null;
    if (/Win/i.test(ua)) cur = "win";
    else if (/Mac/i.test(ua)) cur = "mac-arm";
    else if (/Linux/i.test(ua) && !/Android/i.test(ua)) cur = "linux";
    var hl = document.querySelector('.dl-row[data-os="' + cur + '"]');
    if (hl) hl.classList.add("hl");
  })();

  /* scroll reveal */
  var revealEls = document.querySelectorAll(
    ".section-head, .prod-card, .case-band, .case-note, .case-cta, .industry-grid .ind-card, .gatev, .loop-note, .phone-points li, .phone-strip figure, .fit-card, .pt-card, .contact-split > div, .ws-card, .dl-row, .dl-card, .fde-step, .cta-card"
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

  /* workshop signup modal */
  var SG_URL = "https://dopenclaw.aibay.asia/cl2-ai/signup";
  var mask = document.getElementById("signupMask");
  var sform = document.getElementById("signupForm");
  var sgErr = document.getElementById("sgErr");
  var sgSubmit = document.getElementById("sgSubmit");

  function sgOpen(role) {
    if (!mask) return;
    mask.hidden = false;
    document.body.style.overflow = "hidden";
    var radio = sform.querySelector('input[name="role"][value="' + role + '"]');
    if (radio) radio.checked = true;
    var first = sform.querySelector("input[name=name]");
    if (first) setTimeout(function () { first.focus(); }, 60);
  }
  function sgClose() {
    mask.hidden = true;
    document.body.style.overflow = "";
  }
  function sgFail(msg) {
    sgErr.textContent = msg;
    sgErr.hidden = false;
    sgSubmit.disabled = false;
    sgSubmit.textContent = "提交报名";
  }

  document.getElementById("signupBtn").addEventListener("click", function () { sgOpen("boss"); });
  document.getElementById("signupBtn2").addEventListener("click", function () { sgOpen("partner"); });
  document.getElementById("signupClose").addEventListener("click", sgClose);
  mask.addEventListener("click", function (e) { if (e.target === mask) sgClose(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mask.hidden) sgClose(); });

  sform.addEventListener("submit", function (e) {
    e.preventDefault();
    sgErr.hidden = true;
    var name = sform.elements.name.value.trim();
    var phone = sform.elements.phone.value.trim();
    var roleEl = sform.querySelector('input[name="role"]:checked');
    var scene = sform.elements.scene.value.trim();
    if (name.length < 2) return sgFail("请填写姓名（至少 2 个字）");
    if (!/^1[3-9]\d{9}$/.test(phone)) return sgFail("手机号格式不对（11 位大陆手机号）");
    if (!roleEl) return sgFail("请选择报名身份");
    if (scene.length < 10) return sgFail("场景描述至少 10 个字");

    sgSubmit.disabled = true;
    sgSubmit.textContent = "提交中…";
    fetch(SG_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, phone: phone, role: roleEl.value, scene: scene, src: "aibay-ws" })
    }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.ok) return sgFail((res.d && res.d.error) || "提交失败，请稍后再试");
        sform.hidden = true;
        document.querySelector(".signup-sub").hidden = true;
        var ok = document.createElement("div");
        ok.className = "sg-ok";
        ok.innerHTML = '<div class="sg-ok-ico">✅</div><h4>报名提交成功</h4>'
          + (res.d.dup ? "<p>这个手机号已报过名，我们会尽快联系你。</p>" : "<p>我们会尽快联系你，按场景匹配度录取。</p>")
          + '<p>10 人小班 · 申请制 · 邮件必回</p>';
        document.querySelector(".signup-modal").appendChild(ok);
      })
      .catch(function () { sgFail("网络异常，请稍后再试；或邮件 554176937@qq.com"); });
  });
})();
