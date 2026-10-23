/* =====================================================================
   SALU COMMUNITY - CONTENT FILE (data.js)
   To change content, edit ONLY this file. You never need to change index.html.
   Rules: keep every comma, quote and bracket. Each item is one line.
   To ADD an item: copy a line from the same list, paste it right below,
   then change the text. To REMOVE an item: delete its whole line.
   ===================================================================== */

/* ---------- Links and settings ---------- */
const WHATSAPP = "https://chat.whatsapp.com/E7LRPS1suwKEVCOdEUGzYA?s=cl&p=a&mlu=4&ilr=4";
const First Merit List = "https://drive.google.com/file/d/1HWcdbt1rt_5V9e5eKesc5-PBEmcGdhe4/view?usp=drivesdk";
const FORM_URL = "";
const GA_ID = "G-M9S2H2V00W";

/* ---------- Announcements (top bar and Announcements page). Format: {d: "date", t: "title", b: "details", pdf: "PDF link (optional)"}. The newest date shows in the top bar. ---------- */
const ANNOUNCE = [
  {d: "20 Aug – 22 Sep 2026", t: "Online Admission Forms Open (Main, Ghotki & Shahdad Kot Campuses)", b: "Apply online at www.salu.edu.pk for BS Part-I, Pharm-D, LLB, and BS Part-III (Bridging). Admission processing fee is Rs. 2,500/- via HBL Konnect."},
  {d: "13 October 2026", t: "Pre-Entry Test for Bachelor (BS-I) & BS-III (Bridging)", b: "The Pre-Entry Test (50 MCQs) will be conducted on Tuesday, 13 October 2026 across Main Campus, Ghotki Campus, and Shahdad Kot Campus."},
  {d: "23 Oct – 21 Dec 2026", t: "Merit Lists Display & Fee Submission Schedule", b: "1st Merit List: 23 Oct – 5 Nov 2026 | BS-III 2nd List: 6 – 8 Nov | BS-I 2nd List: 11 – 19 Nov | 3rd List: 25 Nov – 3 Dec | 4th List (Self-Finance & Quotas): 15 – 21 Dec 2026."},
  {d: "4 – 5 January 2027", t: "Orientation Day & Start of BS Part-I Classes", b: "Orientation Day for fresh BS Part-I batches will be held on Monday, 4 January 2027, and regular classes commence on Tuesday, 5 January 2027."}
];

/* ---------- Merit Lists. Format: {t: "title", d: "date", u: "page link", pdf: "PDF link (optional, shows a Download PDF button)"} ---------- */
const MERITS = [
  {t: "1st Merit List (BS Part-I & BS Part-III Bridging)", d: "Display & Fee Window: 23 October to 5 November 2026 (Main, Ghotki & Shahdad Kot Campuses)", u: "https://salu.edu.pk/"},
  {t: "2nd Merit List (BS Part-III Bridging)", d: "Display & Fee Window: 6 November to 8 November 2026 (Classes start 9 November 2026)", u: "https://salu.edu.pk/"},
  {t: "2nd Merit List (BS Part-I)", d: "Display & Fee Window: 11 November to 19 November 2026", u: "https://salu.edu.pk/"},
  {t: "3rd Merit List (BS Part-I)", d: "Display & Fee Window: 25 November to 3 December 2026", u: "https://salu.edu.pk/"},
  {t: "4th Merit List (Self-Finance & All Quotas)", d: "Display & Fee Window: 15 December to 21 December 2026", u: "https://salu.edu.pk/"}
];

/* ---------- Fee Structure ---------- */
const FEES = [
  {d: "Biochemistry, Botany & Microbiology", f: "Merit: Rs. 23,768/yr (Part-I) • Self-Finance: Rs. 43,926/yr | BS-III Bridging: Rs. 25,781 (M) / Rs. 47,120 (SF)"},
  {d: "Chemistry & Zoology", f: "Merit: Rs. 43,926/yr (Part-I) • Self-Finance: Rs. 71,493/yr | BS-III Bridging: Rs. 46,321 (M) / Rs. 83,280 (SF)"},
  {d: "Doctor of Pharmacy (Pharm-D 5-Year)", f: "Part-I Merit: Rs. 91,593/yr • Part-II to V Merit: Rs. 80,076/yr"},
  {d: "Computer Science (BS CS, BS IT & BS SE)", f: "Merit: Rs. 80,715/yr • Self-Finance: Rs. 113,670/yr"},
  {d: "Archaeology, Geography & Statistics", f: "Merit: Rs. 23,768/yr • Self-Finance: Rs. 43,926/yr | BS-III Bridging: Rs. 25,781 (M) / Rs. 47,120 (SF)"},
  {d: "Physics & Electronics and Mathematics", f: "Merit: Rs. 43,926/yr • Self-Finance: Rs. 71,494/yr | BS-III Bridging: Rs. 44,507 (M) / Rs. 84,079 (SF)"},
  {d: "Social Sciences (Economics, IR, PCS, Islamic St., Media, Pak St., Pol Sci, Sociology, Gender St.)", f: "Merit: Rs. 23,162/yr • Self-Finance: Rs. 42,743/yr | BS-III Bridging: Rs. 24,568 (M) / Rs. 44,725 (SF)"},
  {d: "Business Administration (BBA & BS Accounting & Finance)", f: "Part-I Merit: Rs. 62,919/yr • Self-Finance: Rs. 112,352/yr | Part-II–IV: Rs. 67,085 (M) / Rs. 112,165 (SF)"},
  {d: "MBA (2-Year Evening)", f: "Part-I: Rs. 81,214 (Merit) / Rs. 115,864 (SF) • Part-II: Rs. 61,909 (Merit) / Rs. 115,864 (SF)"},
  {d: "Commerce, Banking & Finance, and Public Administration", f: "Merit: Rs. 35,557/yr • Self-Finance: Rs. 67,500/yr | BS-III Bridging: Rs. 33,161 (M) / Rs. 61,910 (SF)"},
  {d: "English Language & Literature", f: "Merit: Rs. 45,938/yr • Self-Finance: Rs. 74,687/yr | BS-III Bridging: Rs. 47,121 (M) / Rs. 86,666 (SF)"},
  {d: "Sindhi & Urdu", f: "Merit: Rs. 23,162/yr • Self-Finance: Rs. 42,700/yr | BS-III Bridging: Rs. 24,567 (M) / Rs. 44,659 (SF)"},
  {d: "Teachers Education (B.Ed. Hons) & Special Education", f: "Part-I: Rs. 56,329 (Merit) / Rs. 69,638 (SF) • Part-II–IV: Rs. 49,923 (Merit) / Rs. 64,323 (SF)"},
  {d: "SZAB School of Law (LLB 4-Year)", f: "Part-I Merit: Rs. 110,096/yr • Part-II to IV Merit: Rs. 66,756/yr"},
  {d: "Hostel & Application Fees", f: "Application Processing Fee: Rs. 2,500/- • Hostel Accommodation Fee: Rs. 14,000/- per annum"}
];

/* ---------- Scholarships ---------- */
const SCHOLARSHIPS = [
  {n: "University Tuition Freeships & Bursaries", f: "Full/half tuition freeships for 10% of enrolled students and bursaries for 2.5% of enrolled students in each department."},
  {n: "HEC Need-Based & Ehsaas Undergraduate Scholarships", f: "Covers full tuition fee and a monthly stipend for deserving undergraduate students."},
  {n: "Sindh Educational Endowment Fund (SEEF)", f: "Government of Sindh scholarship for meritorious and deserving students domiciled in Sindh."},
  {n: "Quaid-e-Azam & Ministry of Education Merit Scholarships", f: "Awarded to top position holders for higher studies."},
  {n: "JICA (Japan) & German Need-Based Scholarships", f: "International need-based financial assistance offered through HEC and SALU."},
  {n: "District Zakat, Mora & Zila Council Scholarships", f: "Awarded by District Zakat Committees and Zila Councils to deserving students."},
  {n: "Bhittai, LU Biscuits, PEF, Diya Pakistan & Bait-ul-Mal Aid", f: "Philanthropic scholarships, Pakistan Bait-ul-Mal grants, and NBP interest-free student loans (Qarz-e-Husna)."}
];

/* ---------- Past Papers links on the home page ---------- */
const PAPERS = [
  {t: "All Past Papers & Interactive Quiz Portal (2015–2027)", d: "Browse all 12 SALU entry test papers, download solved/unsolved PDFs, and practice 555 MCQs with timer and instant grading.", u: "https://salucommunity.github.io/past-papers"},
  {t: "SALU Pre-Entry Test 2027 (Preparation Paper)", d: "50 solved MCQs across English, Biology, Chemistry, Physics, Math, GK, Islamiat, Sindhi & Urdu.", u: "https://salucommunity.github.io/past-papers#salu-2027"},
  {t: "SALU Pre-Entry Test 2026 & 2025 Past Papers", d: "Solved pre-entry test papers with detailed explanations and downloadable PDFs.", u: "https://salucommunity.github.io/past-papers#salu-2026"},
  {t: "SALU Entry Test Past Papers (2015–2024)", d: "Complete archive of solved SALU entry test papers from 2015, 2016, 2017, 2018, 2019, 2020, 2022, 2023 & 2024.", u: "https://salucommunity.github.io/past-papers#salu-2024"}
];

/* ---------- Mock Test Results. Format: {name: "", id: "", marks: "", city: "", test: ""} ---------- */
const RESULTS = [];

/* ---------- Department list ---------- */
const DEPTS = [
  {f: "Natural Sciences", n: "Department of Biochemistry"},
  {f: "Natural Sciences", n: "Department of Botany"},
  {f: "Natural Sciences", n: "Institute of Chemistry"},
  {f: "Natural Sciences", n: "Institute of Microbiology"},
  {f: "Natural Sciences", n: "Department of Pharmacy (Pharm-D)"},
  {f: "Natural Sciences", n: "Department of Zoology"},
  {f: "Physical Sciences", n: "Department of Archaeology"},
  {f: "Physical Sciences", n: "Institute of Computer Science (BS CS, BS IT & BS SE)"},
  {f: "Physical Sciences", n: "Department of Geography"},
  {f: "Physical Sciences", n: "Department of Mathematics"},
  {f: "Physical Sciences", n: "Department of Physics & Electronics"},
  {f: "Physical Sciences", n: "Department of Statistics"},
  {f: "Social Sciences", n: "Department of Economics"},
  {f: "Social Sciences", n: "Institute of International Relations & Peace Studies"},
  {f: "Social Sciences", n: "Institute of Islamic Studies"},
  {f: "Social Sciences", n: "Department of Media & Communication Studies"},
  {f: "Social Sciences", n: "Department of Pakistan Studies"},
  {f: "Social Sciences", n: "Department of Political Science"},
  {f: "Social Sciences", n: "Department of Sociology & Gender Studies"},
  {f: "Management Sciences", n: "Institute of Business Administration (BBA, BS A&F, MBA)"},
  {f: "Management Sciences", n: "Institute of Commerce & Management"},
  {f: "Management Sciences", n: "Department of Public Administration"},
  {f: "Arts & Languages", n: "Institute of English Language & Literature"},
  {f: "Arts & Languages", n: "Department of Sindhi"},
  {f: "Arts & Languages", n: "Department of Urdu"},
  {f: "Education", n: "Department of Teachers Education (B.Ed. Hons)"},
  {f: "Education", n: "Department of Special Education"},
  {f: "Law", n: "Shaheed Zulfiqar Ali Bhutto (SZAB) School of Law (LLB)"}
];

/* ---------- Department seats ---------- */
const SEATS = [
  ["Natural Sciences", "Biochemistry", 65, 10, 25, 15],
  ["Natural Sciences", "Botany", 80, 10, 40, 20],
  ["Natural Sciences", "Chemistry", 100, 10, 40, 20],
  ["Natural Sciences", "Microbiology", 80, 10, 25, "—"],
  ["Natural Sciences", "Pharmacy (Pharm-D)", 50, "—", "—", "—"],
  ["Natural Sciences", "Zoology", 90, 10, 40, 20],
  ["Physical Sciences", "Archaeology", 30, 20, 20, 10],
  ["Physical Sciences", "Computer Science — BS (CS)", 40, 15, "—", "—"],
  ["Physical Sciences", "Computer Science — BS (IT)", 40, 15, "—", "—"],
  ["Physical Sciences", "Computer Science — BS (Software Engineering)", 40, 15, "—", "—"],
  ["Physical Sciences", "Geography", 50, 20, 50, "—"],
  ["Physical Sciences", "Mathematics", 90, 20, 40, 20],
  ["Physical Sciences", "Physics & Electronics", 90, 20, 40, 20],
  ["Physical Sciences", "Statistics", 60, 20, 40, 20],
  ["Social Sciences", "Economics", 80, 20, 60, 20],
  ["Social Sciences", "International Relations", 80, 20, 30, 20],
  ["Social Sciences", "Peace & Conflict Studies", 80, "—", 15, 15],
  ["Social Sciences", "Islamic Studies", 60, "—", 20, "—"],
  ["Social Sciences", "Media & Communication Studies", 80, 20, 40, 10],
  ["Social Sciences", "Pakistan Studies", 80, 20, 40, 10],
  ["Social Sciences", "Political Science", 60, 20, 40, 10],
  ["Social Sciences", "Sociology", 70, 5, 30, 10],
  ["Social Sciences", "Gender Studies", 50, 10, 40, 20],
  ["Management Sciences", "BBA Business Administration", 80, 5, "—", "—"],
  ["Management Sciences", "BS Accounting & Finance", 20, "—", "—", "—"],
  ["Management Sciences", "MBA Non-Business Graduate (2-Years)", 50, 10, "—", "—"],
  ["Management Sciences", "Commerce & Management", 90, 20, 50, 10],
  ["Management Sciences", "Banking & Finance", 80, "—", "—", "—"],
  ["Management Sciences", "Tourism & Hospitality", 80, "—", "—", "—"],
  ["Management Sciences", "Public Administration", 90, 30, 60, 10],
  ["Arts & Languages", "English Language & Literature", 90, 10, 80, 20],
  ["Arts & Languages", "Sindhi", 50, 10, 60, 20],
  ["Arts & Languages", "Urdu", 50, 10, 30, 20],
  ["Education", "Special Education", 60, "—", "—", "—"],
  ["Education", "Teachers Education (B.Ed. Hons)", 40, 20, "—", "—"],
  ["Law", "SZAB School of Law (LLB)", 95, "—", "—", "—"]
];

/* ---------- Sample mock test questions ---------- */
const QS = [
  ["The plants that can be produced from a single cell on artificial nutrients in the laboratory are known as:", ["Microscopy", "Tissue Culture", "Hybridization", "Grafting"], 1],
  ["Shah Abdul Latif University, Khairpur is located near which historic fort and archaeological site?", ["Ranikot", "Kot Diji & Mohenjo Daro", "Taxila", "Harappa"], 1],
  ["Choose the word closest in meaning to 'CANDID':", ["Secretive", "Frank & Honest", "Hesitant", "Careless"], 1],
  ["Choose the correct preposition: 'He is good ___ Mathematics.'", ["in", "on", "at", "with"], 2],
  ["Which organelle is known as the powerhouse of the cell?", ["Ribosome", "Mitochondria", "Nucleus", "Golgi body"], 1],
  ["What is the chemical symbol for Potassium?", ["P", "Po", "K", "Pt"], 2],
  ["What is the SI unit of electric current?", ["Volt", "Ohm", "Ampere", "Watt"], 2],
  ["If 3x + 7 = 22, what is the value of x?", ["3", "5", "7", "9"], 1],
  ["Which data structure works on the First-In, First-Out (FIFO) principle?", ["Stack", "Queue", "Tree", "Array"], 1],
  ["In which year was the Lahore Resolution (Pakistan Resolution) passed?", ["1930", "1935", "1940", "1946"], 2],
  ["How many Makki Surahs are there in the Holy Quran?", ["86", "28", "114", "70"], 0],
  ["The shrine of Hazrat Sachal Sarmast is located in:", ["Bhit Shah", "Daraza Sharif (Khairpur)", "Sehwan Sharif", "Rohri"], 1],
  ["Which test conducted by HEC is mandatory for admission to the LLB program?", ["LAT (Law Admission Test)", "GAT", "NAT", "MDCAT"], 0],
  ["What is the pH of pure neutral water at 25°C?", ["0", "5", "7", "14"], 2],
  ["Which river flows through Sindh province near Sukkur and Khairpur?", ["River Ravi", "River Indus", "River Jhelum", "River Chenab"], 1]
];

/* ---------- FAQs / Guidance ---------- */
const FAQS = [
  ["How is the SALU merit aggregate calculated?", "The official merit formula is: Pre-Entry Test (or passed HEC USAT score) = 50%, Intermediate (HSC-II) = 30%, and Matriculation (SSC) = 20%."],
  ["What is the passing score on the Entry Test / USAT?", "In the SALU Entry Test (out of 50), scores below 17 are considered failed. If applying via HEC USAT, you must score at least 50 out of 100."],
  ["How do I apply online for SALU admissions?", "Register on the official portal (www.salu.edu.pk), fill in your academic details, pay the Rs. 2,500/- processing fee challan via HBL Konnect, upload your documents, and submit the printed form with attested copies to the Directorate of Admissions."],
  ["Who can apply for BS Part-III (Bridging)?", "Candidates who passed a 2-Year Bachelor (B.A./B.Sc./B.Com.) or Associate Degree (ADE/ADS/ADC) in 2021 or onwards with at least 50% marks."],
  ["Is the HEC Law Admission Test (LAT) required for LLB?", "Yes, passing the HEC LAT is mandatory for admission to the 4-Year LLB program at SZAB School of Law."],
  ["Which programs are offered at Ghotki and Shahdad Kot Sub-Campuses?", "Both Ghotki and Shahdad Kot Sub-Campuses offer 4-Year BS programs in Business Administration (BBA), Computer Science & I.T., and English Language & Literature."],
  ["What is the Tuition Fee Refund Policy?", "100% refund up to the 10th day of classes, 80% up to the 15th day, 60% up to the 20th day, 50% up to the 30th day, and 0% after the 30th day."],
  ["Are hostels and scholarships available for students?", "Yes, SALU has 5 Boys Hostels and 3 Girls Hostels (Rs. 14,000/- per year), grants 10% tuition freeships and 2.5% bursaries, and facilitates HEC Need-Based, Ehsaas, SEEF, and Zakat scholarships."]
];
