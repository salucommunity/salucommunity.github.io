/** Refresh crawlable HTML after editing data.js. Requires Node.js 18+. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const meta=JSON.parse(read('seo-pages.json'));
const data=vm.runInNewContext(read('data.js')+';({ANNOUNCE,MERITS,FEES,SCHOLARSHIPS,PAPERS,RESULTS,DEPTS,SEATS,FAQS})');
const appPath=read('index.html').match(/src="(assets\/site\.[a-f0-9]+\.js)"/)[1];
const app=read(appPath);
const block=name=>app.match(new RegExp('const '+name+' = ([\\s\\S]*?);\\n'))[0];
const config=vm.runInNewContext(['ICONS','VIEWS','GROUPS','TILES','TC'].map(block).join('\n')+';({ICONS,VIEWS,GROUPS,TILES,TC})');
const names=Object.fromEntries(config.VIEWS);
const routes=Object.fromEntries(Object.entries(meta).map(([key,m])=>[key,key==='home'?'./':new URL(m.canonical).pathname.split('/').pop()]));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inner(doc,id,content){
  const match=new RegExp('<([a-z][a-z0-9:-]*)\\b[^>]*\\bid="'+id+'"[^>]*>','i').exec(doc);
  if(!match)return doc;
  const start=match.index+match[0].length;
  const tags=new RegExp('<(/?)'+match[1]+'\\b[^>]*>','gi');
  tags.lastIndex=start;
  let depth=1,token;
  while((token=tags.exec(doc))){
    depth+=token[1]?-1:1;
    if(!depth)return doc.slice(0,start)+content+doc.slice(token.index);
  }
  throw new Error('Unclosed container: '+id);
}
const tiles=config.TILES.map((t,i)=>`<a class="tile" href="${routes[t[0]]}" style="--ic:${config.TC[i%config.TC.length]}"><span class="tile-icon" aria-hidden="true">${config.ICONS[t[0]]}</span><h3>${esc(t[1])}</h3><p>${esc(t[2])}</p><span class="tile-view">View <span aria-hidden="true">→</span></span></a>`).join('');
const snapshots={
  tiles,
  panel:config.GROUPS.map(g=>`<h4>${g[0]}</h4><div class="pg">${g[1].map(id=>`<a href="${routes[id]}" data-v="${id}">${config.ICONS[id]||''}<span>${names[id]}</span></a>`).join('')}</div>`).join(''),
  meritList:data.MERITS.map(m=>`<a class="tile" href="${esc(m.pdf||m.u)}" target="_blank" rel="noopener noreferrer"><span class="pill">${m.pdf?'MERIT LIST PDF':'MERIT SCHEDULE'}</span><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p><span class="tile-view">${m.pdf?'Download PDF':'Open details'} <span aria-hidden="true">→</span></span></a>`).join(''),
  annList:data.ANNOUNCE.map(a=>`<div class="ann"><time>${esc(a.d)}</time><h3>${esc(a.t)}</h3><p>${esc(a.b)}</p>${a.pdf?`<a class="btn" style="margin-top:12px" href="${esc(a.pdf)}" target="_blank" rel="noopener noreferrer">Download PDF</a>`:''}</div>`).join(''),
  feeList:data.FEES.map(x=>`<div class="card"><h3>${esc(x.d)}</h3><p>${esc(x.f)}</p></div>`).join(''),
  schList:data.SCHOLARSHIPS.map(x=>`<div class="card"><h3>${esc(x.n)}</h3><p>${esc(x.f)}</p></div>`).join(''),
  deptGrid:data.DEPTS.map(d=>`<div class="card"><span class="pill">${esc(d.f)}</span><h3>${esc(d.n)}</h3></div>`).join(''),
  seatBox:`<table><thead><tr><th>Faculty</th><th>Department / Program</th><th>BS-I Merit</th><th>BS-I Self-Finance</th><th>BS-III Merit</th><th>BS-III Self-Finance</th></tr></thead><tbody>${data.SEATS.map(r=>`<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td><b>${esc(r[2])}</b></td><td>${esc(r[3])}</td><td>${esc(r[4])}</td><td>${esc(r[5])}</td></tr>`).join('')}</tbody></table>`,
  faqList:data.FAQS.map((f,i)=>`<details class="glass" ${i<2?'open':''}><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join(''),
  paperList:data.PAPERS.map((x,i)=>{const pid=i===1?'salu-2027':i===2?'salu-2026':'salu-2024';return `<a class="tile" href="${routes.papers}#${pid}" data-open-paper="${pid}"><span class="pill">PAST PAPERS</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><span class="tile-view">Open Past Papers <span aria-hidden="true">→</span></span></a>`;}).join(''),
  resultsBox:data.RESULTS.length?`<table><tr><th>Name</th><th>Test ID</th><th>Marks</th><th>City</th><th>Test</th></tr>${data.RESULTS.map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.id)}</td><td>${esc(r.marks)}</td><td>${esc(r.city||'')}</td><td>${esc(r.test||'')}</td></tr>`).join('')}</table>`:'<div class="empty">Mock test results will appear here after the next scheduled community test.</div>'
};
let changed=0;
let sitemap=read('sitemap.xml');
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
for(const [key,m] of Object.entries(meta)){
  const file=key==='home'?'index.html':routes[key];
  const old=read(file);let doc=old;
  for(const [id,markup] of Object.entries(snapshots))doc=inner(doc,id,markup);
  if(key==='guidance')doc=doc.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,(_,start,body,end)=>{
    const schema=JSON.parse(body);
    schema['@graph'].find(n=>n['@type']==='FAQPage').mainEntity=data.FAQS.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}));
    return start+JSON.stringify(schema,null,2)+end;
  });
  if(doc!==old){
    write(file,doc);changed++;
    sitemap=sitemap.replace(/<url>[\s\S]*?<\/url>/g,entry=>entry.includes('<loc>'+m.canonical+'</loc>')?entry.replace(/<lastmod>[^<]*<\/lastmod>/,'<lastmod>'+today+'</lastmod>'):entry);
  }
}
write('sitemap.xml',sitemap);
// Refresh the service worker version when source content or application assets change.
const digest=crypto.createHash('sha256').update(read('data.js')+read('manifest.webmanifest')+read(appPath)).digest('hex').slice(0,12);
const worker=read('sw.js').replace(/salu-community-seo-[a-f0-9]{12}/,'salu-community-seo-'+digest);
write('sw.js',worker);
console.log(`Refreshed static content in ${changed} pages. Upload the complete folder, including data.js and sw.js.`);
