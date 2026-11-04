(function(){
 'use strict';
 function init(){
  const page=document.body.dataset.activePage;
  if(page!=='home')return;
  const cta=document.querySelector('[data-cms-link="home-l001"]')||[...document.querySelectorAll('.hero a')].find(a=>/Explore Admissions/.test(a.textContent));
  if(cta){cta.href='jobshub.html';cta.textContent='Jobs Hub →';cta.removeAttribute('data-cms-link');}
  if(document.getElementById('saluJobsShortcut'))return;
  const style=document.createElement('style');style.textContent='#saluJobsShortcut{position:fixed;right:16px;bottom:calc(132px + env(safe-area-inset-bottom,0px));z-index:190;display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0a2e6e,#1d64df);color:white;border:1px solid #c3dafd;border-radius:16px;padding:10px 12px;box-shadow:0 6px 24px #0a2e6e33;font:700 13px system-ui}#saluJobsShortcut a{color:white;display:flex;align-items:center;gap:8px;text-decoration:none}#saluJobsShortcut svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8}#saluJobsShortcut button{color:white;background:transparent;border:0;font-size:22px;cursor:pointer;padding:2px 6px}';document.head.append(style);
  const box=document.createElement('aside');box.id='saluJobsShortcut';box.setAttribute('aria-label','Jobs Preparation shortcut');box.innerHTML='<a href="jobs-preparation.html"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3"/></svg><span>Jobs Preparation</span></a><button type="button" aria-label="Close Jobs Preparation shortcut">×</button>';box.querySelector('button').onclick=()=>box.remove();document.body.append(box);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
