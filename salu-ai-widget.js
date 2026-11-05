/* SALU AI Assistant - retrieval based, runs fully in the browser (no API key needed). */
(function(){
if(window.__saluAI)return;window.__saluAI=1;
var STOP=new Set('the a an is are of to in on for and or me my i you what how when where which who do does can tell about please kya hai hain ka ki ke ko se me mein aur ya kab kahan kaise batao btao mujhe hamen salu'.split(' '));
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9\u0600-\u06ff\s]/g,' ');}
function toks(s){return norm(s).split(/\s+/).filter(function(w){return w.length>1&&!STOP.has(w);});}
function g(n){try{return(0,eval)('typeof '+n+'!=="undefined"?'+n+':null');}catch(e){return null;}}
var chunks=[];
function add(t,src,link){t=String(t||'').replace(/\s+/g,' ').trim();if(t.length>20)chunks.push({t:t,src:src,link:link||'',k:toks(t)});}
function build(){
 chunks=[];
 (g('ANNOUNCE')||[]).forEach(function(a){add((a.date||'')+' '+(a.title||'')+'. '+(a.body||''),'Announcement',a.pdf);});
 (g('MERITS')||[]).forEach(function(m){add('Merit list: '+(m.title||'')+'. '+(m.date||''),'Merit List',m.pdf);});
 (g('FEES')||[]).forEach(function(f){add('Fee - '+(f.dept||f.name||'')+': '+(f.details||f.fee||JSON.stringify(f)),'Fees');});
 (g('SCHOLARSHIPS')||[]).forEach(function(s){add('Scholarship '+(s.name||'')+': '+(s.details||''),'Scholarships');});
 (g('DEPTS')||[]).forEach(function(d){add('Department: '+(d.name||d.dept||JSON.stringify(d)),'Departments');});
 (g('SEATS')||[]).forEach(function(s){add('Seats '+Object.keys(s).map(function(k){return k+': '+s[k];}).join(', '),'Seats');});
 (g('FAQS')||[]).forEach(function(f){add('Q: '+(f.q||f.question||'')+' A: '+(f.a||f.answer||''),'FAQ');});
 (g('RESULTS')||[]).forEach(function(r){add(typeof r==='string'?r:Object.keys(r).map(function(k){return r[k];}).join(' '),'Results');});
 var kb=window.SALU_AI_KB;
 if(kb&&kb.docs)kb.docs.forEach(function(d){(d.chunks||[]).forEach(function(c){add(c,'PDF: '+d.name,d.url);});});
 var m=document.querySelector('main')||document.body;
 if(m){var txt=(m.innerText||'').split(/\n{2,}/);txt.forEach(function(p){if(p.length>40&&p.length<1500)add(p,'Website page');});}
}
function search(q){
 var qt=toks(q);if(!qt.length)return[];
 var N=chunks.length||1,df={};
 qt.forEach(function(w){df[w]=chunks.filter(function(c){return c.k.indexOf(w)>-1;}).length;});
 var res=chunks.map(function(c){var s=0;qt.forEach(function(w){var tf=0;for(var i=0;i<c.k.length;i++){if(c.k[i]===w)tf++;}
   if(!tf&&w.length>3&&c.t.toLowerCase().indexOf(w)>-1)tf=.5;
   if(tf)s+=(1+Math.log(1+tf))*Math.log(1+N/(1+df[w]));});
   return{c:c,s:s};}).filter(function(x){return x.s>0;}).sort(function(a,b){return b.s-a.s;});
 var seen={},out=[];res.forEach(function(x){var key=x.c.t.slice(0,60);if(!seen[key]&&out.length<3){seen[key]=1;out.push(x.c);}});
 return out;
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function answer(q){
 if(/^(hi|hello|salam|assalam|aoa|hey)/i.test(q.trim()))return'Assalam o Alaikum! Main SALU Assistant hoon. Admissions, merit list, fees, departments, seats ya scholarships ke bare mein poochein.';
 var r=search(q);
 if(!r.length)return'Sorry, mujhe is sawal ka jawab website data mein nahi mila. Mehrbani karke doosre alfaaz mein poochein ya official SALU website / admission office se rabta karein.';
 return r.map(function(c){var t=c.t.length>420?c.t.slice(0,420)+'…':c.t;
  return'<div class="sa-ans"><div>'+esc(t)+'</div><small>'+esc(c.src)+(c.link?' · <a href="'+esc(c.link)+'" target="_blank" rel="noopener">Open</a>':'')+'</small></div>';}).join('');
}
function ui(){
 var css='#sa-btn{position:fixed;right:18px;bottom:18px;z-index:99998;width:58px;height:58px;border-radius:50%;border:0;background:#1552be;color:#fff;font-size:26px;cursor:pointer;box-shadow:0 8px 24px #0a2e6e55}'+
 '#sa-box{position:fixed;right:18px;bottom:88px;z-index:99998;width:min(360px,calc(100vw - 24px));height:min(520px,calc(100vh - 110px));background:#fff;border-radius:16px;box-shadow:0 16px 48px #0a2e6e44;display:none;flex-direction:column;overflow:hidden;font:14px/1.5 system-ui,sans-serif;color:#072252}'+
 '#sa-box.on{display:flex}#sa-h{background:#1552be;color:#fff;padding:12px 14px;font-weight:700;display:flex;justify-content:space-between}#sa-h span{cursor:pointer}'+
 '#sa-m{flex:1;overflow:auto;padding:12px;background:#f4f8ff}.sa-b{margin:6px 0;padding:9px 11px;border-radius:12px;max-width:92%;overflow-wrap:anywhere}'+
 '.sa-u{background:#1552be;color:#fff;margin-left:auto}.sa-a{background:#fff;border:1px solid #d9e8ff}.sa-ans+.sa-ans{border-top:1px solid #e3ecfa;margin-top:8px;padding-top:8px}.sa-ans small{color:#46618f}'+
 '#sa-f{display:flex;gap:6px;padding:10px;border-top:1px solid #d9e8ff}#sa-i{flex:1;padding:10px;border:1px solid #c3dafd;border-radius:10px;font:inherit}#sa-s{background:#1552be;color:#fff;border:0;border-radius:10px;padding:0 14px;cursor:pointer}'+
 '@media(prefers-color-scheme:dark){#sa-box{background:#0f1b33;color:#e6efff}#sa-m{background:#0b1426}.sa-a{background:#14233f;border-color:#243b66;color:#e6efff}#sa-i{background:#14233f;color:#fff;border-color:#243b66}#sa-f{border-color:#243b66}.sa-ans small{color:#9db8e8}}';
 var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 var b=document.createElement('button');b.id='sa-btn';b.setAttribute('aria-label','Open SALU AI Assistant');b.innerHTML='💬';
 var x=document.createElement('div');x.id='sa-box';
 x.innerHTML='<div id="sa-h"><div>SALU AI Assistant</div><span id="sa-x" aria-label="Close">✕</span></div><div id="sa-m"></div><form id="sa-f"><input id="sa-i" placeholder="Sawal likhein…" autocomplete="off"><button id="sa-s">Send</button></form>';
 document.body.appendChild(b);document.body.appendChild(x);
 var m=x.querySelector('#sa-m');
 function say(h,c){var d=document.createElement('div');d.className='sa-b '+c;d.innerHTML=h;m.appendChild(d);m.scrollTop=m.scrollHeight;}
 var opened=false;
 function toggle(){x.classList.toggle('on');if(x.classList.contains('on')&&!opened){opened=true;build();say('Assalam o Alaikum! SALU ke bare mein kuch bhi poochein: admission, merit list, fees, seats, departments.','sa-a');}}
 b.onclick=toggle;x.querySelector('#sa-x').onclick=toggle;
 x.querySelector('#sa-f').onsubmit=function(e){e.preventDefault();var i=x.querySelector('#sa-i'),q=i.value.trim();if(!q)return;i.value='';say(esc(q),'sa-u');say(answer(q),'sa-a');};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();
