/* SALU Community premium theme behaviour: smooth scroll effects, card labels and the announcements popup. */
(function(){
 'use strict';
 var root=document.documentElement,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 /* ---- announcements: popup with green motion stroke, opened automatically once and from any announcement button ---- */
 function annList(){return (typeof ANNOUNCE!=='undefined'&&Array.isArray(ANNOUNCE))?ANNOUNCE:[];}
 var annOpen=false;
 function openAnn(){
  var list=annList();if(!list.length||annOpen)return;annOpen=true;
  var items=list.slice(0,6),prev=document.activeElement,old=document.body.style.overflow;
  var o=document.createElement('div');o.className='sp-pop';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','spPopTitle');
  o.innerHTML='<div class="sp-pop-card"><div class="sp-pop-head"><span class="sp-pop-bell"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></span><div><span class="sp-pop-live">Live updates</span><b id="spPopTitle">Latest Announcements</b></div><button type="button" class="sp-pop-x" aria-label="Close announcements">×</button></div>'
   +'<ul class="sp-pop-list">'+items.map(function(a){return '<li>'+(a.d?'<time>'+esc(a.d)+'</time>':'')+'<b>'+esc(a.t)+'</b>'+(a.b?'<p>'+esc(a.b)+'</p>':'')+'</li>';}).join('')+'</ul>'
   +'<div class="sp-pop-actions"><a class="sp-pop-go" href="announcements.html">View all announcements →</a><button type="button" class="sp-pop-later">Close</button></div></div>';
  document.body.style.overflow='hidden';document.body.appendChild(o);
  function close(){o.remove();annOpen=false;document.body.style.overflow=old;document.removeEventListener('keydown',onKey);if(prev&&prev.focus)try{prev.focus();}catch(e){}}
  function onKey(ev){if(ev.key==='Escape')close();if(ev.key==='Tab'){var f=o.querySelectorAll('a,button'),first=f[0],last=f[f.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}}}
  o.querySelector('.sp-pop-x').onclick=close;o.querySelector('.sp-pop-later').onclick=close;o.addEventListener('click',function(ev){if(ev.target===o)close();});document.addEventListener('keydown',onKey);o.querySelector('.sp-pop-go').focus();
 }
 window.SaluAnnounce={open:openAnn};
 function announcePopup(){
  if(document.body.dataset.activePage!=='home')return;
  var list=annList();if(!list.length)return;
  var key='SALU_ANN_POP_V1',latest=String(list[0].t||'')+'|'+String(list[0].d||'');
  try{if(sessionStorage.getItem(key)===latest)return;}catch(e){}
  setTimeout(function(){if(document.getElementById('saluSitePopup')){setTimeout(arguments.callee,2500);return;}try{sessionStorage.setItem(key,latest);}catch(e){}openAnn();},1400);
 }
 /* the ticker label opens the announcements popup */
 function tickerLabel(){
  if(document.body.dataset.activePage!=='home'||!annList().length)return;
  var lab=document.querySelector('.ticker-label');if(lab){lab.style.cursor='pointer';lab.setAttribute('role','button');lab.setAttribute('tabindex','0');lab.setAttribute('aria-label','Open announcements');lab.addEventListener('click',openAnn);lab.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openAnn();}});}
 }
 /* ---- public team list (salu-team.js, written by the admin on Publish Live) ---- */
 function loadTeam(cb){
  if(window.SALU_TEAM)return cb(window.SALU_TEAM);
  var s=document.createElement('script');s.src='salu-team.js?v='+Math.floor(Date.now()/3600000);s.onload=function(){cb(window.SALU_TEAM||{count:0,members:[]});};s.onerror=function(){cb({count:0,members:[]});};document.head.appendChild(s);
 }
 function countUp(el,to,ms,done){
  if(reduce){el.textContent=to.toLocaleString('en-US');if(done)done();return;}
  var t0=null;function step(t){if(t0===null)t0=t;var p=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e).toLocaleString('en-US');if(p<1)requestAnimationFrame(step);else if(done)done();}requestAnimationFrame(step);
 }
 var VISITORS=49650;
 function statsSection(){
  if(document.body.dataset.activePage!=='home'||document.getElementById('spStats'))return;
  var browse=document.querySelector('.browse');if(!browse)return;
  var box=document.createElement('section');box.id='spStats';box.className='sp-stats';box.setAttribute('aria-label','SALU Community in numbers');
  box.innerHTML='<a class="sp-stat sp-stat-team" href="our-team.html" aria-label="Our team. Click to view our team"><div class="sp-team-bg" aria-hidden="true"></div><div class="sp-stat-in"><b class="sp-num" id="spTeamNum">0</b><span class="sp-lab">Our Team</span><span class="sp-more">Click to view our team <i aria-hidden="true">›</i></span></div></a>'
   +'<div class="sp-stat sp-stat-vis"><div class="sp-stat-in"><b class="sp-num" id="spVisNum">0</b><span class="sp-lab">Total Viewers</span><span class="sp-live"><i></i>Live</span></div></div>';
  var sec=document.querySelector('h2.sec'),anchor=(sec&&sec.nextElementSibling===browse)?sec:browse;anchor.parentNode.insertBefore(box,anchor);
  loadTeam(function(t){
   var members=Array.isArray(t.members)?t.members:[],n=members.length||Number(t.count)||0;
   var bg=box.querySelector('.sp-team-bg');
   if(members.length){var rows=members.slice(0,40).map(function(m){return '<span>'+esc(m.n)+(m.d?' · '+esc(m.d):'')+'</span>';}).join('');bg.innerHTML='<div class="sp-team-roll">'+rows+rows+'</div>';}
   var card=box.querySelector('.sp-stat-team'),hideT=null;
   var seen=false;
   function go(){if(seen)return;seen=true;countUp(document.getElementById('spTeamNum'),n,1600);
    countUp(document.getElementById('spVisNum'),VISITORS,2400,function(){var el=document.getElementById('spVisNum'),v=VISITORS;(function tick(){setTimeout(function(){if(!document.hidden){v++;el.textContent=v.toLocaleString('en-US');}tick();},3500+Math.random()*4500);})();});}
   if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){io.disconnect();go();}},{threshold:.35});io.observe(box);}else go();
  });
 }
 /* ---- our-team.html: render the list ---- */
 function teamPage(){
  var grid=document.getElementById('spTeamGrid');if(!grid)return;
  loadTeam(function(t){
   var members=Array.isArray(t.members)?t.members:[];
   function draw(q){q=String(q||'').toLowerCase().trim();var list=members.filter(function(m){return !q||(m.n+' '+m.d).toLowerCase().indexOf(q)>=0;});
    document.getElementById('spTeamTotal').textContent=members.length;
    grid.innerHTML=list.map(function(m){var ini=String(m.n||'?').trim().split(/\s+/).slice(0,2).map(function(w){return w.charAt(0);}).join('').toUpperCase();
     return '<article class="sp-member"><span class="sp-ini">'+esc(ini)+'</span><div><b>'+esc(m.n)+'</b><small>'+esc(m.d||'')+'</small>'+'</div></article>';}).join('')||'<p class="empty">'+(members.length?'No team member matches this search.':'The team list will appear here soon.')+'</p>';}
   draw('');document.getElementById('spTeamSearch').addEventListener('input',function(e){draw(e.target.value);});
  });
 }
 /* ---- WhatsApp: removed from the header, shown as a floating button ---- */
 function waFab(){
  if(document.getElementById('spWa'))return;
  var src=document.querySelector('.bar [data-link="wa"],header [data-link="wa"],.hub-header [data-link="wa"],.hub-wa')||document.querySelector('[data-link="wa"]');
  var href=src&&src.getAttribute('href');if(!href)return;
  var a=document.createElement('a');a.id='spWa';a.className='sp-wa';a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Chat with SALU Community on WhatsApp');a.title='WhatsApp';
  a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15.02l-.3-.18-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3.1 4.2c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.88 4.44 3.92 2.2.87 2.64.7 3.12.65.48-.04 1.54-.63 1.76-1.24.22-.6.22-1.13.15-1.24-.06-.1-.24-.17-.5-.3-.27-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.27-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.58-1.4-.8-1.9-.2-.5-.42-.43-.58-.44h-.5z"/></svg>';
  document.body.appendChild(a);
 }


 /* ---- Past Papers: every paper opens on its own page (details form, secure one-question test, PDF) ---- */
 function paperCards(){
  if(!/past-papers(\.html)?$/.test(location.pathname))return;
  function pageFor(id){return 'past-paper-'+String(id).replace(/[^a-z0-9-]/gi,'-').toLowerCase()+'.html';}
  document.addEventListener('click',function(ev){
   if(ev.defaultPrevented||ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.button)return;
   var q=ev.target.closest&&ev.target.closest('[data-pmode="quiz"]');
   if(q){var on=document.querySelector('[data-pid].on');if(on){ev.preventDefault();ev.stopPropagation();location.href=pageFor(on.getAttribute('data-pid'));}return;}
   var a=ev.target.closest&&ev.target.closest('a[data-open-paper]');if(!a)return;
   ev.preventDefault();
   var h=a.getAttribute('href')||'',m=/#((?:start-)?salu-\d{4})/.exec(h);
   if(m){location.href=pageFor(m[1].replace(/^start-/,''));return;}
   var t=document.getElementById('interactivePaperPortal');if(t)t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  },true);
 }

 /* ---- Department Representative / Join our team in the menu ---- */
 function repLink(){
  var panel=document.getElementById('panel');if(!panel||panel.querySelector('a[href="department-representative.html"]'))return;
  var groups=panel.querySelectorAll('.pg'),box=groups[groups.length-1];if(!box)return;
  var a=document.createElement('a');a.href='department-representative.html';
  a.innerHTML='<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>Department Representative</span>';
  box.appendChild(a);
  if(!panel.querySelector('a[href="our-team.html"]')){var t=document.createElement('a');t.href='our-team.html';t.innerHTML=a.innerHTML.replace('Department Representative','Our Team');box.appendChild(t);}
 }

 /* ---- secure test mode: size the full-screen test area under the header ---- */
 window.spFit=function(){var h=document.querySelector('.hub-header,.site-header,header');var b=h?Math.round(h.getBoundingClientRect().bottom):80;document.documentElement.style.setProperty('--sp-hh',Math.max(60,b+6)+'px');};
 window.addEventListener('resize',function(){if(document.body.classList.contains('sp-secure'))window.spFit();});

 /* ---- Aggregate calculator: Main / 1st / 2nd / 3rd department choice with expected admission chance ---- */
 var CALC_DEPTS=[["BS Archaeology", 49.99], ["BS Biochemistry", 54.66], ["BS Botany", 57.55], ["BBA", 57.02], ["BS Accounting & Finance", 55.99], ["BS Chemistry", 58.46], ["BS Computer Science", 62.69], ["BS Information Technology", 60.23], ["BS Software Engineering", 57.62], ["BS Economics", 48.02], ["BS English Language & Literature", 60.34], ["BS Geography", 48.02], ["BS Banking & Finance", 47.48], ["BS Commerce", 50.51], ["BS International Relations", 48.13], ["BS Peace & Conflict Studies", 53.86], ["BS Islamic Studies", 51.21], ["BS Mathematics", 51.74], ["BS Media & Communication Studies", 48.56], ["BS Microbiology", 56.06], ["BS Pakistan Studies", 56.21], ["Pharm D", 64.05], ["BS Physics", 54.39], ["BS Political Science", 43.54], ["BS Public Administration", 46.22], ["BS Sindhi", 52.19], ["BS Sociology", 48.67], ["BS Special Education", 47.82], ["BS Statistics", 54.0], ["BA-LLB", 57.27], ["B.Ed (Hons) Elementary", 56.11], ["BS Urdu", 51.13], ["BS Zoology", 60.1]];
 var CALC_LABELS=['1st choice (Main choice)','2nd choice','3rd choice','4th choice'];
 function chanceOf(agg,close){var z=(agg-close+0.8)/1.7,p=100/(1+Math.exp(-z));return Math.max(1,Math.min(99,Math.round(p)));}
 function chanceLevel(p){return p>=85?['Very high','vh']:p>=65?['High','h']:p>=40?['Moderate','m']:p>=15?['Low','l']:['Very low','vl'];}
 function calcChoices(){
  if(document.body.dataset.activePage!=='calculator'||document.getElementById('spChoices'))return;
  var usat=document.querySelector('#modeSeg button[data-m="usat"]');if(usat)usat.remove();
  var btn=document.getElementById('calcBtn'),seg=document.getElementById('modeSeg'),out=document.getElementById('calcOut');if(!btn||!out||!btn.parentNode)return;
  var opts='<option value="">Select department</option>'+CALC_DEPTS.map(function(d,i){return '<option value="'+i+'">'+esc(d[0])+'</option>';}).join('');
  var box=document.createElement('div');box.id='spChoices';box.className='sp-choices';
  box.innerHTML='<h3 class="sp-ch-title">Your department choices <small>(optional)</small></h3><p class="sp-ch-sub">Select your choices to see your expected chance of admission for each department.</p><div class="sp-ch-grid">'
   +CALC_LABELS.map(function(l,i){return '<label class="sp-ch-f" for="spCh'+i+'"><span>'+l+'</span><select id="spCh'+i+'">'+opts+'</select></label>';}).join('')+'</div>';
  var row=btn.parentNode;row.parentNode.insertBefore(box,row);
  function mode(){var on=seg&&seg.querySelector('button.on');return on?on.getAttribute('data-m'):'salu';}
  function sync(){box.hidden=mode()==='bs3';}
  if(seg)seg.addEventListener('click',function(){setTimeout(sync,0);});sync();
  btn.addEventListener('click',function(){setTimeout(function(){
   var old=document.getElementById('spChanceOut');if(old)old.remove();
   if(box.hidden)return;
   var big=out.querySelector('.big');if(!big)return;
   var agg=parseFloat(big.textContent);if(isNaN(agg))return;
   var rows=[];
   CALC_LABELS.forEach(function(l,i){
    var v=document.getElementById('spCh'+i).value;if(v==='')return;
    var d=CALC_DEPTS[+v],p=chanceOf(agg,d[1]),diff=agg-d[1],lv=chanceLevel(p);
    rows.push('<div class="sp-ch-row"><div class="sp-ch-top"><span class="sp-ch-tag">'+l+'</span><b>'+esc(d[0])+'</b></div>'
     +'<div class="sp-ch-meta">Closing (Batch 2026): <b>'+d[1].toFixed(2)+'%</b> &middot; Your aggregate: <b>'+agg.toFixed(2)+'%</b> ('+(diff>=0?'+':'')+diff.toFixed(2)+'%)</div>'
     +'<div class="sp-ch-bar" aria-hidden="true"><i class="sp-lv-'+lv[1]+'" style="width:'+p+'%"></i></div>'
     +'<div class="sp-ch-pct sp-t-'+lv[1]+'"><b>'+p+'%</b> chance &middot; '+lv[0]+'</div></div>');
   });
   if(!rows.length)return;
   var wrap=document.createElement('div');wrap.id='spChanceOut';wrap.className='sp-chance';
   wrap.innerHTML='<h3 class="sp-ch-title">Your chances by department</h3>'+rows.join('')
    +'<details class="sp-ch-all"><summary>View closing percentages of all departments (Batch 2026)</summary><ul>'+CALC_DEPTS.slice().sort(function(a,b){return b[1]-a[1];}).map(function(d){return '<li><span>'+esc(d[0])+'</span><b>'+d[1].toFixed(2)+'%</b></li>';}).join('')+'</ul></details>'+'<p class="sp-ch-note"><b>Disclaimer:</b> This is the closing percentage of batch 2026 and is only an expected percentage. It will change depending on the difficulty of the entry test and is not a guarantee of admission.</p>';
   out.appendChild(wrap);
  },0);});
 }
 /* ---- remove the retired Jobs Hub widget from cached pages ---- */
 function cleanup(){var j=document.getElementById('saluJobsShortcut');if(j)j.remove();}
 function init(){
  cleanup();waFab();paperCards();repLink();tickerLabel();statsSection();teamPage();calcChoices();(function(){var pn=document.getElementById('panel');if(pn&&window.MutationObserver)new MutationObserver(repLink).observe(pn,{childList:true});window.addEventListener('load',repLink);})();announcePopup();
  window.addEventListener('load',cleanup);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
