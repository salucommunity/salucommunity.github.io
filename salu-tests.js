/* SALU test library: shared schema, atomic bulk parsing, scoring and static catalogue. */
(function(g){
  'use strict';
  const clone=x=>JSON.parse(JSON.stringify(x)),text=x=>String(x==null?'':x).trim();
  const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function slug(x){return text(x).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)||'test';}
  function hash(x){let n=2166136261;for(const c of String(x)){n^=c.codePointAt(0);n=Math.imul(n,16777619);}return (n>>>0).toString(36);}
  const id=x=>/^[a-zA-Z0-9_-]{1,80}$/.test(x||'')?x:slug(x);
  function answerIndex(value,options,zeroBased){
    if(zeroBased){const n=Number(value);if(Number.isInteger(n)&&n>=0&&n<options.length)return n;}
    const a=text(value).replace(/^(?:answer|correct(?: answer)?)\s*[:=-]\s*/i,'').replace(/^[\[(]|[\]).]$/g,'').trim();
    if(/^[A-F]$/i.test(a)){const n=a.toUpperCase().charCodeAt(0)-65;if(n<options.length)return n;}
    if(/^[1-6]$/.test(a)&&Number(a)<=options.length)return Number(a)-1;
    const n=options.findIndex(x=>text(x).toLocaleLowerCase()===a.toLocaleLowerCase());if(a&&n>=0)return n;
    throw new Error('Correct answer must identify one of the supplied options.');
  }
  function question(input,index){
    let x=input;if(Array.isArray(x))x={text:x[0],options:x[1],answerIndex:x[2],explanation:x[3]||''};
    if(!x||typeof x!=='object')throw new Error('Question '+(index+1)+' is not a question record.');
    const t=text(x.text??x.question??x.t),raw=x.options??x.o??[x.optionA??x.a,x.optionB??x.b,x.optionC??x.c,x.optionD??x.d];
    const opts=Array.isArray(raw)?Array.from(raw,v=>text(Array.isArray(v)?v[1]:v)):[];
    while(opts.length&&!opts.at(-1))opts.pop();
    if(!t||t.length>12000)throw new Error('Enter question text, up to 12,000 characters.');
    if(opts.length<2||opts.length>6||opts.some(v=>!v||v.length>4000))throw new Error('Supply 2 to 6 non-empty options, up to 4,000 characters each.');
    const hasIndex=x.answerIndex!==undefined||x.correctIndex!==undefined;
    const ai=answerIndex(hasIndex?(x.answerIndex??x.correctIndex):(x.answer??x.correctAnswer??x.correct??(Array.isArray(x.o)?x.c:undefined)),opts,hasIndex);
    return {id:id(x.id||'q-'+hash(t+'\n'+opts.join('\n'))),text:t,options:opts,answer:ai,subject:text(x.subject??x.s)||'General',explanation:text(x.explanation??x.n).slice(0,8000),rtl:!!x.rtl||!!x.r||/[\u0590-\u08ff]/.test(t)};
  }
  function canonicalQuestion(q){return question({id:q.id,text:q.text,options:q.options,answerIndex:q.answer,subject:q.subject,explanation:q.explanation,rtl:q.rtl});}
  const signature=q=>text(q.text).replace(/\s+/g,' ').toLocaleLowerCase()+'\n'+q.options.map(x=>text(x).replace(/\s+/g,' ').toLocaleLowerCase()).join('\n');
  function defaults(qs){return {version:1,categories:[{id:'general',title:'General practice',description:'Practice SALU Community questions and build confidence for your next test.',visible:true}],tests:[{id:'community-practice',categoryId:'general',title:'SALU Community Practice Test',description:'The original community mock test, with instant scoring and answer review.',duration:20,visible:true,legacy:true,relatedIds:[],questions:(qs||[]).map(question)}],branding:{name:'SALU Community',tagline:'Independent student guidance and test preparation',website:'https://salucommunity.github.io/',contact:'03443482883',footer:'Independent student-support platform. Not an official university examination.'}};}
  function bank(value,qs){
    const b=value?clone(value):defaults(qs),cats=Array.isArray(b.categories)?b.categories:[],tests=Array.isArray(b.tests)?b.tests:[];
    if(b.jobsVersion!==1&&!cats.some(c=>c.area==='jobs')){let key='jobs-general';while(cats.some(c=>c.id===key))key+='-1';cats.push({id:key,title:'General Jobs Preparation',description:'Mock tests, past papers and study material for job exams.',visible:true,area:'jobs'});}
    if(cats.length>80||tests.length>300)throw new Error('This library supports up to 80 categories and 300 tests.');
    const seen=new Set(),categories=cats.map(c=>{const k=id(c.id||c.title);if(seen.has(k))throw new Error('Duplicate category ID: '+k);seen.add(k);if(!text(c.title))throw new Error('Each category needs a heading.');return {id:k,title:text(c.title).slice(0,160),description:text(c.description).slice(0,3000),visible:c.visible!==false,area:c.area==='jobs'?'jobs':'main'};});
    const names=new Set();let total=0;
    const out=tests.map(t=>{
      const k=id(t.id||t.title);if(names.has(k))throw new Error('Duplicate test ID: '+k);names.add(k);
      if(!seen.has(t.categoryId))throw new Error('Choose an existing category for '+text(t.title)+'.');
      const questions=(t.legacy&&Array.isArray(qs)?qs.map(question):(t.questions||[]).map(canonicalQuestion));
      total+=questions.length;if(questions.length>3000||total>15000)throw new Error('Use up to 3,000 questions per test and 15,000 questions per library.');
      const duration=Number(t.duration??20);if(!Number.isFinite(duration)||duration<0||duration>360)throw new Error('Test duration must be between 0 and 360 minutes.');
      if(!text(t.title))throw new Error('Each test needs a title.');
      return {id:k,categoryId:t.categoryId,title:text(t.title).slice(0,200),description:text(t.description).slice(0,4000),kind:t.kind==='past-paper'?'past-paper':'mock',duration,visible:t.visible!==false,legacy:!!t.legacy,relatedIds:Array.isArray(t.relatedIds)?[...new Set(t.relatedIds.map(id))].filter(x=>x!==k):[],questions,updatedAt:text(t.updatedAt),pdfUrl:validLink(t.pdfUrl||'')};
    });
    const d=defaults([]).branding,branding={};for(const key of Object.keys(d))branding[key]=text(b.branding?.[key]??d[key]).slice(0,1000);
    const resourceIds=new Set(),resources=(Array.isArray(b.resources)?b.resources:[]).map(r=>{const k=id(r.id||r.title);if(resourceIds.has(k))throw new Error('Duplicate resource ID.');resourceIds.add(k);if(!seen.has(r.categoryId)||!text(r.title)||!text(r.url))throw new Error('Each download needs a category, title and link.');return {id:k,categoryId:r.categoryId,title:text(r.title).slice(0,200),description:text(r.description).slice(0,4000),kind:r.kind==='past-paper'?'past-paper':'material',url:validLink(r.url),cover:r.cover?validLink(r.cover):'',fileName:text(r.fileName).slice(0,220),mime:text(r.mime).slice(0,100),size:Math.max(0,Number(r.size)||0),visible:r.visible!==false,updatedAt:text(r.updatedAt)};});
    if(resources.length>2000)throw new Error('Use up to 2,000 material/download entries.');
    return {version:1,jobsVersion:1,categories,tests:out,resources,branding};
  }
  function validLink(x){const s=text(x);if(!s)return '';if(/^(https?:\/\/|\.?\.?\/)/i.test(s)||(!/^[a-z][\w+.-]*:/i.test(s)&&!s.startsWith('//')&&!/[\u0000-\u0020<>"\\]/.test(s)))return s;throw new Error('Use a normal web URL or page filename.');}
  function fromState(state){return bank(state?.EDITOR?.mockBank??state?.SITE_EDITOR?.mockBank,Array.isArray(state?.QS)?state.QS:[]);}
  function visible(b,area='main'){const cats=new Set(b.categories.filter(c=>c.visible&&(c.area||'main')===area).map(c=>c.id));return b.tests.filter(t=>t.visible&&t.questions.length&&cats.has(t.categoryId));}
  function score(test,answers){let correct=0,answered=0;test.questions.forEach((q,i)=>{const n=answers[i];if(Number.isInteger(n)&&n>=0&&n<q.options.length){answered++;if(n===q.answer)correct++;}});return {correct,answered,total:test.questions.length,unanswered:test.questions.length-answered,percentage:test.questions.length?Math.round(correct/test.questions.length*10000)/100:0};}
  function mergeQuestions(current,incoming,replace){
    const list=replace?[]:current.map(canonicalQuestion),seen=new Map(list.map(q=>[signature(q),q]));let duplicates=0;
    for(const raw of incoming){const q=canonicalQuestion(raw),key=signature(q),old=seen.get(key);if(old){if(old.answer!==q.answer)throw new Error('Conflicting answer for duplicate question: '+q.text.slice(0,100));duplicates++;continue;}seen.set(key,q);list.push(q);}
    if(list.length>3000)throw new Error('A test supports up to 3,000 questions.');return {questions:list,added:list.length-(replace?0:current.length),duplicates};
  }
  function csv(textValue,delimiter){
    const rows=[];let row=[],cell='',quoted=false;const s=String(textValue).replace(/^\uFEFF/,'');
    for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(quoted&&s[i+1]==='"'){cell+='"';i++;}else if(quoted||!cell)quoted=!quoted;else cell+=c;}
      else if(c===delimiter&&!quoted){row.push(cell);cell='';}
      else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&s[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))rows.push(row);row=[];cell='';}else cell+=c;}
    if(quoted)throw new Error('A CSV quote was not closed.');row.push(cell);if(row.some(x=>x.trim()))rows.push(row);return rows;
  }
  const norm=x=>text(x).toLowerCase().replace(/[^a-z0-9]/g,'');
  function rowsToGroups(rows,options){
    if(!rows.length)throw new Error('This file is empty.');
    const headers=rows[0].map(norm),col=(...names)=>headers.findIndex(h=>names.includes(h));
    const qi=col('question','questiontext','text','q'),ai=col('answer','correctanswer','correct','answerkey');
    if(qi<0||ai<0)throw new Error('Use columns Question, A, B, C, D and Answer. Download the CSV template.');
    const opts='abcdef'.split('').map(l=>col(l,'option'+l,'choice'+l));
    if(opts[0]<0||opts[1]<0)throw new Error('The file needs at least option columns A and B.');
    const ti=col('test','testtitle','testname'),ci=col('category','categorytitle'),di=col('description','testdescription'),mi=col('duration','minutes'),si=col('subject','section'),ei=col('explanation','reason');
    const groups=new Map(),issues=[];
    rows.slice(1).forEach((r,i)=>{if(!text(r[qi]))return;const title=text(r[ti])||options.title||'Imported test',category=text(r[ci])||options.category||'General practice',key=category+'\n'+title;
      if(!groups.has(key))groups.set(key,{title,category,description:text(r[di])||options.description||'',duration:text(r[mi])?Number(r[mi]):options.duration??20,questions:[]});
      try{groups.get(key).questions.push(question({text:r[qi],options:opts.map(n=>n<0?'':r[n]||''),answer:r[ai],subject:si<0?options.subject:r[si],explanation:ei<0?'':r[ei]},i));}catch(e){issues.push('Row '+(i+2)+': '+e.message);}
    });return {groups:[...groups.values()],issues};
  }
  function jsonGroups(value,options){
    const source=Array.isArray(value)?(value.length&&value[0]&&typeof value[0]==='object'&&!Array.isArray(value[0])&&Array.isArray(value[0].questions)?value:[{questions:value}]):Array.isArray(value.tests)?value.tests:[value];
    const issues=[],groups=source.map((t,k)=>{const questions=[],arr=t.questions||t.q||[];if(!Array.isArray(arr))throw new Error('The JSON questions field must be an array.');arr.forEach((q,i)=>{try{questions.push(q&&Number.isInteger(q.answer)&&q.text?canonicalQuestion(q):question(q,i));}catch(e){issues.push('Test '+(k+1)+', question '+(i+1)+': '+e.message);}});return {title:text(t.title||t.t)||options.title||'Imported test',category:text(t.category||t.categoryTitle)||options.category||'General practice',description:text(t.description||t.s)||options.description||'',duration:Number(t.duration??t.m??options.duration??20),questions};});return {groups,issues};
  }
  function textGroup(value,options){
    const group={title:options.title||'Imported test',category:options.category||'General practice',description:options.description||'',duration:options.duration??20,questions:[]};
    const issues=[],records=[],keys=new Map(),preface=[];let current=null,subject=options.subject||'General',keyMode=false,explain=false;
    const source=String(value).replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').replace(/[\u00a0\u202f]/g,' ').replace(/\s+(?=\(?[A-F][).:]\s)/g,'\n');
    for(const raw of source.split('\n')){const line=raw.trim();if(!line)continue;
      const meta=line.match(/^(Test(?: title)?|Category|Description|Duration|Minutes)\s*:\s*(.*)$/i);
      if(meta&&!current&&!records.length){const k=meta[1].toLowerCase();if(k.startsWith('test'))group.title=meta[2];else if(k==='category')group.category=meta[2];else if(k==='description')group.description=meta[2];else group.duration=Number(meta[2].replace(/\s*(mins?|minutes?)\.?$/i,''));continue;}
      if(/^answer\s*key\s*[:=-]?/i.test(line)){keyMode=true;for(const m of line.matchAll(/(\d+)\s*[-.:=)]\s*([A-F])\b/gi))keys.set(Number(m[1]),m[2]);continue;}
      if(keyMode){let found=false;for(const m of line.matchAll(/(\d+)\s*[-.:=)]\s*([A-F])\b/gi)){keys.set(Number(m[1]),m[2]);found=true;}if(found)continue;keyMode=false;}
      const sect=line.match(/^(?:\[\s*(?:Subject\s*:\s*)?(.+?)\s*\]|#{1,3}\s+(.+))$/);if(sect){subject=sect[1]||sect[2];continue;}
      const q=line.match(/^(?:Q(?:uestion)?\s*)?(\d{1,4})\s*[.)\]:-]\s*(.+)$/i);
      if(q){if(current)records.push(current);current={number:Number(q[1]),text:q[2],options:[],answer:'',subject,explanation:''};explain=false;continue;}
      const opt=line.match(/^[\[(]?([A-F])[\]).:\-]\s*(.*)$/i);if(opt&&current){const n=opt[1].toUpperCase().charCodeAt(0)-65;current.options[n]=opt[2];explain=false;continue;}
      const ans=line.match(/^(?:Correct(?:\s+answer)?|Answer|Ans)\s*[:=\-]\s*(.+)$/i);if(ans&&current){current.answer=ans[1];explain=false;continue;}
      const exp=line.match(/^(?:Explanation|Reason|Solution)\s*[:=\-]\s*(.*)$/i);if(exp&&current){current.explanation=exp[1];explain=true;continue;}
      if(current){if(explain)current.explanation+='\n'+line;else if(current.options.length)current.options[current.options.length-1]+=' '+line;else current.text+=' '+line;}
      else if(/^[\[(]?[A-F][\]).:]\s|^(?:Answer|Correct|Ans)\s*[:=]|[?؟]$/i.test(line))issues.push('Number every question before its options: '+line.slice(0,100));
      else preface.push(line);
    }
    if(current)records.push(current);
    for(const [i,r] of records.entries()){try{if(!r.answer&&keys.has(r.number))r.answer=keys.get(r.number);group.questions.push(question(r,i));}catch(e){issues.push('Question '+r.number+': '+e.message);}}
    return {groups:[group],issues,warnings:preface.length?['Ignored '+preface.length+' heading/instruction line(s) before the first question. Review the preview.']:[]};
  }
  function parse(value,format,options={}){
    if(String(value).length>6*1024*1024)throw new Error('Import up to 6 MB of question text at once.');
    let result;const s=String(value).trim(),f=String(format||'').toLowerCase();
    if(f==='json')result=jsonGroups(JSON.parse(s),options);
    else if(!f&&/^[\[{]/.test(s)){let value,valid=true;try{value=JSON.parse(s);}catch{valid=false;}result=valid?jsonGroups(value,options):textGroup(s,options);}
    else if(f==='csv'||f==='tsv'||(!f&&/^.*(?:question|questiontext).*[,\t].*(?:answer|correct)/im.test(s.split('\n')[0])))result=rowsToGroups(csv(s,f==='tsv'||s.split('\n')[0].includes('\t')?'\t':','),options);
    else result=textGroup(s,options);
    const count=result.groups.reduce((n,t)=>n+t.questions.length,0);if(count>3000)result.issues.push('Import at most 3,000 questions at once.');if(!count)result.issues.push('No complete questions were found. Use the provided template, including answer letters.');
    result.groups.forEach(t=>{if(!Number.isFinite(t.duration)||t.duration<0||t.duration>360)result.issues.push('Duration for '+t.title+' must be 0 to 360 minutes.');});
    return {...result,count,warnings:result.warnings||[]};
  }
  function cards(tests,b){return tests.map(t=>{const c=b.categories.find(x=>x.id===t.categoryId);return `<article class="tile mock-test-card"><span class="pill">${esc(c?.title||'Mock test')}</span><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><small>${t.questions.length} questions · ${t.duration?t.duration+' minutes':'Untimed'}</small><a class="btn" href="#test=${encodeURIComponent(t.id)}" data-mock-open="${esc(t.id)}">Open test</a></article>`;}).join('');}
  function catalogue(b,query,category){const q=text(query).toLocaleLowerCase(),all=visible(b);return b.categories.filter(c=>c.visible&&(!category||c.id===category)).map(c=>{const items=all.filter(t=>t.categoryId===c.id&&(!q||(t.title+' '+t.description+' '+c.title+' '+c.description).toLocaleLowerCase().includes(q)));return items.length?`<section class="mock-category" data-mock-category-section="${esc(c.id)}"><h2>${esc(c.title)}</h2><p class="sub">${esc(c.description)}</p><div class="tiles mock-test-grid">${cards(items,b)}</div></section>`:'';}).join('')||'<p class="empty">No published tests match this selection.</p>';}
  function staticHTML(b){return `<div class="mock-filterbar"><label>Find a test<input id="mockSearch" type="search" placeholder="Search tests or categories"></label><label>Category<select id="mockCategory"><option value="">All categories</option>${b.categories.filter(c=>c.visible).map(c=>`<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('')}</select></label></div><div id="mockActive" hidden></div><div id="mockCatalogue">${catalogue(b)}</div>`;}
  function prepareDocument(doc,state){
    if(doc.body.dataset.activePage!=='mocktests')return;
    const section=doc.getElementById('v-mocktests');if(!section)return;
    const quiz=doc.getElementById('quiz');if(quiz){const box=quiz.parentElement;box.hidden=true;box.setAttribute('data-mock-legacy','');box.style.display='none';}
    let host=doc.getElementById('saluMockLibrary');if(!host){host=doc.createElement('div');host.id='saluMockLibrary';section.appendChild(host);}host.innerHTML=staticHTML(fromState(state));
    let script=doc.getElementById('salu-test-library-script');if(!script){script=doc.createElement('script');script.id='salu-test-library-script';script.setAttribute('defer','');script.src='salu-tests.js';doc.head.appendChild(script);}
    let style=doc.getElementById('salu-test-library-style');if(!style){style=doc.createElement('style');style.id='salu-test-library-style';doc.head.appendChild(style);}style.textContent=g.SALU_TEST_CSS||'';
  }
  g.SaluTests={clone,text,esc,slug,hash,question,canonicalQuestion,signature,defaults,bank,fromState,visible,score,mergeQuestions,csv,rowsToGroups,parse,cards,catalogue,staticHTML,prepareDocument,validLink};
})(typeof window!=='undefined'?window:globalThis);

/* Separate Jobs Preparation page, categories and downloadable material. */
(function(g){
 'use strict';const T=g.SaluTests,E=T.esc;
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3"/></svg>';
 const defaults={title:'Jobs Preparation | Mock Tests, Past Papers & PDFs | SALU Community',desc:'Prepare for job exams with SALU Community: category-wise mock tests, solved past papers, study material and downloadable PDFs.',canonical:'https://salucommunity.github.io/jobs-preparation.html'};
 function settings(e={}){return {heading:e.texts?.['jobs-t001']||'Jobs Preparation',description:e.texts?.['jobs-t002']||'Prepare for job exams with category-wise mock tests, past papers and downloadable study material.',showOnHome:e.jobsPage?.showOnHome!==false};}
 function resources(b,cat,query,kind){const q=(query||'').toLowerCase();return (b.resources||[]).filter(r=>r.visible&&r.categoryId===cat.id&&(!kind||r.kind===kind)&&(!q||(r.title+' '+r.description+' '+cat.title+' '+cat.description).toLowerCase().includes(q)));}
 function resourceCards(items){return items.map(r=>`<article class="tile mock-test-card jobs-resource">${r.cover?`<img src="${E(T.validLink(r.cover))}" alt="${E(r.title)}" width="640" height="360" loading="lazy" decoding="async">`:''}<span class="pill">${r.kind==='past-paper'?'PAST PAPER':'STUDY MATERIAL'}</span><h3>${E(r.title)}</h3><p>${E(r.description)}</p>${r.size?`<small>${Math.ceil(r.size/1024)} KB</small>`:''}<div class="btns"><a class="btn" href="${E(T.validLink(r.url))}" download="${E(r.fileName||'')}">Download</a><a class="btn alt" href="${E(T.validLink(r.url))}" target="_blank" rel="noopener noreferrer">Open</a></div></article>`).join('');}
 T.catalogue=function(b,query,category,area='main',kind=''){
  const q=(query||'').toLowerCase(),all=T.visible(b,area);
  return b.categories.filter(c=>c.visible&&(c.area||'main')===area&&(!category||c.id===category)).map(c=>{
   const tests=all.filter(t=>t.categoryId===c.id&&(!q||(t.title+' '+t.description+' '+c.title+' '+c.description).toLowerCase().includes(q))),res=resources(b,c,query),mock=tests.filter(t=>t.kind!=='past-paper'),papers=tests.filter(t=>t.kind==='past-paper');
   const sections=area==='jobs'?((!kind||kind==='mock')&&mock.length?'<h3>Mock Tests</h3><div class="tiles mock-test-grid">'+T.cards(mock,b)+'</div>':'')+((!kind||kind==='past-paper')&&(papers.length||res.some(r=>r.kind==='past-paper'))?'<h3>Past Papers</h3><div class="tiles mock-test-grid">'+T.cards(papers,b)+resourceCards(res.filter(r=>r.kind==='past-paper'))+'</div>':'')+((!kind||kind==='material')&&res.some(r=>r.kind==='material')?'<h3>Preparation Material</h3><div class="tiles mock-test-grid">'+resourceCards(res.filter(r=>r.kind==='material'))+'</div>':''):(tests.length?'<div class="tiles mock-test-grid">'+T.cards(tests,b)+'</div>':'');
   if(!sections&&(q||category||kind))return '';
   if(!sections&&area!=='jobs')return '';
   return `<section class="mock-category" data-mock-category-section="${E(c.id)}"><h2>${E(c.title)}</h2><p class="sub">${E(c.description)}</p>${sections||'<div class="note">Preparation material will appear here when it is published.</div>'}</section>`;
  }).join('')||(area==='jobs'?'<p class="empty">No published preparation content matches this selection.</p>':'<p class="empty">No published tests match this selection.</p>');
 };
 T.staticHTML=function(b,area='main'){return `<div class="mock-filterbar ${area==='jobs'?'jobs-filterbar':''}"><label>Search ${area==='jobs'?'jobs preparation':'tests'}<input id="mockSearch" type="search" placeholder="Search tests, papers or material"></label><label>Category<select id="mockCategory"><option value="">All categories</option>${b.categories.filter(c=>c.visible&&(c.area||'main')===area).map(c=>`<option value="${E(c.id)}">${E(c.title)}</option>`).join('')}</select></label>${area==='jobs'?'<label>Content<select id="mockKind"><option value="">All preparation</option><option value="mock">Mock tests</option><option value="past-paper">Past papers</option><option value="material">Study material</option></select></label>':''}</div><div id="mockActive" hidden></div><div id="mockCatalogue">${T.catalogue(b,'','',area)}</div>`;};
 function navigation(doc,e={}){
  for(const [selector,attr] of [['header [data-top="mocktests"]','data-top'],['#panel [data-v="mocktests"]','data-v']]){const ref=doc.querySelector(selector);if(ref&&!doc.querySelector('['+attr+'="jobs"]')){const a=ref.cloneNode(true);a.setAttribute(attr,'jobs');a.href='jobs-preparation.html';a.innerHTML=attr==='data-v'?icon+'<span>Jobs Preparation</span>':'Jobs Prep';ref.after(a);}}
  const tiles=doc.getElementById('tiles');if(tiles){const existing=[...tiles.querySelectorAll('a')].find(a=>(a.getAttribute('href')||'').split('#')[0].endsWith('jobs-preparation.html'));const item=e.navigation?.find(x=>x.id==='jobs');if(!settings(e).showOnHome||item?.visible===false){existing?.remove();}else if(!existing){const div=doc.createElement('div');div.innerHTML=`<a class="tile" href="jobs-preparation.html" style="--ic:#1552be"><span class="tile-icon" aria-hidden="true">${icon}</span><h3>Jobs Preparation</h3><p>Mock tests, past papers and downloadable preparation material for job exams.</p><span class="tile-view">View <span aria-hidden="true">→</span></span></a>`;tiles.appendChild(div.firstElementChild);}}
 }
 function core(doc){const el=doc.getElementById('salu-app');if(!el)return;let s=el.textContent;
  s=s.replace(/const PAGE_URL = (\{[^\n]+\});/,(_,raw)=>{const urls=JSON.parse(raw);urls.jobs='jobs-preparation.html';return 'const PAGE_URL = '+JSON.stringify(urls)+';';});
  if(!/\bjobs\s*:\s*['"]<svg/.test(s))s=s.replace('const ICONS = {','const ICONS = {\n  jobs: '+JSON.stringify(icon)+',');
  if(!s.includes('["jobs", "Jobs Preparation"]'))s=s.replace('const VIEWS = [','const VIEWS = [\n  ["jobs", "Jobs Preparation"],');
  s=s.replace('["entry", "papers", "mocktests", "results"]','["entry", "papers", "mocktests", "jobs", "results"]');
  s=s.replace(/const TILES = (\[[\s\S]*?\]);/,(_,raw)=>{const tiles=JSON.parse(raw);if(!tiles.some(x=>x[0]==='jobs'))tiles.push(['jobs','Jobs Preparation','Mock tests, past papers and downloadable material for job exams.']);return 'const TILES = '+JSON.stringify(tiles)+';';});
  el.textContent=s;
 }
 function shell(e){const p=settings(e);return `<nav class="crumb-nav" aria-label="Breadcrumb"><a class="crumb-home" href="./">Home</a><span class="crumb-sep" aria-hidden="true">›</span><span class="crumb-cur" aria-current="page">Jobs Preparation</span></nav><div class="sec-head"><div><h1 class="page-title"><span data-cms-text="jobs-t001">${E(p.heading)}</span></h1><p class="sub"><span data-cms-text="jobs-t002">${E(p.description)}</span></p></div></div><div id="saluJobsLibrary"></div>`;}
 function makeDocument(source,state,meta){const doc=new DOMParser().parseFromString(source,'text/html');if(doc.documentElement.dataset.saluCms!=='2')throw new Error('The installed website needs the compatible public page template.');const old=doc.querySelector('section.view');if(!old)throw new Error('The public page template is missing its main section.');old.id='v-jobs';old.className='view on';old.innerHTML=shell(state.EDITOR||{});doc.body.dataset.activePage='jobs';const ld=doc.querySelector('script[type="application/ld+json"]');if(ld){const data=JSON.parse(ld.textContent);for(const node of data['@graph']||[]){if(node['@type']==='BreadcrumbList'&&node.itemListElement?.[1])node.itemListElement[1].name='Jobs Preparation';if(node['@id']?.endsWith('#webpage'))node['@type']='WebPage';}ld.textContent=JSON.stringify(data).replace(/</g,'\\u003c');}return '<!DOCTYPE html>\n'+doc.documentElement.outerHTML;}
 const oldPrepare=T.prepareDocument;
 T.prepareDocument=function(doc,state){
  const e=state.EDITOR||{};core(doc);navigation(doc,e);oldPrepare(doc,state);
  const runtime=doc.getElementById('salu-cms-runtime');if(runtime&&g.SALU_CMS_RUNTIME_SOURCE){const prefix=runtime.textContent.match(/window\.SALU_CMS_DEFAULTS = .*?;\n/);if(prefix)runtime.textContent=prefix[0]+g.SALU_CMS_RUNTIME_SOURCE;}
  const area=doc.body.dataset.activePage==='jobs'?'jobs':'main',host=doc.getElementById(area==='jobs'?'saluJobsLibrary':'saluMockLibrary');if(host)host.innerHTML=T.staticHTML(T.fromState(state),area);
  if(area==='jobs'){const p=settings(e);for(const [key,val] of [['jobs-t001',p.heading],['jobs-t002',p.description]]){const el=doc.querySelector('[data-cms-text="'+key+'"]');if(el)el.textContent=val;}}
  let script=doc.getElementById('salu-test-library-script');if(!script){script=doc.createElement('script');script.id='salu-test-library-script';script.setAttribute('defer','');script.src='salu-tests.js';doc.head.appendChild(script);}
  if(host){let style=doc.getElementById('salu-test-library-style');if(!style){style=doc.createElement('style');style.id='salu-test-library-style';doc.head.appendChild(style);}style.textContent=g.SALU_TEST_CSS||'';}
 };
 T.makeJobsDocument=makeDocument;
 g.SaluJobs={settings,navigation,core,makeDocument,defaults,icon};
})(typeof window!=='undefined'?window:globalThis);

/* Public mock-test categories, timed attempts, related tests and PDF actions. */
(function(g){
 'use strict';
 function state(){return {EDITOR:typeof SITE_EDITOR!=='undefined'?SITE_EDITOR:{},QS:typeof QS!=='undefined'?QS:[]};}
 function mount(){
  const T=g.SaluTests;g.SaluJobs?.navigation(document,state().EDITOR);g.addEventListener('hashchange',()=>g.SaluJobs?.navigation(document,state().EDITOR));const area=document.body.dataset.activePage==='jobs'?'jobs':'main',host=document.getElementById(area==='jobs'?'saluJobsLibrary':'saluMockLibrary');if(!T||!host)return;
  const b=T.fromState(state()),tests=T.visible(b,area),$=id=>document.getElementById(id),E=T.esc;
  let current=null,answers=[],started=false,finished=false,deadline=0,tick=null;
  host.innerHTML=T.staticHTML(b,area);
  const filter=()=>{$('mockCatalogue').innerHTML=T.catalogue(b,$('mockSearch').value,$('mockCategory').value,area,$('mockKind')?.value||'');};
  $('mockSearch').addEventListener('input',filter);$('mockCategory').addEventListener('change',filter);
  $('mockKind')?.addEventListener('change',filter);
  function related(t){const available=tests.filter(x=>x.id!==t.id),chosen=available.filter(x=>t.relatedIds.includes(x.id)),same=available.filter(x=>x.categoryId===t.categoryId&&!chosen.some(y=>y.id===x.id));return [...chosen,...same].slice(0,6);}
  function show(id){
   const t=tests.find(x=>x.id===id);if(!t){if(id)$('mockActive').innerHTML='<div class="note">This test is not currently published. Choose another test below.</div>';$('mockActive').hidden=!id;return;}
   clearInterval(tick);tick=null;current=t;answers=[];started=false;finished=false;
   const c=b.categories.find(x=>x.id===t.categoryId),rel=related(t);
   $('mockActive').hidden=false;$('mockActive').innerHTML=`<section class="card mock-detail"><span class="pill">${E(c.title)}</span><h2>${E(t.title)}</h2><p class="sub">${E(t.description)}</p><p class="mock-meta">${t.questions.length} questions · ${t.duration?t.duration+' minutes':'Untimed'} · One mark per correct answer</p><div class="btns"><button type="button" class="btn" data-mock-start>Start test</button><button type="button" class="btn alt" data-mock-pdf="paper">Download question PDF</button><button type="button" class="btn alt" data-mock-pdf="solved">Download solved PDF</button>${t.pdfUrl?`<a class="btn alt" href="${E(T.validLink(t.pdfUrl))}" target="_blank" rel="noopener noreferrer">Original PDF</a>`:''}</div><p id="mockPdfStatus" class="mock-status" aria-live="polite"></p><div id="mockAttempt"></div></section>${rel.length?`<section class="mock-related"><h2>Related tests</h2><div class="tiles mock-test-grid">${T.cards(rel,b)}</div></section>`:''}`;
  }
  function start(){
   if(!current)return;started=true;finished=false;answers=Array(current.questions.length).fill(null);deadline=current.duration?Date.now()+current.duration*60000:0;
   $('mockAttempt').innerHTML=`<div class="mock-attempt-bar"><strong id="mockTimer">${deadline?'Time remaining':'Untimed practice'}</strong><span id="mockProgress">0 / ${answers.length} answered</span></div><form id="mockQuestionForm">${current.questions.map((q,i)=>`<fieldset class="q mock-question"${q.rtl?' dir="rtl"':''}><legend><span class="pill">${E(q.subject)}</span><span>${i+1}. ${g.SaluCMS?g.SaluCMS.inlineText(q.text):E(q.text)}</span></legend>${q.options.map((o,j)=>`<label class="opt"><input type="radio" name="mock-q-${i}" value="${j}" data-mock-answer="${i}"><span><b>${String.fromCharCode(65+j)}.</b> ${g.SaluCMS?g.SaluCMS.inlineText(o):E(o)}</span></label>`).join('')}<div class="mock-explanation" id="mockExplanation${i}" hidden></div></fieldset>`).join('')}<div class="btns"><button type="submit" class="btn" id="mockSubmit">Submit test</button><button type="button" class="btn alt" data-mock-reset>Reset test</button></div></form><div id="mockResult" aria-live="polite"></div>`;
   $('mockQuestionForm').addEventListener('change',e=>{const i=e.target.dataset.mockAnswer;if(i===undefined)return;answers[Number(i)]=Number(e.target.value);const q=e.target.closest('fieldset');q.querySelectorAll('.opt').forEach(l=>l.classList.toggle('sel',!!l.querySelector('input').checked));$('mockProgress').textContent=answers.filter(Number.isInteger).length+' / '+answers.length+' answered';});
   $('mockQuestionForm').addEventListener('submit',e=>{e.preventDefault();finish(false);});
   updateTimer();clearInterval(tick);if(deadline)tick=setInterval(updateTimer,1000);
   $('mockAttempt').scrollIntoView?.({behavior:'smooth',block:'start'});
  }
  function updateTimer(){if(!deadline||!started||finished)return;const remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('mockTimer').textContent='Time left: '+Math.floor(remaining/60)+':'+String(remaining%60).padStart(2,'0');if(!remaining)finish(true);}
  function finish(expired){
   if(!current||finished)return;finished=true;clearInterval(tick);const s=T.score(current,answers);
   current.questions.forEach((q,i)=>{const field=$('mockExplanation'+i)?.closest('fieldset');if(!field)return;field.querySelectorAll('input').forEach(r=>{r.disabled=true;const v=Number(r.value);r.parentElement.classList.toggle('ok',v===q.answer);r.parentElement.classList.toggle('no',r.checked&&v!==q.answer);});const box=$('mockExplanation'+i);box.hidden=false;box.innerHTML=`<b>Correct answer: ${String.fromCharCode(65+q.answer)}.</b> ${E(q.options[q.answer])}${q.explanation?'<p>'+E(q.explanation)+'</p>':''}`;});
   $('mockSubmit').disabled=true;$('mockResult').innerHTML=`<div class="out"><p>${expired?'Time is up. Your test was submitted automatically.':'Test complete'}</p><div class="big">${s.correct} / ${s.total}</div><p>${s.percentage}% · ${s.answered} answered · ${s.unanswered} unanswered</p><p>Correct answers and explanations are shown above.</p></div>`;
   $('mockResult').scrollIntoView?.({behavior:'smooth',block:'center'});
  }
  let pdfPromise;
  async function pdf(mode,button){
   if(!current)return;const captured=current;button.disabled=true;$('mockPdfStatus').textContent='Preparing your branded PDF…';
   try{
    if(!g.SaluTestPDF){if(!pdfPromise)pdfPromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('salu-pdf.min.js',document.baseURI).href;script.onload=resolve;script.onerror=()=>{pdfPromise=null;reject(new Error('PDF tools could not load. Reconnect and retry.'));};document.head.appendChild(script);});await pdfPromise;}
    const category=b.categories.find(c=>c.id===captured.categoryId),blob=await g.SaluTestPDF.create(captured,{...b.branding,category:category.title},mode);
    const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download=T.slug(captured.title)+(mode==='solved'?'-solved':'-question-paper')+'.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);if($('mockPdfStatus'))$('mockPdfStatus').textContent='PDF ready · '+Math.ceil(blob.size/1024)+' KB.';
   }catch(e){if($('mockPdfStatus'))$('mockPdfStatus').textContent=e.message;}finally{button.disabled=false;}
  }
  host.addEventListener('click',e=>{const link=e.target.closest('[data-mock-open]'),button=e.target.closest('button');if(link){if(started&&!finished&&!confirm('Leave this attempt and open another test?')){e.preventDefault();return;}if(location.hash==='#test='+encodeURIComponent(link.dataset.mockOpen))show(link.dataset.mockOpen);return;}if(!button)return;if(button.hasAttribute('data-mock-start')||button.hasAttribute('data-mock-reset'))start();if(button.dataset.mockPdf)pdf(button.dataset.mockPdf,button);});
  function route(){const m=location.hash.match(/^#test=(.+)$/);if(m){try{show(decodeURIComponent(m[1]));}catch{show('invalid');}}else{$('mockActive').hidden=true;clearInterval(tick);started=false;}}
  g.addEventListener('hashchange',route);route();
  g.SaluMockLibrary={bank:()=>T.clone(b),open:show,start,finish,answers:()=>answers.slice()};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})(window);
