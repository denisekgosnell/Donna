/* BUILD YOUR OWN DONNA · copy buttons */
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
