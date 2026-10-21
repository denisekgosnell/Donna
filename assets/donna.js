/* BUILD YOUR OWN DONNA · copy buttons and the velvet rope */
(function () {
  "use strict";

  /* ---------- copy buttons ---------- */

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts (e.g. plain http dry runs)
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- the velvet rope ---------- */
  /* The password lives here and on the "Open the instructions" slide. Change both. */
  var KEY = "donna2026";

  function isUnlocked() {
    var ok = false;
    try { ok = localStorage.getItem("donna-unlocked") === "1"; } catch (e) { /* ignore */ }
    try { ok = ok || /(^|; )donna-unlocked=1/.test(document.cookie); } catch (e) { /* ignore */ }
    return ok || window.__donnaUnlocked === true;
  }
  /* Carry the key on every link inside the site, so the password is typed once even in a
     private window, on a phone that drops storage, or when a link switches between the
     custom domain and the github.io address. */
  function carryKey() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (/^(https?:|mailto:|#|\/\/)/i.test(href)) return;
      if (/[?&]key=/.test(href)) return;
      var hash = "";
      var i = href.indexOf("#");
      if (i >= 0) { hash = href.slice(i); href = href.slice(0, i); }
      a.setAttribute("href", href + (href.indexOf("?") >= 0 ? "&" : "?") + "key=" + KEY + hash);
    });
  }
  function unlock() {
    try { localStorage.setItem("donna-unlocked", "1"); } catch (e) { /* private mode */ }
    try { document.cookie = "donna-unlocked=1; max-age=31536000; path=/; SameSite=Lax"; } catch (e) { /* ignore */ }
    window.__donnaUnlocked = true;
    document.documentElement.classList.remove("locked");
    var g = document.querySelector(".gate");
    if (g && g.parentNode) g.parentNode.removeChild(g);
    carryKey();
  }
  (function gate() {
    var m = location.search.match(/[?&]key=([^&]+)/);
    if (m) {
      var given = "";
      try { given = decodeURIComponent(m[1]); } catch (e) { given = m[1]; }
      if (given.trim().toLowerCase() === KEY) {
        unlock();
        try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) { /* ignore */ }
        return;
      }
    }
    if (isUnlocked()) { document.documentElement.classList.remove("locked"); carryKey(); return; }
    document.documentElement.classList.add("locked");
    var div = document.createElement("div");
    div.className = "gate";
    div.setAttribute("role", "dialog");
    div.setAttribute("aria-label", "Workshop password");
    div.innerHTML =
      '<div class="gate-card">' +
      '<svg class="monogram" width="56" height="56" viewBox="0 0 96 96" fill="none" aria-hidden="true">' +
      '<circle cx="48" cy="48" r="46" stroke="#C9A227" stroke-width="1.5"/>' +
      '<circle cx="48" cy="48" r="40.5" stroke="#C9A227" stroke-width="0.75" opacity="0.55"/>' +
      '<g stroke="#A31621" stroke-width="2.5" stroke-linecap="square"><path d="M37 30v36"/><path d="M31 30h12M31 66h12"/><path d="M43 30a18 18 0 0 1 0 36"/></g></svg>' +
      '<h2>Build Your Own Donna</h2>' +
      '<p>These instructions are for workshop attendees. The password is on the slide and in the Zoom chat.</p>' +
      '<form><input type="password" name="key" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Password" aria-label="Password"><button type="submit">Open</button></form>' +
      '<p class="gate-err" aria-live="polite"></p>' +
      '<p class="gate-foot">Questions &rarr; <a href="mailto:denise@denisegosnell.ai">denise@denisegosnell.ai</a></p>' +
      '</div>';
    document.body.appendChild(div);
    var form = div.querySelector("form");
    var input = div.querySelector("input");
    var err = div.querySelector(".gate-err");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (input.value.trim().toLowerCase() === KEY) { unlock(); return; }
      err.textContent = "Not it. The password is on the slide, and in the Zoom chat.";
      input.select();
    });
    window.setTimeout(function () { try { input.focus(); } catch (e) { /* ignore */ } }, 50);
  })();

  /* ---------- copy buttons ---------- */

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var block = btn.closest(".prompt");
      var pre = block && block.querySelector("pre");
      if (!pre) return;
      copyText(pre.innerText.trim()).then(
        function () {
          var original = btn.textContent;
          btn.textContent = "Copied ✓";
          btn.classList.add("copied");
          window.setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove("copied");
          }, 1800);
        },
        function () {
          var original = btn.textContent;
          btn.textContent = "Press ⌘C / Ctrl+C";
          var range = document.createRange();
          range.selectNodeContents(pre);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          window.setTimeout(function () { btn.textContent = original; }, 4000);
        }
      );
    });
  });

})();
