/* =========================================================
   Chinmay Pilla — Portfolio
   Vanilla JS: nav, scroll reveal, typing terminal,
   GitHub stats (client-side, optional), mailto contact form.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    var nav = document.getElementById("nav");
    if (!toggle || !links || !nav) return;
    function close() {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 12); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll('#nav-links a[href^="#"]');
    if (!sections.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  function initTerminal() {
    var out = document.getElementById("typed");
    if (!out) return;
    var code = ["#include <iostream>", "", "int main() {", '    std::cout << "Hello, World!";', "    return 0;", "}"].join("\n");
    if (reduceMotion) { out.textContent = code; return; }
    var i = 0;
    (function type() {
      out.textContent = code.slice(0, i);
      i += 1;
      if (i <= code.length) setTimeout(type, 32);
    })();
  }

  function initHeroHeading() {
    var heading = document.querySelector(".hero h1 .grad");
    if (!heading) return;
    heading.style.background = "none";
    heading.style.backgroundImage = "none";
    heading.style.webkitBackgroundClip = "initial";
    heading.style.backgroundClip = "initial";
    heading.style.color = "#ffffff";
    heading.style.webkitTextFillColor = "#ffffff";
  }

  function initCertifications() {
    var main = document.getElementById("main");
    var navLinks = document.getElementById("nav-links");
    var hackathons = document.getElementById("hackathons");
    if (!main || !navLinks || !hackathons || document.getElementById("certifications")) return;
    var navLink = document.createElement("a");
    navLink.href = "#certifications";
    navLink.textContent = "Certifications";
    navLinks.insertBefore(navLink, navLinks.querySelector(".nav__social"));
    var section = document.createElement("section");
    section.className = "section";
    section.id = "certifications";
    section.innerHTML = '<div class="container"><p class="eyebrow reveal">Certifications</p><h2 class="reveal">Learning, verified.</h2><div class="card card--dashed reveal" style="margin-top:2.6rem;text-align:center;padding:3rem 2rem;"><h3>Certifications coming soon.</h3><p class="muted" style="margin-top:.8rem;">I\'m currently working toward certifications in software development, AI/ML and related areas. This section will be updated as I earn them.</p></div></div>';
    main.insertBefore(section, hackathons);
  }

  function initHiveCertificate() {
    var hackathons = document.getElementById("hackathons");
    if (!hackathons || document.getElementById("hive-certificate-modal")) return;
    var cards = hackathons.querySelectorAll(".card");
    var card = null;
    cards.forEach(function (candidate) {
      var title = candidate.querySelector("h3");
      if (title && title.textContent.toLowerCase().indexOf("hive") !== -1) card = candidate;
    });
    if (!card) return;

    var content = document.createElement("div");
    content.className = "hive-card__content";
    while (card.firstChild) content.appendChild(card.firstChild);

    var certificateSrc = "assets/hive-certificate-final.jpg?v=2";
    var preview = document.createElement("button");
    preview.type = "button";
    preview.className = "hive-certificate-preview";
    preview.setAttribute("aria-label", "Open Hive certificate");
    preview.innerHTML = '<span class="hive-certificate-preview__label">Certificate of Achievement</span><span class="hive-certificate-preview__image"><img src="' + certificateSrc + '" alt="The Hive Certificate of Achievement awarded to Pilla Chinmay"></span><span class="hive-certificate-preview__hint">Click to view larger ↗</span>';
    card.classList.add("hive-card");
    card.appendChild(content);
    card.appendChild(preview);

    var style = document.createElement("style");
    style.textContent =
      '.hive-card{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(260px,360px);gap:2.5rem;align-items:center}' +
      '.hive-card__content{min-width:0}' +
      '.hive-certificate-preview{appearance:none;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.025);border-radius:16px;padding:12px;cursor:zoom-in;text-align:center;transition:transform .2s ease,border-color .2s ease,background .2s ease;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;line-height:1}' +
      '.hive-certificate-preview:hover{transform:translateY(-4px);border-color:rgba(255,255,255,.38);background:rgba(255,255,255,.05)}' +
      '.hive-certificate-preview__image{display:block;width:100%;max-width:330px;border-radius:9px;overflow:hidden;flex:none}' +
      '.hive-certificate-preview__image img{display:block;width:100%;height:auto;max-width:100%;border-radius:9px}' +
      '.hive-certificate-preview__label{font-size:.72rem;line-height:1.2;letter-spacing:.12em;text-transform:uppercase;color:var(--muted,#9ca3af)}' +
      '.hive-certificate-preview__hint{font-size:.78rem;line-height:1.2;color:var(--muted,#9ca3af)}' +
      '.hive-certificate-modal{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:28px;background:rgba(3,4,7,.9);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
      '.hive-certificate-modal[hidden]{display:none}' +
      '.hive-certificate-modal__image{display:block;max-width:min(92vw,1100px);max-height:88vh;width:auto;height:auto;object-fit:contain;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.55)}' +
      '.hive-certificate-modal__close{position:absolute;top:18px;right:22px;width:44px;height:44px;border:1px solid rgba(255,255,255,.22);border-radius:50%;background:rgba(0,0,0,.35);color:#fff;font-size:28px;line-height:1;cursor:pointer}' +
      '.hive-certificate-modal__close:hover{background:rgba(255,255,255,.12)}' +
      '@media (max-width:760px){.hive-card{grid-template-columns:1fr!important;gap:1.5rem}.hive-certificate-preview{max-width:430px;margin:0 auto}.hive-certificate-modal{padding:18px}.hive-certificate-modal__image{max-width:94vw;max-height:84vh}}';
    document.head.appendChild(style);

    var modal = document.createElement("div");
    modal.id = "hive-certificate-modal";
    modal.className = "hive-certificate-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Hive Certificate of Achievement");
    modal.innerHTML = '<button type="button" class="hive-certificate-modal__close" aria-label="Close certificate">×</button><img class="hive-certificate-modal__image" src="' + certificateSrc + '" alt="The Hive Certificate of Achievement awarded to Pilla Chinmay">';
    document.body.appendChild(modal);
    var closeButton = modal.querySelector(".hive-certificate-modal__close");
    function openModal() { modal.hidden = false; document.body.style.overflow = "hidden"; closeButton.focus(); }
    function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
    preview.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  }

  function initGitHub() {
    var link = document.getElementById("gh-link");
    var status = document.getElementById("gh-status");
    var stats = document.getElementById("gh-stats");
    if (!link || !status || !stats) return;
    var user = (link.getAttribute("data-username") || "").trim();
    if (!user || user === "YOUR_USERNAME") return;
    link.href = "https://github.com/" + user;
    status.textContent = "Loading public GitHub stats…";
    fetch("https://api.github.com/users/" + encodeURIComponent(user)).then(function (res) {
      if (!res.ok) throw new Error("GitHub request failed");
      return res.json();
    }).then(function (data) {
      document.getElementById("gh-repos").textContent = data.public_repos;
      document.getElementById("gh-followers").textContent = data.followers;
      document.getElementById("gh-since").textContent = new Date(data.created_at).getFullYear();
      stats.hidden = false;
      status.hidden = true;
    }).catch(function () {
      status.textContent = "GitHub stats are unavailable right now — the profile link still works.";
    });
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    var error = document.getElementById("form-error");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        error.textContent = "Please fill in your name, a valid email and a message.";
        error.hidden = false;
        return;
      }
      error.hidden = true;
      var subject = encodeURIComponent("Portfolio contact — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:chinmaypilla001yt@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCertifications();
    initHiveCertificate();
    initReveal();
    initScrollSpy();
    initTerminal();
    initHeroHeading();
    initGitHub();
    initForm();
    initYear();
  });
})();
