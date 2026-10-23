/* SALU Community: live content from a Google Sheet.
   Reads the tabs Announcements, MeritLists, Fees, Scholarships and Results.
   If the sheet is empty or cannot be reached, the lists in data.js are used instead. */
(function () {
  "use strict";
  if (typeof SHEET_ID === "undefined" || !SHEET_ID) return;
  var KEY = "salu_sheet_v1";
  var TABS = { ANNOUNCE: "Announcements", MERITS: "MeritLists", FEES: "Fees", SCHOLARSHIPS: "Scholarships", RESULTS: "Results" };
  var TARGET = { ANNOUNCE: ANNOUNCE, MERITS: MERITS, FEES: FEES, SCHOLARSHIPS: SCHOLARSHIPS, RESULTS: RESULTS };

  function esc(t) { return String(t == null ? "" : t).trim().replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* Turns a normal Google Drive share link into a direct Download PDF link */
  function fix(u) {
    u = String(u || "").trim(); if (!u) return "";
    var m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{10,})/) || u.match(/drive\.google\.com\/[^\s]*[?&]id=([\w-]{10,})/);
    if (m) return "https://drive.google.com/uc?export=download&id=" + m[1];
    var d = u.match(/docs\.google\.com\/document\/d\/([\w-]{10,})/);
    if (d) return "https://docs.google.com/document/d/" + d[1] + "/export?format=pdf";
    if (/^https?:\/\//i.test(u) || /^[\w.\/-]+\.pdf$/i.test(u) || u.charAt(0) === "#") return u;
    return "https://" + u;
  }
  function csv(t) {
    var rows = [], row = [], c = "", q = false, i, ch;
    for (i = 0; i < t.length; i++) {
      ch = t[i];
      if (q) { if (ch === '"') { if (t[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; }
      else if (ch === '"') q = true;
      else if (ch === ",") { row.push(c); c = ""; }
      else if (ch === "\n" || ch === "\r") { if (ch === "\r" && t[i + 1] === "\n") i++; row.push(c); rows.push(row); row = []; c = ""; }
      else c += ch;
    }
    if (c !== "" || row.length) { row.push(c); rows.push(row); }
    return rows;
  }
  var MAP = {
    ANNOUNCE: [function (r) { return r[1] && r[1].trim(); }, function (r) { return { d: esc(r[0]), t: esc(r[1]), b: esc(r[2]), pdf: fix(r[3]) }; }],
    MERITS: [function (r) { return r[0] && r[0].trim(); }, function (r) { return { t: esc(r[0]), d: esc(r[1]), u: fix(r[2]) || "https://salu.edu.pk/", pdf: fix(r[3]) }; }],
    FEES: [function (r) { return r[0] && r[0].trim(); }, function (r) { return { d: esc(r[0]), f: esc(r[1]) }; }],
    SCHOLARSHIPS: [function (r) { return r[0] && r[0].trim(); }, function (r) { return { n: esc(r[0]), f: esc(r[1]) }; }],
    RESULTS: [function (r) { return r[0] && r[0].trim(); }, function (r) { return { name: esc(r[0]), id: esc(r[1]), marks: esc(r[2]), city: esc(r[3]), test: esc(r[4]) }; }]
  };
  function apply(data) {
    var changed = false;
    Object.keys(data).forEach(function (k) {
      var rows = data[k]; if (!rows || !rows.length || !TARGET[k]) return;
      TARGET[k].length = 0; Array.prototype.push.apply(TARGET[k], rows); changed = true;
    });
    if (changed && window.renderLive) window.renderLive();
  }
  function load(key) {
    var url = "https://docs.google.com/spreadsheets/d/" + encodeURIComponent(SHEET_ID) + "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent(TABS[key]);
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    }).then(function (t) {
      if (/^\s*</.test(t)) throw new Error("sheet is not public");
      var rows = csv(t); rows.shift();
      return rows.filter(MAP[key][0]).map(MAP[key][1]);
    });
  }
  function note(lines) {
    var d = document.createElement("div");
    d.style.cssText = "position:fixed;left:12px;right:12px;top:12px;z-index:999;background:#061e47;color:#fff;border-radius:14px;padding:14px 16px;font:14px/1.6 sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35)";
    d.innerHTML = "<b>Sheet check</b><br>" + lines.join("<br>") + '<br><small>Tap to close</small>';
    d.onclick = function () { d.remove(); }; document.body.appendChild(d);
  }
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved) apply(saved); } catch (e) {}
  var out = {}, report = [], keys = Object.keys(TABS), left = keys.length;
  keys.forEach(function (k) {
    load(k).then(function (rows) { out[k] = rows; report.push(TABS[k] + ": " + rows.length + " rows OK"); })
      .catch(function (e) { report.push(TABS[k] + ": FAILED (" + e.message + ")"); })
      .then(function () {
        if (--left) return;
        apply(out);
        try { localStorage.setItem(KEY, JSON.stringify(out)); } catch (e) {}
        if (/[?&]sheet=check/.test(location.search)) note(report);
      });
  });
})();
