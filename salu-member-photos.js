/* Small, clear JPEG portraits. No photo is fetched with the member listing. */
(function(g){
 'use strict';
 const dataUrl=async blob=>{if(blob.arrayBuffer){const bytes=new Uint8Array(await blob.arrayBuffer());let value='';for(let i=0;i<bytes.length;i+=32768)value+=String.fromCharCode(...bytes.subarray(i,i+32768));return 'data:'+(blob.type||'image/jpeg')+';base64,'+btoa(value);}return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('The photo could not be read.'));r.readAsDataURL(blob);});};
 const blob=(canvas,quality)=>new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('The photo could not be compressed.')),'image/jpeg',quality));
 async function optimise(file){
  if(!file||!/^image\/(jpeg|png|webp|avif|heic|heif)$/i.test(file.type))throw new Error('Choose a JPG, PNG or WebP portrait photo.');
  if(file.size>25*1024*1024)throw new Error('Choose a photo smaller than 25 MB.');
  const url=URL.createObjectURL(file),image=new Image();
  try{
   await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('This photo format could not be opened. Choose a JPG, PNG or WebP photo.'));image.src=url;});
   const iw=image.naturalWidth||image.width,ih=image.naturalHeight||image.height;if(!iw||!ih||iw*ih>60000000)throw new Error('Choose a smaller photo.');
   let size=Math.min(720,Math.max(iw,ih)),best=null,canvas=document.createElement('canvas');
   for(let pass=0;pass<4;pass++){
    const scale=Math.min(1,size/Math.max(iw,ih));canvas.width=Math.max(1,Math.round(iw*scale));canvas.height=Math.max(1,Math.round(ih*scale));const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
    for(const quality of [.86,.80,.72,.64]){best=await blob(canvas,quality);if(best.size<=90*1024)break;}
    if(best.size<=140*1024)break;size=Math.round(size*.8);
   }
   if(!best||best.size>150*1024)throw new Error('This photo could not be reduced enough. Please choose another photo.');
   // Keep an already small JPEG when recompression would grow it.
   if(file.type==='image/jpeg'&&Math.max(iw,ih)<=720&&file.size<=best.size&&file.size<=140*1024)best=file;
   const result=new File([best],(file.name||'member-photo').replace(/\.[^.]*$/,'')+'.jpg',{type:'image/jpeg'}),bytes=result.size;
   return {file:result,dataUrl:await dataUrl(result),bytes,originalBytes:file.size,width:canvas.width,height:canvas.height,summary:'Photo ready: '+(bytes/1024).toFixed(1)+' KB'+(bytes<file.size?' · reduced '+Math.round(100-bytes/file.size*100)+'%':'')};
  }finally{URL.revokeObjectURL(url);}
 }
 g.SaluMemberPhotos={optimise,dataUrl};
})(window);
