/* SALU Community app: install banner + service worker.
   The banner shows every time the website is opened in a browser.
   It is hidden only inside the installed app itself. */
(function () {
  "use strict";
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
  var standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if (standalone) return;

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var deferred = window.__bip || null, bar = null, steps = false, installed = false;

  var css = ".pwa-bar{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:200;max-width:560px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:18px;color:#fff;background:linear-gradient(135deg,#061e47,#0f3f96 60%,#1d64df);border:1.5px solid rgba(255,255,255,.28);box-shadow:0 16px 40px rgba(6,30,71,.35);animation:pwaUp .5s cubic-bezier(.22,1,.36,1) both}" +
    ".pwa-bar img{width:46px;height:46px;border-radius:12px;flex-shrink:0;background:#fff}" +
    ".pwa-txt{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.pwa-txt b{font-size:15px}.pwa-txt span{font-size:12.5px;line-height:1.4;opacity:.9}" +
    ".pwa-act{display:flex;flex-direction:column;gap:6px;flex-shrink:0}.pwa-act button{font:inherit;font-weight:700;font-size:13px;border-radius:10px;padding:8px 14px;cursor:pointer;border:1.5px solid rgba(255,255,255,.45);background:transparent;color:#fff}" +
    ".pwa-act .pwa-go{background:#fff;color:#0f3f96;border-color:#fff}.pwa-act .pwa-go[hidden]{display:none}" +
    "body.pwa-pad{padding-bottom:110px}.pwa-bar.out{animation:pwaDown .3s ease both}" +
    "@keyframes pwaUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes pwaDown{to{opacity:0;transform:translateY(24px)}}" +
    "@media(prefers-reduced-motion:reduce){.pwa-bar,.pwa-bar.out{animation:none}}";

  function message() {
    if (installed) return "The SALU Community app is already installed on this phone. Open it from your home screen for the full app experience.";
    if (!steps) return "Get merit lists, fees and past papers one tap away, right from your home screen.";
    if (ios) return "On iPhone, tap the Share button, then Add to Home Screen.";
    return "Tap the browser menu (three dots), then Install app or Add to Home screen. Already installed? Open it from your home screen.";
  }
  function render() {
    if (!bar) return;
    var go = bar.querySelector(".pwa-go");
    bar.querySelector(".pwa-txt span").textContent = message();
    go.hidden = installed;
    bar.querySelector(".pwa-no").textContent = installed ? "OK" : "Not now";
    go.textContent = steps ? "Got it" : "Install";
  }
  function hide() {
    if (!bar) return;
    var b = bar; bar = null;
    b.classList.add("out");
    document.body.classList.remove("pwa-pad");
    setTimeout(function () { b.remove(); }, 320);
  }
  function build() {
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    bar = document.createElement("div");
    bar.className = "pwa-bar"; bar.setAttribute("role", "dialog"); bar.setAttribute("aria-label", "Install SALU Community app");
    bar.innerHTML = '<img src="icon-192.png" alt="" width="46" height="46"><div class="pwa-txt"><b>Install SALU Community App</b><span></span></div>' +
      '<div class="pwa-act"><button type="button" class="pwa-go">Install</button><button type="button" class="pwa-no">Not now</button></div>';
    document.body.appendChild(bar);
    document.body.classList.add("pwa-pad");
    bar.querySelector(".pwa-no").addEventListener("click", hide);
    bar.querySelector(".pwa-go").addEventListener("click", function () {
      if (deferred) {
        var p = deferred; deferred = null; window.__bip = null; p.prompt();
        p.userChoice.then(function (r) { if (r && r.outcome === "accepted") hide(); });
        return;
      }
      if (steps) { hide(); return; }
      steps = true; render();
    });
    render();
    if (navigator.getInstalledRelatedApps) {
      navigator.getInstalledRelatedApps().then(function (apps) { if (apps && apps.length) { installed = true; render(); } }).catch(function () {});
    }
  }
  addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; });
  addEventListener("bip-ready", function () { deferred = window.__bip || deferred; });
  addEventListener("appinstalled", function () { deferred = null; hide(); });
  function init() { setTimeout(build, 900); }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", init); else init();
})();
