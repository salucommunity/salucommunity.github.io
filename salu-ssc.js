/* SSC page: renders events and announcements added in the admin panel */
(function(){
 var box=document.getElementById('sscEvents');if(!box)return;
 function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function fmt(d){var t=new Date(d+'T00:00:00');return isNaN(t)?esc(d):t.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}
 function card(e,past){
  var meta=[e.time,e.venue].filter(Boolean).map(esc).join(' &middot; ');
  var link=/^https?:\/\//i.test(e.link||'')?'<a class="btn alt ssc-more" href="'+esc(e.link)+'" target="_blank" rel="noopener">More details</a>':'';
  return '<article class="ssc-ev'+(past?' past':'')+'">'+(e.img?'<img src="'+esc(e.img)+'" alt="'+esc(e.title)+'" loading="lazy">':'')+'<div class="ssc-ev-b"><span class="ssc-badge">'+esc(e.type||'Event')+(e.date?' &middot; '+fmt(e.date):'')+'</span><h3>'+esc(e.title)+'</h3>'+(meta?'<small>'+meta+'</small>':'')+(e.desc?'<p>'+esc(e.desc).replace(/\n/g,'<br>')+'</p>':'')+link+'</div></article>';
 }
 function render(){
  var list=Array.isArray(window.SALU_SSC_EVENTS)?window.SALU_SSC_EVENTS.slice():[];
  if(!list.length){box.innerHTML='<p class="ssc-small">No events have been announced yet. Please check back soon, or follow the <a href="announcements.html">Announcements</a> page.</p>';return;}
  var today=new Date().toISOString().slice(0,10);
  var up=list.filter(function(e){return !e.date||e.date>=today;}).sort(function(a,b){return String(a.date||'9999').localeCompare(String(b.date||'9999'));});
  var past=list.filter(function(e){return e.date&&e.date<today;}).sort(function(a,b){return b.date.localeCompare(a.date);});
  var h='';
  if(up.length)h+='<h3 class="ssc-sub">Upcoming</h3><div class="ssc-ev-grid">'+up.map(function(e){return card(e,false);}).join('')+'</div>';
  if(past.length)h+='<h3 class="ssc-sub">Past events</h3><div class="ssc-ev-grid">'+past.map(function(e){return card(e,true);}).join('')+'</div>';
  box.innerHTML=h;
 }
 var s=document.createElement('script');s.src='ssc-events.js?v='+Math.floor(Date.now()/300000);
 s.onload=render;s.onerror=render;document.head.appendChild(s);
})();
