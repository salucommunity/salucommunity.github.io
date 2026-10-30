
const IS_MULTIPAGE = document.body.dataset.multipage === "1";
const INITIAL_PAGE = document.body.dataset.activePage || "home";
const PAGE_URL = {"home": "./", "announcements": "announcements.html", "admissions": "admissions.html", "merit": "merit-list.html", "departments": "departments.html", "seats": "department-seats.html", "fees": "fee-structure.html", "scholarships": "scholarships.html", "calculator": "aggregate-calculator.html", "entry": "entry-test-preparation.html", "papers": "past-papers.html", "mocktests": "mock-tests.html", "results": "results.html", "guidance": "faqs.html", "about": "about.html", "contact": "contact.html"};
const SEO_META = {"home": {"title": "SALU Community | Admissions 2027, Merit Lists & Past Papers", "desc": "Student guidance for Shah Abdul Latif University, Khairpur: SALU admission 2027, merit list PDFs, past papers, CPN calculator, fees and free mock tests.", "canonical": "https://salucommunity.github.io/"}, "announcements": {"title": "SALU Admission & Merit Updates 2027 | SALU Community", "desc": "Follow SALU admission 2027 updates, merit list announcements, entry test dates and fee submission schedules for Shah Abdul Latif University, Khairpur.", "canonical": "https://salucommunity.github.io/announcements.html"}, "admissions": {"title": "SALU Admission 2027: Process & Eligibility | SALU Community", "desc": "Explore Shah Abdul Latif University admission 2027 guidance: application process, eligibility, required documents, campus options and admission schedule.", "canonical": "https://salucommunity.github.io/admissions.html"}, "merit": {"title": "SALU First Merit List 2027 & PDF Downloads | SALU Community", "desc": "Find SALU first merit list 2027 PDFs for BS Part-I and BS-III Bridging, plus second, third and fourth list schedules and fee submission windows.", "canonical": "https://salucommunity.github.io/merit-list.html"}, "departments": {"title": "SALU Departments & Faculties | SALU Community", "desc": "Explore departments and institutes at Shah Abdul Latif University, Khairpur. Search by program or faculty to plan your SALU admission choices.", "canonical": "https://salucommunity.github.io/departments.html"}, "seats": {"title": "SALU Department Seats & Quotas | SALU Community", "desc": "Check SALU department seat allocations for BS Part-I and BS-III Bridging, including morning merit, self-finance and program-wise seat information.", "canonical": "https://salucommunity.github.io/department-seats.html"}, "fees": {"title": "SALU Fee Structure 2026–2027 | SALU Community", "desc": "Compare SALU fee information for BS, Pharm-D, LLB and BS-III Bridging programs, with merit, self-finance, hostel and application processing fees.", "canonical": "https://salucommunity.github.io/fee-structure.html"}, "scholarships": {"title": "SALU Scholarships & Financial Aid | SALU Community", "desc": "Explore scholarships and financial aid listed for SALU students, including HEC need-based support, SEEF, tuition freeships, bursaries and other aid.", "canonical": "https://salucommunity.github.io/scholarships.html"}, "calculator": {"title": "SALU Aggregate Calculator (CPN) | SALU Community", "desc": "Use the SALU aggregate calculator to estimate your CPN for admission. Enter entry test or USAT and academic marks for BS-I or BS-III Bridging.", "canonical": "https://salucommunity.github.io/aggregate-calculator.html"}, "entry": {"title": "SALU Entry Test Preparation & Pattern | SALU Community", "desc": "Prepare for the SALU entry test with guidance on the 50-MCQ pattern, subject coverage, passing criteria and OMR rules, plus past papers and mock tests.", "canonical": "https://salucommunity.github.io/entry-test-preparation.html"}, "papers": {"title": "SALU Past Papers PDF & Solved MCQs | SALU Community", "desc": "Download SALU entry test past papers PDF, review solved MCQs from the available archive and practise with interactive quizzes and a 2027 preparation paper.", "canonical": "https://salucommunity.github.io/past-papers.html"}, "mocktests": {"title": "SALU Free Mock Tests & MCQ Practice | SALU Community", "desc": "Practise SALU entry test MCQs with free mock tests, instant scoring and answer feedback. Find community registration information for live practice tests.", "canonical": "https://salucommunity.github.io/mock-tests.html"}, "results": {"title": "SALU Community Mock Test Results | Practice Scores", "desc": "Check SALU Community mock test results and practice scores when published. These community test scores are separate from official university results.", "canonical": "https://salucommunity.github.io/results.html"}, "guidance": {"title": "SALU Admission FAQs & Student Guidance | SALU Community", "desc": "Read SALU student FAQs about admissions, entry tests, aggregate calculation, USAT, LAT, BS-III Bridging, campus programs, hostels and scholarships.", "canonical": "https://salucommunity.github.io/faqs.html"}, "about": {"title": "About SALU Community | Independent Student Guidance", "desc": "Meet the SALU Community team and learn about this independent student initiative supporting Shah Abdul Latif University, Khairpur applicants and students.", "canonical": "https://salucommunity.github.io/about.html"}, "contact": {"title": "Contact SALU Community | Student Guidance & Support", "desc": "Contact SALU Community for student guidance through its listed WhatsApp, phone, email and Facebook channels. Independent support for SALU students.", "canonical": "https://salucommunity.github.io/contact.html"}};

const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-10.5z"/></svg>',
  announcements: '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  admissions: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  merit: '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  seats: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
  fees: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  scholarships: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
  papers: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  calculator: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>',
  departments: '<svg viewBox="0 0 24 24"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
  entry: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  mocktests: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>',
  results: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>',
  guidance: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  about: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  contact: '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
};

const VIEWS = [
  ["home", "Home"],
  ["announcements", "Announcements"],
  ["admissions", "Admissions"],
  ["merit", "Merit Lists"],
  ["seats", "Department Seats"],
  ["fees", "Fee Structure"],
  ["scholarships", "Scholarships"],
  ["papers", "Past Papers"],
  ["calculator", "Aggregate Calculator"],
  ["departments", "Departments"],
  ["entry", "Entry Test Prep"],
  ["mocktests", "Free Mock Tests"],
  ["results", "Results"],
  ["guidance", "FAQs / Guidance"],
  ["about", "About Us"],
  ["contact", "Contact"]
];

const N = Object.fromEntries(VIEWS);
const GROUPS = [
  ["Main", ["home", "announcements"]],
  ["Admissions", ["admissions", "merit", "seats", "fees", "scholarships"]],
  ["Academics", ["departments", "calculator"]],
  ["Test Preparation", ["entry", "papers", "mocktests", "results"]],
  ["Support", ["guidance", "about", "contact"]]
];

const L = id => PAGE_URL[id] || ("#" + id);
const DUMMY = document.createElement("div");
const $ = s => document.querySelector(s) || DUMMY;

$("#panel").innerHTML = GROUPS.map(g => `<h4>${g[0]}</h4><div class="pg">${g[1].map(id => `<a href="${L(id)}" data-v="${id}">${ICONS[id] || ""}<span>${N[id]}</span></a>`).join("")}</div>`).join("");

function closeMenu() {
  $("#panel").classList.remove("open");
  $("#menuBtn").setAttribute("aria-expanded", "false");
  $("#menuBtn span").textContent = "Categories";
}
$("#menuBtn").onclick = () => {
  const o = $("#panel").classList.toggle("open");
  $("#menuBtn").setAttribute("aria-expanded", o);
  $("#menuBtn span").textContent = o ? "Close" : "Categories";
};
addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

/* Home Category Cards */
const TILES = [
  ["admissions", "Admissions", "Schedule, how to apply, required documents, eligibility & hostels."],
  ["merit", "Merit Lists", "1st, 2nd, 3rd & 4th merit list schedules and updates."],
  ["announcements", "Announcements", "Latest admission deadlines and entry test announcements."],
  ["seats", "Department Seats", "Morning Merit, Self-Finance, BS-III & reserved quota seats."],
  ["fees", "Fee Structure", "Annual Merit and Self-Finance fees across all faculties."],
  ["scholarships", "Scholarships", "HEC Need-Based, Ehsaas, SEEF, Freeships & financial aid."],
  ["papers", "Past Papers", "Solved past papers (2015–2027), PDFs & 555-MCQ online quiz."],
  ["calculator", "Aggregate Calculator", "Calculate your CPN (50% Test + 30% Inter + 20% Matric)."],
  ["departments", "Departments", "All 28 departments & institutes across 7 faculties."],
  ["entry", "Entry Test Prep", "50-MCQ test pattern, subject breakup & OMR rules."],
  ["mocktests", "Free Mock Tests", "Practice interactive MCQs and register for live mock tests."],
  ["results", "Results", "Check scores from SALU Community practice tests."],
  ["guidance", "FAQs / Guidance", "Common student questions on admissions, tests & rules."]
];
const TC = ["#059669","#3b82f6","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#f97316","#6366f1","#0ea5e9","#22c55e","#ef4444","#a855f7","#eab308"];
$("#tiles").innerHTML = TILES.map((t, i) => `<a class="tile" href="${L(t[0])}" style="--ic:${TC[i % TC.length]}"><span class="tile-icon" aria-hidden="true">${ICONS[t[0]]}</span><h3>${t[1]}</h3><p>${t[2]}</p><span class="tile-view">View <span aria-hidden="true">→</span></span></a>`).join("");

/* Departments */
let curFac = "all";
function renderDepts() {
  const q = ($("#deptSearch").value || "").toLowerCase().trim();
  const list = DEPTS.filter(d => (curFac === "all" || d.f === curFac) && (!q || d.n.toLowerCase().includes(q) || d.f.toLowerCase().includes(q)));
  $("#deptGrid").innerHTML = list.length ? list.map(d => `
    <div class="card">
      <span class="pill">${d.f}</span>
      <h3>${d.n}</h3>
    </div>
  `).join("") : `<div class="empty" style="grid-column:1/-1">No matching department found.</div>`;
}
renderDepts();
$("#deptSearch").oninput = renderDepts;
document.querySelectorAll("#facFilter button").forEach(b => b.onclick = () => {
  curFac = b.dataset.f;
  document.querySelectorAll("#facFilter button").forEach(x => x.classList.toggle("on", x === b));
  renderDepts();
});

/* Department Seats Table */
$("#seatBox").innerHTML = `
  <table>
    <thead><tr><th>Faculty</th><th>Department / Program</th><th>BS-I Merit</th><th>BS-I Self-Finance</th><th>BS-III Merit</th><th>BS-III Self-Finance</th></tr></thead>
    <tbody>
      ${SEATS.map(r => `<tr><td>${r[0]}</td><td><b>${r[1]}</b></td><td><b>${r[2]}</b></td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join("")}
    </tbody>
  </table>
`;

function renderLive() {
  $("#meritList").innerHTML = MERITS.map(m => `<a class="tile" href="${m.pdf || m.u}" target="_blank" rel="noopener noreferrer"><span class="pill">${m.pdf ? "MERIT LIST PDF" : "MERIT SCHEDULE"}</span><h3>${m.t}</h3><p>${m.d}</p><span class="tile-view">${m.pdf ? "Download PDF" : "Open details"} <span aria-hidden="true">→</span></span></a>`).join("");
  $("#annList").innerHTML = ANNOUNCE.map(a => `<div class="ann"><time>${a.d}</time><h3>${a.t}</h3><p>${a.b}</p>${a.pdf ? `<a class="btn" style="margin-top:12px" href="${a.pdf}" target="_blank" rel="noopener noreferrer">Download PDF</a>` : ""}</div>`).join("");
  $("#feeList").innerHTML = FEES.map(x => `<div class="card"><h3>${x.d}</h3><p>${x.f}</p></div>`).join("");
  $("#schList").innerHTML = SCHOLARSHIPS.map(x => `<div class="card"><h3>${x.n}</h3><p>${x.f}</p></div>`).join("");
  $("#paperList").innerHTML = PAPERS.map((x, idx) => {
    const pid = idx === 1 ? "salu-2027" : idx === 2 ? "salu-2026" : "salu-2024";
    return `<a class="tile" href="${L('papers')}#${pid}" data-open-paper="${pid}"><span class="pill">PAST PAPERS</span><h3>${x.t}</h3><p>${x.d}</p><span class="tile-view">Open Past Papers <span aria-hidden="true">→</span></span></a>`;
  }).join("");
  $("#resultsBox").innerHTML = RESULTS.length
    ? `<table><tr><th>Name</th><th>Test ID</th><th>Marks</th><th>City</th><th>Test</th></tr>${RESULTS.map(r => `<tr><td>${r.name}</td><td>${r.id}</td><td>${r.marks}</td><td>${r.city||""}</td><td>${r.test||""}</td></tr>`).join("")}</table>`
    : `<div class="empty">Mock test results will appear here after the next scheduled community test.</div>`;
  if (window.drawTicker) window.drawTicker();
}
renderLive();

/* Interactive Past Papers Viewer & Quiz Engine (2015–2027) */
(function() {
  if (!document.getElementById("interactivePaperPortal")) return;
  const ppList = window.SALU_PAPERS || [];
  if (!ppList.length) return;

  let curPaperId = ppList[ppList.length - 1].id;
  let curPMode = "study";
  const tabsEl = $("#paperYearTabs");
  const modeEl = $("#paperModeSeg");
  const titleEl = $("#activePaperTitle");
  const metaEl = $("#activePaperMeta");
  const pdfBtnsEl = $("#activePaperPdfBtns");
  const qBoxEl = $("#paperQuestionsBox");
  const actionsEl = $("#paperQuizActions");
  const outEl = $("#paperQuizOut");

  function renderPaperPortal() {
    const p = ppList.find(x => x.id === curPaperId) || ppList[0];
    tabsEl.innerHTML = ppList.map(x => `<button type="button" class="${x.id === p.id ? 'on' : ''}" data-pid="${x.id}">${x.y}</button>`).join("");
    titleEl.textContent = `${p.t} (${p.y})`;
    metaEl.textContent = `${p.s} • Date: ${p.d} • ${p.q.length} Solved MCQs • Duration: ${p.m} mins`;
    pdfBtnsEl.innerHTML = `
      ${p.pdf ? `<a class="btn" href="${p.pdf}" target="_blank" rel="noopener noreferrer">Download PDF</a>` : ""}
      ${p.un ? `<a class="btn alt" href="${p.un}" target="_blank" rel="noopener noreferrer">Unsolved PDF</a>` : ""}
    `;
    outEl.innerHTML = "";
    actionsEl.hidden = (curPMode !== "quiz");

    qBoxEl.innerHTML = p.q.map((q, idx) => {
      const rtlAttr = q.r ? ' dir="rtl" style="text-align:right"' : '';
      if (curPMode === "study") {
        return `
          <div class="q"${rtlAttr}>
            <span class="pill">${q.s}</span>
            <p>${idx + 1}. ${q.t}</p>
            ${(q.o || []).map(opt => `<div class="opt ${opt[0] === q.c ? 'ok' : ''}"><b>(${opt[0]})</b> <span>${opt[1]}</span></div>`).join("")}
            ${q.n ? `<p style="margin-top:8px;font-size:13px;color:var(--blue-700)"><b>${q.n}</b></p>` : ""}
          </div>
        `;
      } else {
        return `
          <div class="q"${rtlAttr}>
            <span class="pill">${q.s}</span>
            <p>${idx + 1}. ${q.t}</p>
            ${(q.o || []).map(opt => `<label class="opt"><input type="radio" name="ppq_${idx}" value="${opt[0]}"><span><b>(${opt[0]})</b> ${opt[1]}</span></label>`).join("")}
            <div class="pp-exp" id="ppexp_${idx}" hidden style="margin-top:8px;font-size:13px;color:var(--blue-700)">${q.n || ""}</div>
          </div>
        `;
      }
    }).join("");

    if (curPMode === "quiz") {
      qBoxEl.querySelectorAll("input[type=radio]").forEach(r => {
        r.addEventListener("change", () => {
          qBoxEl.querySelectorAll(`input[name=${r.name}]`).forEach(x => x.parentNode.classList.toggle("sel", x.checked));
        });
      });
    }
  }

  tabsEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-pid]");
    if (!b) return;
    curPaperId = b.dataset.pid;
    renderPaperPortal();
  });

  modeEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-pmode]");
    if (!b) return;
    curPMode = b.dataset.pmode;
    modeEl.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    renderPaperPortal();
  });

  $("#paperResetBtn").onclick = renderPaperPortal;
  $("#paperSubmitBtn").onclick = () => {
    const p = ppList.find(x => x.id === curPaperId) || ppList[0];
    let score = 0;
    p.q.forEach((q, idx) => {
      const checked = qBoxEl.querySelector(`input[name=ppq_${idx}]:checked`);
      qBoxEl.querySelectorAll(`input[name=ppq_${idx}]`).forEach(r => {
        const lbl = r.parentNode;
        if (r.value === q.c) lbl.classList.add("ok");
        else if (r.checked) lbl.classList.add("no");
        r.disabled = true;
      });
      const expEl = document.getElementById(`ppexp_${idx}`);
      if (expEl && q.n) expEl.hidden = false;
      if (checked && checked.value === q.c) score++;
    });
    outEl.innerHTML = `
      <div class="out">
        <p style="font-weight:700;color:var(--blue-900)">Your Score</p>
        <div class="big">${score} / ${p.q.length}</div>
        <p style="margin-top:6px;color:var(--mute)">Correct answers are highlighted above.</p>
      </div>
    `;
  };

  document.addEventListener("click", e => {
    const card = e.target.closest("[data-open-paper]");
    if (!card) return;
    const pid = card.dataset.openPaper;
    if (pid) {
      curPaperId = pid;
      renderPaperPortal();
      if (!IS_MULTIPAGE) {
        e.preventDefault();
        location.hash = "#papers";
        setTimeout(() => $("#interactivePaperPortal").scrollIntoView({ behavior: "smooth" }), 80);
      }
    }
  });

  window.openPastPaperById = function(pid, startQuiz) {
    if (ppList.some(x => x.id === pid)) curPaperId = pid;
    if (startQuiz) {
      curPMode = "quiz";
      modeEl.querySelectorAll("button").forEach(x => x.classList.toggle("on", x.dataset.pmode === "quiz"));
    }
    renderPaperPortal();
  };

  renderPaperPortal();
})();

/* Aggregate Calculator */
let mode = "salu";
const F = {
  salu: [["entry", "SALU Entry Test Marks", 50], ["matric", "Matriculation (SSC) Marks", 1100], ["inter", "Intermediate (HSC-II) Marks", 1100]],
  usat: [["entry", "HEC USAT Score (Min 50/100 required)", 100], ["matric", "Matriculation (SSC) Marks", 1100], ["inter", "Intermediate (HSC-II) Marks", 1100]],
  bs3: [["entry", "BS-III Entry Test Marks", 50], ["ads", "2-Year Bachelor / ADE / ADS Marks (Min 50% required)", 800], ["inter", "Intermediate (HSC-II) Marks", 1100]]
};
function drawFields() {
  $("#calcFields").innerHTML = F[mode].map(f => `
    <div>
      <label for="${f[0]}">${f[1]}</label>
      <div class="row">
        <input id="${f[0]}" type="number" inputmode="decimal" min="0" placeholder="Obtained Marks">
        <input id="${f[0]}T" type="number" inputmode="decimal" min="1" value="${f[2]}" placeholder="Total Marks" aria-label="${f[1]} total">
      </div>
    </div>
  `).join("");
  $("#calcOut").innerHTML = "";
}
document.querySelectorAll("#modeSeg button").forEach(b => b.onclick = () => {
  mode = b.dataset.m;
  document.querySelectorAll("#modeSeg button").forEach(x => x.classList.toggle("on", x === b));
  drawFields();
});
drawFields();

$("#calcBtn").onclick = () => {
  const out = $("#calcOut");
  const W = mode === "bs3" ? {entry: 50, ads: 30, inter: 20} : {entry: 50, matric: 20, inter: 30};
  let agg = 0, entry = 0, entryT = 100, adsPct = 100;
  for (const f of F[mode]) {
    const o = parseFloat($("#" + f[0]).value), t = parseFloat($("#" + f[0] + "T").value);
    if (isNaN(o) || isNaN(t) || t <= 0) {
      out.innerHTML = `<div class="out"><div class="bad">Please enter valid obtained and total marks for ${f[1]}.</div></div>`;
      return;
    }
    if (o > t) {
      out.innerHTML = `<div class="out"><div class="bad">${f[1]}: Obtained marks cannot exceed total marks.</div></div>`;
      return;
    }
    if (f[0] === "entry") { entry = o; entryT = t; }
    if (f[0] === "ads") { adsPct = (o / t) * 100; }
    agg += (o / t) * W[f[0]];
  }
  if (mode === "usat" && (entry / entryT) * 100 < 50) {
    out.innerHTML = `<div class="out"><div class="bad">A minimum score of 50 out of 100 on the HEC USAT is required to qualify for merit consideration.</div></div>`;
    return;
  }
  if (mode !== "usat" && entry < 17) {
    out.innerHTML = `<div class="out"><div class="bad">An entry test score below 17 counts as failed, so no aggregate is calculated.</div></div>`;
    return;
  }
  if (mode === "bs3" && adsPct < 50) {
    out.innerHTML = `<div class="out"><div class="bad">A minimum of 50% marks in your 2-Year Bachelor / ADE degree is required for BS Part-III (Bridging).</div></div>`;
    return;
  }
  out.innerHTML = `
    <div class="out">
      <p style="font-weight:700;color:var(--blue-900)">Your Calculated Aggregate (CPN):</p>
      <div class="big">${agg.toFixed(2)}%</div>
      <p style="margin-top:6px;color:var(--mute);font-size:14px">Weights: <b>${mode === "bs3" ? "Entry Test 50% • ADS/B.Sc. 30% • Intermediate 20%" : "Entry Test / USAT 50% • Intermediate 30% • Matric 20%"}</b>.</p>
    </div>
  `;
};

/* Interactive Mock Test */
function drawQuiz() {
  $("#quiz").innerHTML = QS.map((q, i) => `
    <div class="q">
      <p>${i + 1}. ${q[0]}</p>
      ${q[1].map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}"><span>${o}</span></label>`).join("")}
    </div>
  `).join("");
  $("#quizOut").innerHTML = "";
  document.querySelectorAll("#quiz input[type=radio]").forEach(r => {
    r.addEventListener("change", () => {
      document.querySelectorAll(`input[name=${r.name}]`).forEach(x => x.parentNode.classList.toggle("sel", x.checked));
    });
  });
}
drawQuiz();
$("#quizReset").onclick = drawQuiz;
$("#quizBtn").onclick = () => {
  let s = 0;
  QS.forEach((q, i) => {
    const c = document.querySelector(`input[name=q${i}]:checked`);
    document.querySelectorAll(`input[name=q${i}]`).forEach(r => {
      const l = r.parentNode;
      if (+r.value === q[2]) l.classList.add("ok");
      else if (r.checked) l.classList.add("no");
      r.disabled = true;
    });
    if (c && +c.value === q[2]) s++;
  });
  $("#quizOut").innerHTML = `
    <div class="out">
      <p style="font-weight:700;color:var(--blue-900)">Your Score</p>
      <div class="big">${s} / ${QS.length}</div>
      <p style="margin-top:6px;color:var(--mute)">Correct answers are highlighted above. Click Reset Test to practice again.</p>
    </div>
  `;
};

/* Concise Student FAQs */
$("#faqList").innerHTML = FAQS.map((f, i) => `
  <details class="glass" ${i < 2 ? "open" : ""}>
    <summary>${f[0]}</summary>
    <p>${f[1]}</p>
  </details>
`).join("");

/* Announcements ticker */
(function () {
  const v = $("#tickerView"), tr = $("#tickerTrack");
  if (!v || !tr) return;
  window.drawTicker = function () {
    if (!ANNOUNCE.length) return;
    const items = ANNOUNCE.map(a => `<span class="ticker-item"><b>${a.d}</b>${a.t}</span>`).join("");
    tr.innerHTML = items + items;
    requestAnimationFrame(() => tr.style.setProperty("--dur", Math.max(20, tr.scrollWidth / 2 / 55) + "s"));
  };
  window.drawTicker();
  const toggle = () => { const p = v.classList.toggle("paused"); v.setAttribute("aria-pressed", p); };
  v.addEventListener("click", toggle);
  v.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
})();

/* Social & Form Links */
document.querySelectorAll("[data-link=wa]:not(.ib),[data-link=fb]:not(.ib)").forEach(a => a.querySelector("svg") ? 0 : a.insertAdjacentHTML("afterbegin", (a.dataset.link === "wa"
  ? '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
  : '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>')));

document.querySelectorAll("[data-link]").forEach(a => {
  const kind = a.dataset.link;
  const u = kind === "wa" ? WHATSAPP : kind === "fb" ? FACEBOOK : FORM_URL;
  if (u) {
    a.href = u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  } else {
    a.addEventListener("click", e => {
      e.preventDefault();
      const box = $("#formNotice");
      if (box) {
        box.innerHTML = `<div class="note" style="margin-top:12px">The live mock-test registration form link will be shared in the <a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer"><b>SALU Community WhatsApp Group</b></a> before the next scheduled test.</div>`;
      }
    });
  }
});

/* Background SEO Meta Updater & Router */
function updateSeoForView(viewId) {
  const meta = SEO_META[viewId] || SEO_META.home;
  document.title = meta.title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", meta.desc);
  const canEl = document.querySelector('link[rel="canonical"]');
  if (canEl) canEl.setAttribute("href", meta.canonical);
  const gate = document.getElementById("gateBanner");
  if (gate) gate.hidden = (viewId !== "home");
}

function route() {
  let raw = (location.hash || "").slice(1);
  if (raw === "faqs") raw = "guidance";
  if (raw === "merit-list") raw = "merit";
  if (raw === "department-seats") raw = "seats";
  if (raw === "fee-structure") raw = "fees";
  if (raw === "aggregate-calculator") raw = "calculator";
  if (raw === "entry-test-preparation") raw = "entry";
  if (raw === "past-papers") raw = "papers";
  if (raw === "mock-tests") raw = "mocktests";

  if (raw.startsWith("salu-") || raw.startsWith("start-salu-")) {
    const startQuiz = raw.startsWith("start-");
    const pid = startQuiz ? raw.replace("start-", "") : raw;
    if (window.openPastPaperById) window.openPastPaperById(pid, startQuiz);
    raw = "papers";
  }

  if (IS_MULTIPAGE && raw && raw !== INITIAL_PAGE && PAGE_URL[raw]) {
    location.href = PAGE_URL[raw] + (raw === "papers" && /^(?:start-)?salu-/.test(location.hash.slice(1)) ? location.hash : "");
    return;
  }

  const ok = VIEWS.some(v => v[0] === raw) ? raw : INITIAL_PAGE;
  document.querySelectorAll(".view").forEach(s => s.classList.toggle("on", s.id === "v-" + ok));
  document.querySelectorAll("#panel a").forEach(a => a.classList.toggle("on", a.dataset.v === ok));
  document.querySelectorAll("[data-top]").forEach(a => a.classList.toggle("on", a.dataset.top === ok));
  updateSeoForView(ok);

  const gw = $("#globalSearchWrap"), gq = $("#globalSearchQuick"), gp = $("#globalSearchPanel");
  if (gw) gw.hidden = (ok !== "home");
  if (gq) gq.hidden = true;
  if (gp && !($("#globalSearchInput") && $("#globalSearchInput").value.trim())) gp.hidden = true;
  closeMenu();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
route();

/* Site-Wide Global Search */
(function () {
  const input = $("#globalSearchInput");
  const clearBtn = $("#globalSearchClear");
  const closeBtn = $("#globalSearchClose");
  const panel = $("#globalSearchPanel");
  const listEl = $("#globalSearchList");
  const countEl = $("#globalSearchCount");
  const filtersEl = $("#globalSearchFilters");
  const quickEl = $("#globalSearchQuick");
  const hdrBtn = $("#hdrSearchBtn");
  if (!input || !panel || !listEl) return;

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const stripTags = s => String(s || "").replace(/<[^>]+>/g, " ");

  const ITEMS = [];
  const add = (cat, title, desc, url, viewId, extraActions) => {
    const text = (cat + " " + title + " " + desc).toLowerCase();
    ITEMS.push({ cat, title, desc, url, viewId: viewId || "", extraActions: extraActions || [], text });
  };

  TILES.forEach(t => add(
    t[0] === "admissions" || t[0] === "merit" || t[0] === "announcements" ? "Admissions & Merit" :
    t[0] === "seats" || t[0] === "fees" || t[0] === "departments" || t[0] === "calculator" ? "Departments, Seats & Fees" :
    t[0] === "papers" ? "Past Papers" :
    t[0] === "mocktests" || t[0] === "entry" || t[0] === "results" ? "MCQs" : "Scholarships & FAQs",
    t[1], t[2], L(t[0]), t[0]
  ));
  add("Scholarships & FAQs", "About Us", "Read the story of SALU Community.", L("about"), "about");
  add("Scholarships & FAQs", "Contact", "Phone: 03443482883 • Email: salucommunity@gmail.com", L("contact"), "contact");

  ANNOUNCE.forEach(a => add("Admissions & Merit", a.t + " (" + a.d + ")", a.b, L("announcements"), "announcements"));
  MERITS.forEach(m => add("Admissions & Merit", m.t, m.d, L("merit"), "merit"));
  SEATS.forEach(r => add(
    "Departments, Seats & Fees",
    r[1] + " — Seat Allocation (" + r[0] + ")",
    "BS Part-I Merit: " + r[2] + " seats • BS-I Self-Finance: " + r[3] + " • BS-III Bridging Merit: " + r[4] + " • BS-III Self-Finance: " + r[5] + ".",
    L("seats"), "seats",
    [{ label: "View Department", viewId: "departments", deptQuery: r[1].split("—")[0].trim() }]
  ));
  FEES.forEach(x => add("Departments, Seats & Fees", "Fee Structure: " + x.d, x.f, L("fees"), "fees"));
  SCHOLARSHIPS.forEach(x => add("Scholarships & FAQs", "Scholarship: " + x.n, x.f, L("scholarships"), "scholarships"));
  FAQS.forEach(f => add("Scholarships & FAQs", "FAQ: " + f[0], f[1], L("guidance"), "guidance"));
  QS.forEach((q, i) => add(
    "MCQs",
    "Sample Mock Test Q" + (i + 1) + ": " + q[0],
    "Options: " + q[1].join(" | ") + " • Practice in Mock Test.",
    L("mocktests"), "mocktests"
  ));

  if (window.SALU_PAPERS) {
    try {
      const ppList = window.SALU_PAPERS;
      ppList.forEach(p => {
        const acts = [];
        if (p.pdf) acts.push({ label: "Download PDF", url: p.pdf, ext: true });
        add(
          "Past Papers",
          p.t + " (" + p.y + ")",
          p.s + " • Test Date: " + p.d + " • " + p.q.length + " Solved MCQs • " + p.m + " mins.",
          L("papers"),
          "papers",
          acts
        );
        p.q.forEach((q, qi) => {
          const cleanStem = stripTags(q.t);
          const optsText = (q.o || []).map(o => o[0] + ") " + stripTags(o[1])).join("  ");
          add(
            "MCQs",
            "[" + p.y + " Past Paper Q" + (qi + 1) + "] " + cleanStem,
            optsText,
            L("papers"),
            "papers"
          );
        });
      });
    } catch (e) {}
  }

  let activeCat = "all";
  function hi(text, query) {
    const safe = esc(text);
    if (!query) return safe;
    const words = query.trim().split(/\s+/).filter(w => w.length >= 2).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!words.length) return safe;
    const re = new RegExp("(" + words.join("|") + ")", "gi");
    return safe.replace(re, '<mark class="gs-hl">$1</mark>');
  }

  function runSearch() {
    const raw = input.value.trim();
    const q = raw.toLowerCase();
    clearBtn.hidden = !raw;
    if (!q) {
      panel.hidden = true;
      return;
    }
    panel.hidden = false;
    const words = q.split(/\s+/).filter(Boolean);
    const matches = ITEMS.filter(it => {
      if (activeCat !== "all" && it.cat !== activeCat) return false;
      return words.every(w => it.text.includes(w));
    });

    countEl.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} across website for "${raw}"`;
    const shown = matches.slice(0, 60);
    if (!shown.length) {
      listEl.innerHTML = `<div class="empty">No matching results found for "<b>${esc(raw)}</b>". Try searching a department name, fee, merit list, or past paper year (2015–2027).</div>`;
      return;
    }
    listEl.innerHTML = shown.map(it => `
      <div class="gs-item">
        <div class="gs-top"><span class="gs-cat">${esc(it.cat)}</span></div>
        <div class="gs-title">${hi(it.title, raw)}</div>
        <div class="gs-desc">${hi(it.desc, raw)}</div>
        <div class="gs-act">
          <button type="button" data-goto-view="${esc(it.viewId || 'home')}">Open Section →</button>
          ${(it.extraActions || []).map(a => a.viewId
            ? `<button type="button" class="alt" data-goto-view="${esc(a.viewId)}" data-dept-q="${esc(a.deptQuery || "")}">${esc(a.label)}</button>`
            : `<a class="alt" href="${esc(a.url)}"${a.ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(a.label)}</a>`
          ).join("")}
        </div>
      </div>
    `).join("");
  }

  const wrapEl = $("#globalSearchWrap");
  input.addEventListener("focus", () => { if (quickEl) quickEl.hidden = false; });
  input.addEventListener("click", () => { if (quickEl) quickEl.hidden = false; });
  input.addEventListener("input", runSearch);
  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.hidden = true;
    panel.hidden = true;
    if (quickEl) quickEl.hidden = false;
    input.focus();
  });
  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    if (quickEl) quickEl.hidden = true;
  });

  filtersEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-gcat]");
    if (!b) return;
    activeCat = b.dataset.gcat;
    filtersEl.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    runSearch();
  });

  quickEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-q]");
    if (!b) return;
    input.value = b.dataset.q;
    activeCat = "all";
    filtersEl.querySelectorAll("button").forEach(x => x.classList.toggle("on", x.dataset.gcat === "all"));
    runSearch();
  });

  listEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-goto-view]");
    if (!b) return;
    const v = b.dataset.gotoView;
    const dq = b.dataset.deptQ;
    panel.hidden = true;
    if (IS_MULTIPAGE && v !== INITIAL_PAGE && PAGE_URL[v]) {
      location.href = PAGE_URL[v];
      return;
    }
    location.hash = "#" + v;
    if (dq && $("#deptSearch")) {
      curFac = "all";
      document.querySelectorAll("#facFilter button").forEach(x => x.classList.toggle("on", x.dataset.f === "all"));
      $("#deptSearch").value = dq;
      renderDepts();
    }
  });

  function openSearchBar() {
    if (wrapEl) wrapEl.hidden = false;
    if (quickEl) quickEl.hidden = false;
    input.scrollIntoView({ block: "center" });
    input.focus();
  }
  if (hdrBtn) hdrBtn.addEventListener("click", openSearchBar);
})();
