/* SALU Community premium theme behaviour: smooth scroll effects, card labels and the announcements popup. */
(function(){
 'use strict';
 var root=document.documentElement,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 /* ---- scroll progress, parallax pattern and header state (one rAF-throttled passive listener) ---- */
 function scrollFx(){
  var bar=document.createElement('div');bar.id='spProgress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
  var ticking=false;
  function update(){ticking=false;var y=window.scrollY||root.scrollTop||0,max=Math.max(1,root.scrollHeight-window.innerHeight);
   bar.style.transform='scaleX('+Math.min(1,y/max).toFixed(4)+')';root.style.setProperty('--sp-scroll',y);root.classList.toggle('sp-scrolled',y>8);}
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  window.addEventListener('resize',update,{passive:true});update();
 }
 /* ---- reveal on scroll ---- */
 var REVEAL='.hero,.gate,.gsearch-wrap,.sec,.sec-head,.tile,.card,.ann,.person,details,.q,.out,.note,.mock-test-card,.quiz-hero,.mock-filterbar,.cols>*,footer .glass';
 function reveal(scope){
  if(reduce||!('IntersectionObserver' in window))return;
  var io=reveal.io||(reveal.io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('sp-in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:.06}));
  var n=0;[].forEach.call((scope||document).querySelectorAll(REVEAL),function(el){
   if(el.classList.contains('sp-rv')||el.closest('#panel,.gsearch-panel,.sp-pop'))return;
   var r=el.getBoundingClientRect();if(r.top<window.innerHeight*0.92&&r.bottom>0){return;}
   el.classList.add('sp-rv');el.style.setProperty('--sp-d',Math.min(n%6,5)*70+'ms');n++;io.observe(el);});
 }
 /* ---- browse-card labels ---- */
 var LABELS={'admissions':'Admissions','merit-list':'Merit','announcements':'Updates','department-seats':'Seats','fee-structure':'Fees','scholarships':'Aid','past-papers':'Practice','aggregate-calculator':'Tool','departments':'Academics','entry-test-preparation':'Prep','mock-tests':'Free test','results':'Results','faqs':'Help','about':'About','contact':'Contact'};
 function label(){
  var tiles=document.getElementById('tiles');if(!tiles)return;
  [].forEach.call(tiles.querySelectorAll('a.tile'),function(a){
   if(a.querySelector('.sp-label'))return;var key=(a.getAttribute('href')||'').split('#')[0].replace(/\.html$/,''),text=LABELS[key];if(!text)return;
   var s=document.createElement('span');s.className='sp-label';s.textContent=text;var h=a.querySelector('h3');a.insertBefore(s,h||null);});
 }
 function watchTiles(){
  var tiles=document.getElementById('tiles');if(!tiles){return;}label();
  if(window.MutationObserver){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(function(){label();reveal(tiles);},30);}).observe(tiles,{childList:true});}
 }
 /* ---- announcements popup with green motion stroke ---- */
 function announcePopup(){
  if(document.body.dataset.activePage!=='home')return;
  var list=(typeof ANNOUNCE!=='undefined'&&Array.isArray(ANNOUNCE))?ANNOUNCE:[];if(!list.length)return;
  var key='SALU_ANN_POP_V1',latest=String(list[0].t||'')+'|'+String(list[0].d||'');
  try{if(sessionStorage.getItem(key)===latest)return;}catch(e){}
  var items=list.slice(0,3);
  function open(){
   if(document.getElementById('saluSitePopup')){setTimeout(open,2500);return;}
   var prev=document.activeElement,old=document.body.style.overflow;
   var o=document.createElement('div');o.className='sp-pop';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','spPopTitle');
   o.innerHTML='<div class="sp-pop-card"><div class="sp-pop-head"><span class="sp-pop-bell"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></span><div><span class="sp-pop-live">Live updates</span><b id="spPopTitle">Latest Announcements</b></div><button type="button" class="sp-pop-x" aria-label="Close announcements">×</button></div>'
    +'<ul class="sp-pop-list">'+items.map(function(a){return '<li>'+(a.d?'<time>'+esc(a.d)+'</time>':'')+'<b>'+esc(a.t)+'</b>'+(a.b?'<p>'+esc(a.b)+'</p>':'')+'</li>';}).join('')+'</ul>'
    +'<div class="sp-pop-actions"><a class="sp-pop-go" href="announcements.html">View all announcements →</a><button type="button" class="sp-pop-later">Later</button></div></div>';
   document.body.style.overflow='hidden';document.body.appendChild(o);
   try{sessionStorage.setItem(key,latest);}catch(e){}
   function close(){o.remove();document.body.style.overflow=old;document.removeEventListener('keydown',onKey);if(prev&&prev.focus)prev.focus();}
   function onKey(ev){if(ev.key==='Escape')close();if(ev.key==='Tab'){var f=o.querySelectorAll('a,button'),first=f[0],last=f[f.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}}}
   o.querySelector('.sp-pop-x').onclick=close;o.querySelector('.sp-pop-later').onclick=close;o.addEventListener('click',function(ev){if(ev.target===o)close();});document.addEventListener('keydown',onKey);o.querySelector('.sp-pop-go').focus();
  }
  setTimeout(open,1400);
 }
 /* ---- remove the retired Jobs Hub widget from cached pages ---- */
 function cleanup(){var j=document.getElementById('saluJobsShortcut');if(j)j.remove();}
 function init(){
  root.classList.add('sp-js');cleanup();scrollFx();watchTiles();reveal(document);announcePopup();
  window.addEventListener('load',function(){reveal(document);cleanup();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
