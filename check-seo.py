"""Offline SEO and asset audit. Run: python3 tools/check-seo.py (Node.js required)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from urllib.robotparser import RobotFileParser
from datetime import date
import hashlib, json, re, subprocess, xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parent.parent
BASE='https://salucommunity.github.io/'
issues=[]
checks=0
def check(ok,message):
    global checks
    checks+=1
    if not ok:issues.append(message)

class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.tags=[];self.titles=[];self.headings=[];self.schemas=[];self.script=None;self.capture=None;self.sections=[];self.views=[]
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs);self.tags.append((tag,attrs))
        if tag=='section':
            self.sections.append(attrs.get('id'))
            if 'view' in attrs.get('class','').split():self.views.append(attrs)
        if tag=='title':self.capture=['title','']
        if tag=='h1':self.capture=['h1','',self.sections[-1] if self.sections else None]
        if tag=='script':self.script=[attrs.get('type'),'']
    def handle_data(self,text):
        if self.capture:self.capture[1]+=text
        if self.script:self.script[1]+=text
    def handle_endtag(self,tag):
        if tag=='section' and self.sections:self.sections.pop()
        if self.capture and tag==self.capture[0]:
            (self.titles if tag=='title' else self.headings).append(self.capture[1:]);self.capture=None
        if tag=='script' and self.script:
            if self.script[0]=='application/ld+json':self.schemas.append(json.loads(self.script[1]))
            self.script=None
    def find(self,tag,key,value):return [a for t,a in self.tags if t==tag and a.get(key)==value]

meta=json.loads((ROOT/'seo-pages.json').read_text())
files={k:('index.html' if k=='home' else urlsplit(m['canonical']).path.lstrip('/')) for k,m in meta.items()}
pages={k:Page((ROOT/file).read_text()) for k,file in files.items()}
titles=[];descriptions=[];links=0;assets=set()
for key,p in pages.items():
    file=files[key];m=meta[key]
    check(len(p.titles)==1 and p.titles[0][0]==m['title'],file+': title mismatch')
    titles.append(p.titles[0][0])
    ds=p.find('meta','name','description')
    check(len(ds)==1 and ds[0].get('content')==m['desc'],file+': description mismatch')
    descriptions.append(ds[0]['content'])
    check(len(p.views)==1 and p.views[0].get('id')=='v-'+key,file+': duplicate or incorrect page content')
    check(len(p.headings)==1 and p.headings[0][1]=='v-'+key,file+': primary heading must belong to this page')
    cs=p.find('link','rel','canonical')
    check(len(cs)==1 and cs[0].get('href')==m['canonical'],file+': canonical mismatch')
    check(p.find('meta','property','og:url')[0]['content']==m['canonical'],file+': social URL mismatch')
    check(p.find('meta','property','og:title')[0]['content']==m['title'],file+': social title mismatch')
    check(p.find('meta','name','twitter:title')[0]['content']==m['title'],file+': Twitter title mismatch')
    check('noindex' not in p.find('meta','name','robots')[0]['content'].lower(),file+': indexing blocked')
    check(p.find('meta','name','google-site-verification')[0]['content']=='3pBjnnWRUtEyjqN9CuSR9FfOV99GTGJN756mifRtomM',file+': verification changed')
    check(len(p.schemas)==1,file+': expected one JSON-LD graph')
    graph=p.schemas[0]['@graph'];webpage=next(n for n in graph if n.get('@id')==m['canonical']+'#webpage')
    check(webpage.get('url')==m['canonical'] and webpage.get('name')==m['title'],file+': schema URL or name mismatch')
    check(not any('SearchAction' in json.dumps(n) for n in graph),file+': unsupported search action')
    check(any(n['@type']=='Organization' for n in graph),file+': independent organization schema missing')
    if key!='home':
        breadcrumb=next(n for n in graph if n['@type']=='BreadcrumbList')
        check(breadcrumb['itemListElement'][-1]['item']==m['canonical'],file+': breadcrumb URL mismatch')
    for tag,a in p.tags:
        if tag=='img':
            check(bool(a.get('alt')),file+': missing image alt')
            check(int(a.get('width',0))>0 and int(a.get('height',0))>0,file+': missing image dimensions')
        attr={'a':'href','img':'src','script':'src','link':'href'}.get(tag)
        if not attr or not a.get(attr):continue
        href=a[attr];url=urlsplit(href)
        if url.scheme and not href.startswith(BASE):continue
        if url.netloc and url.netloc!=urlsplit(BASE).netloc:continue
        target=unquote(url.path).lstrip('/')
        target='index.html' if target in ('','./') else target
        check((ROOT/target).is_file(),file+': missing local target '+href)
        if tag=='a':links+=1
        else:assets.add(target)
        if tag=='script':check('defer' in a,file+': external script blocks parsing')

check(len(titles)==len(set(titles)),'Duplicate page titles')
check(len(descriptions)==len(set(descriptions)),'Duplicate meta descriptions')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap=ET.parse(ROOT/'sitemap.xml')
urls=[e.text for e in sitemap.findall('.//s:loc',ns)]
check(len(urls)==16 and set(urls)=={v['canonical'] for v in meta.values()},'Sitemap does not match all canonical URLs')
check(len(urls)==len(set(urls)),'Duplicate sitemap URLs')
for e in sitemap.findall('.//s:lastmod',ns):check(date.fromisoformat(e.text)<=date.today(),'Future sitemap date')
robots=RobotFileParser();robots.parse((ROOT/'robots.txt').read_text().splitlines())
for url in urls:check(robots.can_fetch('Googlebot',url),'Robots blocks '+url)
for asset in assets:check(robots.can_fetch('Googlebot',BASE+asset),'Robots blocks required asset '+asset)
check(robots.site_maps()==[BASE+'sitemap.xml'],'Robots sitemap directive mismatch')
manifest=json.loads((ROOT/'manifest.webmanifest').read_text())
for shortcut in manifest['shortcuts']:check((ROOT/shortcut['url'].removeprefix('./')).is_file(),'Broken PWA shortcut')
for asset in (ROOT/'assets').iterdir():
    match=re.search(r'\.([a-f0-9]{12})\.(?:css|js)$',asset.name)
    if match:check(hashlib.sha256(asset.read_bytes()).hexdigest()[:12]==match[1],'Invalid asset content hash: '+asset.name)
for js in [*ROOT.glob('*.js'),*(ROOT/'assets').glob('*.js'),*(ROOT/'tools').glob('*.mjs')]:
    result=subprocess.run(['node','--check',str(js)],capture_output=True,text=True)
    check(result.returncode==0,'JavaScript syntax: '+str(js.relative_to(ROOT))+' '+result.stderr)
app_path=next(a for a in assets if re.search(r'/site\.[a-f0-9]+\.js$',a))
app_meta=json.loads(re.search(r'const SEO_META = (.*?);\n',(ROOT/app_path).read_text()).group(1))
check(app_meta==meta,'Runtime metadata differs from static HTML')
papers_path=next(a for a in assets if 'past-papers-data.' in a)
papers=json.loads((ROOT/papers_path).read_text().removeprefix('window.SALU_PAPERS = ').rstrip().removesuffix(';'))
check(len(papers)==12 and sum(len(p['q']) for p in papers)==555,'Past paper archive changed')
faq_data=json.loads(subprocess.check_output(['node','-e','const fs=require("node:fs"),vm=require("node:vm");process.stdout.write(vm.runInNewContext(fs.readFileSync(process.argv[1],"utf8")+";JSON.stringify(FAQS)"));',str(ROOT/'data.js')],text=True))
faq_schema=next(n for n in pages['guidance'].schemas[0]['@graph'] if n['@type']=='FAQPage')
check([(q['name'],q['acceptedAnswer']['text']) for q in faq_schema['mainEntity']]==[tuple(x) for x in faq_data],'FAQ schema differs from current content')
verify=ROOT/'google3pBjnnWRUtEyjqN9CuSR9FfOV99GTGJN756mifRtomM.html'
check(verify.read_text().strip()=='google-site-verification: '+verify.name,'Google HTML verification file mismatch')

summary={'status':'PASS' if not issues else 'FAIL','checks':checks,'pages':len(pages),'internal_link_occurrences':links,'referenced_assets':len(assets),'sitemap_urls':len(urls),'past_papers':len(papers),'past_paper_questions':sum(len(p['q']) for p in papers),'issues':issues}
print(json.dumps(summary,indent=2))
raise SystemExit(1 if issues else 0)
