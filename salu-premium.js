/* SALU Community premium theme behaviour: smooth scroll effects, card labels and the announcements popup. */
(function(){
 'use strict';
 var root=document.documentElement,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
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
  cleanup();announcePopup();
  window.addEventListener('load',cleanup);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
