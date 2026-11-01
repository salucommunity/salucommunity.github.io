(function(){
 'use strict';
 var TZ='Asia/Karachi';
 function today(){try{return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}catch(e){return new Date().toISOString().slice(0,10);}}
 function slug(x){return String(x==null?'':x).trim().normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)||'test';}
 function hash(x){var n=2166136261,s=String(x);for(var i=0;i<s.length;i++){n^=s.codePointAt(i);if(s.codePointAt(i)>65535)i++;n=Math.imul(n,16777619);}return (n>>>0).toString(36);}
 function jobFile(id){var s=slug(id);return 'job-'+(s===String(id)?s:s+'-'+hash(id).slice(0,4))+'.html';}
 function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function jobs(){
  var e=typeof SITE_EDITOR!=='undefined'?SITE_EDITOR:{},h=e.jobHub||{},list=Array.isArray(h.jobs)?h.jobs:[],now=today();
  function day(s){return Date.parse(s+'T00:00:00Z');}
  return list.map(function(j,i){return {j:j,i:i};}).filter(function(x){
   if(x.j.visible===false)return false;if(!x.j.lastDate)return true;var d=Math.round((day(x.j.lastDate)-day(now))/864e5);return !(d<0);
  }).sort(function(a,b){return String(b.j.postedAt||b.j.updatedAt||'').localeCompare(String(a.j.postedAt||a.j.updatedAt||''))||b.i-a.i;}).map(function(x){return x.j;});
 }
 function fmt(v){if(!v)return '';try{return new Date(v+'T12:00:00Z').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:TZ});}catch(e){return v;}}
 function init(){
  var page=document.body.dataset.activePage;
  if(page!=='home')return;
  var cta=document.querySelector('[data-cms-link="home-l001"]')||[].slice.call(document.querySelectorAll('.hero a')).filter(function(a){return /Explore Admissions/.test(a.textContent);})[0];
  if(cta){cta.href='jobshub.html';cta.textContent='Jobs Hub →';cta.removeAttribute('data-cms-link');}
  if(document.getElementById('saluJobsShortcut'))return;
  var open=jobs(),latest=open.slice(0,3),count=open.length;
  var key='SALU_JOBS_POP_V2',state='';try{state=sessionStorage.getItem(key)||'';}catch(e){}
  var style=document.createElement('style');
  style.textContent='#saluJobsShortcut{position:fixed;right:16px;bottom:calc(132px + env(safe-area-inset-bottom,0px));z-index:190;font:14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;color:#172c49;max-width:calc(100vw - 32px)}'
  +'#saluJobsShortcut *{box-sizing:border-box}'
  +'.sjp-fab{display:flex;align-items:center;gap:10px;border:0;cursor:pointer;color:#fff;background:linear-gradient(135deg,#0a2e6e,#1d64df);border-radius:999px;padding:9px 16px 9px 9px;box-shadow:0 8px 28px #0a2e6e55;font:800 14px system-ui,sans-serif;margin-left:auto;position:relative}'
  +'.sjp-fab-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#ffffff26}'
  +'.sjp-fab svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}'
  +'.sjp-count{position:absolute;top:-6px;left:-4px;min-width:21px;height:21px;padding:0 6px;border-radius:99px;background:#ff5a3c;color:#fff;font:800 11px/21px system-ui,sans-serif;text-align:center;border:2px solid #fff}'
  +'.sjp-fab::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 0 #3a82f088;animation:sjpPulse 2.6s ease-out infinite;pointer-events:none}'
  +'@keyframes sjpPulse{0%{box-shadow:0 0 0 0 #3a82f088}70%,100%{box-shadow:0 0 0 14px #3a82f000}}'
  +'.sjp-card{width:min(340px,calc(100vw - 32px));background:#fff;border:1px solid #cfe0f7;border-radius:20px;box-shadow:0 18px 55px #0a2e6e40;overflow:hidden;margin-bottom:12px;transform-origin:bottom right;animation:sjpIn .22s ease-out}'
  +'@keyframes sjpIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}'
  +'.sjp-head{display:flex;align-items:flex-start;gap:10px;padding:16px 16px 14px;color:#fff;background:linear-gradient(135deg,#0a2e6e,#1d64df)}'
  +'.sjp-head b{display:block;font-size:17px;line-height:1.25}.sjp-head span{display:block;font-size:12.5px;color:#cfe0ff;margin-top:2px}'
  +'.sjp-x{margin-left:auto;flex-shrink:0;width:30px;height:30px;border-radius:50%;border:0;background:#ffffff26;color:#fff;font-size:20px;line-height:1;cursor:pointer}'
  +'.sjp-body{padding:12px 12px 4px;max-height:min(46vh,320px);overflow:auto}'
  +'.sjp-label{font:800 11px system-ui,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#63768e;margin:2px 4px 8px}'
  +'.sjp-job{display:block;text-decoration:none;color:inherit;border:1px solid #e0eaf7;border-radius:12px;padding:10px 12px;margin-bottom:8px;background:#f8fbff}'
  +'.sjp-job:hover{background:#edf4ff;border-color:#b9d1f3}.sjp-job b{display:block;font-size:14px;color:#103565;line-height:1.3}.sjp-job small{display:block;font-size:12px;color:#63768e;margin-top:3px}'
  +'.sjp-empty{font-size:13px;color:#536985;padding:6px 4px 12px;line-height:1.55}'
  +'.sjp-links{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:6px 12px 12px}'
  +'.sjp-links a{display:block;text-align:center;text-decoration:none;font:700 13px system-ui,sans-serif;padding:10px 6px;border-radius:11px;color:#173d77;background:#eaf2ff;border:1px solid #cfe0f7}'
  +'.sjp-links a:hover{background:#dbe8ff}.sjp-links a.sjp-main{grid-column:1/-1;background:#1552be;border-color:#1552be;color:#fff;font-size:14px;padding:12px}'
  +'.sjp-fab:focus-visible,.sjp-x:focus-visible,.sjp-card a:focus-visible{outline:3px solid #70a7f5;outline-offset:2px}'
  +'@media(prefers-reduced-motion:reduce){.sjp-fab::after,.sjp-card{animation:none}}';
  document.head.append(style);
  var box=document.createElement('aside');box.id='saluJobsShortcut';box.setAttribute('aria-label','Jobs Hub');
  var icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3"/></svg>';
  function panel(){
   return '<div class="sjp-card" role="dialog" aria-label="Jobs Hub"><div class="sjp-head"><div><b>Jobs Hub</b><span>'+(count?count+(count===1?' open job notice':' open job notices'):'Jobs, preparation and mock tests')+'</span></div><button type="button" class="sjp-x" aria-label="Close Jobs Hub">×</button></div>'
   +'<div class="sjp-body"><div class="sjp-label">Latest jobs</div>'
   +(latest.length?latest.map(function(j){return '<a class="sjp-job" href="'+esc(jobFile(j.id))+'"><b>'+esc(j.title)+'</b><small>'+esc([j.organization,j.lastDate?'Last date '+fmt(j.lastDate):''].filter(Boolean).join(' · ')||'View details')+'</small></a>';}).join(''):'<p class="sjp-empty">New job notices will appear here. Meanwhile, prepare with job tests and mock tests.</p>')
   +'</div><div class="sjp-links"><a class="sjp-main" href="jobshub.html">Browse &amp; search all jobs</a><a href="jobs-preparation.html">Job Preparation</a><a href="mock-tests.html">Mock Tests</a></div></div>';
  }
  function render(openPanel){
   box.innerHTML=(openPanel?panel():'')+'<button type="button" class="sjp-fab" aria-expanded="'+(openPanel?'true':'false')+'"><span class="sjp-fab-icon">'+icon+'</span><span>Jobs Hub</span>'+(count&&!openPanel?'<span class="sjp-count" aria-label="'+count+' open jobs">'+(count>9?'9+':count)+'</span>':'')+'</button>';
   var fab=box.querySelector('.sjp-fab');fab.onclick=function(){set(!openPanel,true);};
   var x=box.querySelector('.sjp-x');if(x)x.onclick=function(){set(false,true);fab.focus();};
  }
  function set(v,remember){if(remember){try{sessionStorage.setItem(key,v?'open':'closed');}catch(e){}}render(v);}
  box.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&box.querySelector('.sjp-card')){set(false,true);box.querySelector('.sjp-fab').focus();}});
  render(false);document.body.append(box);
  /* One gentle automatic preview per visit, never over the website announcement image or after being dismissed. */
  if(!state&&latest.length&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
   setTimeout(function(){if(document.getElementById('saluSitePopup')||box.querySelector('.sjp-card'))return;set(true,false);try{sessionStorage.setItem(key,'shown');}catch(e){}},3500);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
