/* =========================================================
   Chinmay Pilla — Portfolio
   Vanilla JS: nav, scroll reveal, typing terminal,
   GitHub stats (client-side, optional), mailto contact form.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
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

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Active nav link on scroll ---------- */
  function initScrollSpy() {
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll('#nav-links a[href^="#"]');
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Terminal typing animation ---------- */
  function initTerminal() {
    var out = document.getElementById("typed");
    if (!out) return;

    var code = [
      "#include <iostream>",
      "",
      "int main() {",
      '    std::cout << "Hello, World!";',
      "    return 0;",
      "}"
    ].join("\n");

    if (reduceMotion) { out.textContent = code; return; }

    var i = 0;
    (function type() {
      out.textContent = code.slice(0, i);
      i += 1;
      if (i <= code.length) setTimeout(type, 32);
    })();
  }

  /* ---------- GitHub stats (client-side, graceful failure) ---------- */
  function initGitHub() {
    var link = document.getElementById("gh-link");
    var status = document.getElementById("gh-status");
    var stats = document.getElementById("gh-stats");
    if (!link || !status || !stats) return;

    var user = (link.getAttribute("data-username") || "").trim();
    if (!user || user === "YOUR_USERNAME") return; // keep the edit-me hint

    link.href = "https://github.com/" + user;
    status.textContent = "Loading public GitHub stats…";

    fetch("https://api.github.com/users/" + encodeURIComponent(user))
      .then(function (res) {
        if (!res.ok) throw new Error("GitHub request failed");
        return res.json();
      })
      .then(function (data) {
        document.getElementById("gh-repos").textContent = data.public_repos;
        document.getElementById("gh-followers").textContent = data.followers;
        document.getElementById("gh-since").textContent = new Date(data.created_at).getFullYear();
        stats.hidden = false;
        status.hidden = true;
      })
      .catch(function () {
        status.textContent = "GitHub stats are unavailable right now — the profile link still works.";
      });
  }

  /* ---------- Contact form (mailto, no backend) ---------- */
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
      // EDIT: change the address below if your email changes.
      window.location.href =
        "mailto:chinmaypilla001yt@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initScrollSpy();
    initTerminal();
    initGitHub();
    initForm();
    initYear();
  });
})();
