/* SSC page: renders events and announcements added in the admin panel */
(function(){
 var box=document.getElementById('sscEvents');if(!box)return;
 function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 var HM=/^\d{1,2}:\d{2}$/;
 function localDay(d){var m=d.getMonth()+1,x=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(x<10?'0':'')+x;}
 function fmt(d){var t=new Date(d+'T00:00:00');return isNaN(t)?esc(d):t.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}
 function clock(t){if(!HM.test(t||''))return t?esc(t):'';var p=t.split(':'),h=+p[0],ap=h>=12?'PM':'AM';h=h%12||12;return h+':'+p[1]+' '+ap;}
 function startMs(e){if(!e.date)return 9e15;var t=HM.test(e.time||'')?e.time:'00:00';var d=new Date(e.date+'T'+(t.length<5?'0'+t:t)+':00');return isNaN(d)?9e15:d.getTime();}
 function endMs(e){
  if(!e.date)return 9e15;
  var end=HM.test(e.timeEnd||'')?e.timeEnd:'',st=HM.test(e.time||'')?e.time:'';
  var pad=function(t){return t.length<5?'0'+t:t;};
  if(end){var d=new Date(e.date+'T'+pad(end)+':00');return isNaN(d)?9e15:d.getTime();}
  if(st){var s=new Date(e.date+'T'+pad(st)+':00');return isNaN(s)?9e15:s.getTime()+3*3600000;}
  var z=new Date(e.date+'T23:59:59');return isNaN(z)?9e15:z.getTime();
 }
 function card(e,past,today){
  var times=[clock(e.time),clock(e.timeEnd)].filter(Boolean).join(' \u2013 ');
  var meta=[times,e.venue?esc(e.venue):''].filter(Boolean).join(' &middot; ');
  var link=/^https?:\/\//i.test(e.link||'')?'<a class="btn alt ssc-more" href="'+esc(e.link)+'" target="_blank" rel="noopener">More details</a>':'';
  var dims=e.w&&e.h?' width="'+(+e.w)+'" height="'+(+e.h)+'"':'';
  return '<article class="ssc-ev'+(past?' past':'')+'">'+(e.img?'<img class="ssc-zoom" src="'+esc(e.img)+'" alt="'+esc(e.title)+'"'+dims+' loading="lazy">':'')+'<div class="ssc-ev-b"><span class="ssc-badge">'+esc(e.type||'Event')+(today?' &middot; Today':(e.date?' &middot; '+fmt(e.date):''))+'</span><h3>'+esc(e.title)+'</h3>'+(meta?'<small>'+meta+'</small>':'')+(e.desc?'<p>'+esc(e.desc).replace(/\n/g,'<br>')+'</p>':'')+link+'</div></article>';
 }
 function render(){
  var list=Array.isArray(window.SALU_SSC_EVENTS)?window.SALU_SSC_EVENTS.slice():[];
  if(!list.length){box.innerHTML='<p class="ssc-small">No events have been announced yet. Please check back soon, or follow the <a href="announcements.html">Announcements</a> page.</p>';return;}
  var now=Date.now(),day=localDay(new Date());
  var up=list.filter(function(e){return endMs(e)>=now;}).sort(function(a,b){return startMs(a)-startMs(b);});
  var past=list.filter(function(e){return endMs(e)<now;}).sort(function(a,b){return startMs(b)-startMs(a);});
  var h='';
  if(up.length)h+='<h3 class="ssc-sub">Upcoming</h3><div class="ssc-ev-grid">'+up.map(function(e){return card(e,false,e.date===day);}).join('')+'</div>';
  if(past.length)h+='<h3 class="ssc-sub">Past events</h3><div class="ssc-ev-grid">'+past.map(function(e){return card(e,true,false);}).join('')+'</div>';
  box.innerHTML=h;
 }
 box.addEventListener('click',function(ev){
  var im=ev.target;if(!im.classList||!im.classList.contains('ssc-zoom'))return;
  var o=document.createElement('div');o.className='ssc-lightbox';o.innerHTML='<img src="'+im.src+'" alt="">';
  o.onclick=function(){o.remove();};document.body.appendChild(o);
 });
 var s=document.createElement('script');s.src='ssc-events.js?v='+Math.floor(Date.now()/300000);
 s.onload=function(){render();setInterval(render,60000);};s.onerror=render;document.head.appendChild(s);
})();
