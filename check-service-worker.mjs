/** Test the real service worker with deterministic cache/network adapters. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const base='https://salucommunity.github.io/';
const handlers={},stores=new Map([['unrelated-app',new Map()],['salu-community-v3',new Map()]]);
const key=request=>new URL(typeof request==='string'?request:request.url,base).href;
let offline=false,networkCalls=0,skipped=false,claimed=false;
const cacheFor=name=>{
  if(!stores.has(name))stores.set(name,new Map());
  const map=stores.get(name);
  return {
    async add(url){const u=new URL(url,base),file=u.pathname.slice(1)||'index.html';assert.ok(fs.existsSync(path.join(root,file)),'Missing precache file: '+file);map.set(key(url),new Response(fs.readFileSync(path.join(root,file))));},
    async put(request,response){map.set(key(request),response);}
  };
};
const caches={
  async open(name){return cacheFor(name);},
  async keys(){return [...stores.keys()];},
  async delete(name){return stores.delete(name);},
  async match(request,options={}){
    for(const store of stores.values())for(const [url,response] of store){
      if(url===key(request)||(options.ignoreSearch&&url.split('?')[0]===key(request).split('?')[0]))return response.clone();
    }
  }
};
const context={URL,Response,caches,fetch:async request=>{networkCalls++;if(offline)throw new Error('Offline');return new Response('fresh:'+new URL(request.url).pathname);},self:{location:{origin:new URL(base).origin},registration:{scope:base},clients:{claim:async()=>{claimed=true;}},skipWaiting:async()=>{skipped=true;},addEventListener:(type,handler)=>{handlers[type]=handler;}}};
vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),context);
async function dispatch(type,request){const waits=[];let response;handlers[type]({request,waitUntil:p=>waits.push(p),respondWith:p=>{response=p;}});const result=await response;await Promise.all(waits);return result;}
await dispatch('install');assert.ok(skipped);
await dispatch('activate');assert.ok(claimed);assert.ok(stores.has('unrelated-app'));assert.ok(!stores.has('salu-community-v3'));
const request=(url,mode='navigate',method='GET')=>({url:new URL(url,base).href,mode,method});
const metadata=JSON.parse(fs.readFileSync(path.join(root,'seo-pages.json'),'utf8'));
offline=true;
for(const m of Object.values(metadata)){
  const response=await dispatch('fetch',request(m.canonical));
  assert.equal(response.status,200);
  assert.ok((await response.text()).includes('<title>'),'Offline page is HTML');
}
const tracked=await dispatch('fetch',request('./?source=app'));assert.equal(tracked.status,200);
const absent=await dispatch('fetch',request('not-cached.png','cors'));assert.equal(absent.status,503);
const inlinePage=await dispatch('fetch',request('admissions.html'));
const inlineHtml=await inlinePage.text();
assert.ok(inlineHtml.includes('<style id="salu-styles">'));
assert.ok(inlineHtml.includes('<script id="salu-app">'));
assert.ok(inlineHtml.includes('data:image/webp;base64,'));
offline=false;
const fresh=await dispatch('fetch',request('admissions.html'));assert.equal(await fresh.text(),'fresh:/admissions.html');
assert.equal(await dispatch('fetch',request('data.js','cors','POST')),undefined);
assert.equal(await dispatch('fetch',{url:'https://example.com/file.js',method:'GET',mode:'cors'}),undefined);
console.log(JSON.stringify({status:'PASS',offline_pages:16,app_tracking_url:true,embedded_visuals_and_application_code:true,fresh_online_navigation:true,missing_offline_asset_status:503,unrelated_cache_preserved:true},null,2));
