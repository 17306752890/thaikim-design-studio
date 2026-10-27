'use strict';
/* Each concept hosts its own themed Shadow DOM. No iframe or dependency on port 4320. */
(async () => {
 const version=document.body.dataset.version;
 if(!/^\d{2}$/.test(version||'')||document.getElementById('thai-kim-chat'))return;
 const host=document.createElement('thai-kim-chat');host.id='thai-kim-chat';host.dataset.version=version;host.dataset.ready='loading';
 const root=host.attachShadow({mode:'open'});document.body.appendChild(host);
 const locale=new URLSearchParams(location.search).get('lang')||'zh';
 const label={zh:'聊天找布',en:'Fabric chat · 中文',th:'แชตหาผ้า · 中文'}[locale]||'聊天找布';
 function dimensions(){
  const review=document.querySelector('.reviewbar'),nav=document.querySelector('.site-nav');
  const reviewHeight=Math.ceil(review?.getBoundingClientRect().height||44);
  host.style.setProperty('--tk-review-h',reviewHeight+'px');
  host.style.setProperty('--tk-chat-top',Math.min(reviewHeight+(nav?.offsetHeight||90)+14,Math.max(66,innerHeight-520))+'px');
  host.style.setProperty('--tk-vh',Math.floor(window.visualViewport?.height||innerHeight)+'px');
 }
 try{
  const [markup,css]=await Promise.all(['panel.html','widget.css'].map(async name=>{
   const res=await fetch('/assets/chat-widget/'+name,{cache:'no-store'});if(!res.ok)throw Error('Widget asset unavailable: '+name);return res.text();
  }));
  const style=document.createElement('style');style.textContent=css;root.appendChild(style);
  const surface=document.createElement('div');surface.id='chat-surface';surface.className='tk-chat-surface chat-is-open';surface.lang='zh-CN';surface.innerHTML=markup;root.appendChild(surface);
  const concept=window.TK_CONCEPTS?.find(c=>c.id===version);
  root.getElementById('chat-concept-label').textContent=version+' · '+(concept?.title[0]||'官网样板')+' · 中文体验';
  dimensions();window.addEventListener('resize',dimensions);window.visualViewport?.addEventListener('resize',dimensions);
  const review=document.querySelector('.reviewbar');if(review&&window.ResizeObserver)new ResizeObserver(dimensions).observe(review);
  const runtime=document.createElement('script');runtime.src='/assets/chat-widget/runtime.js';
  await new Promise((resolve,reject)=>{runtime.onload=resolve;runtime.onerror=reject;document.body.appendChild(runtime);});
  if(host.dataset.ready!=='true')throw Error('Widget did not initialize');
  for(const nav of document.querySelectorAll('.navlinks,#mobile-nav')){
   const b=document.createElement('button');b.type='button';b.className='tk-chat-nav';b.dataset.tkChatOpen='';b.textContent=label;b.setAttribute('aria-label',label+' / 中文交互样板');nav.appendChild(b);
  }
  // Keep sample-shortlist actions unchanged. Only actual consultation CTAs open chat.
  for(const b of document.querySelectorAll('button[data-open-bag]')){
   if(/咨询面料顾问|Talk about your project|ปรึกษาเรื่องผ้า/.test(b.textContent)){b.removeAttribute('data-open-bag');b.dataset.tkChatOpen='';}
  }
  document.addEventListener('click',event=>{
   const b=event.target.closest?.('[data-tk-chat-open]');if(!b)return;
   event.preventDefault();event.stopImmediatePropagation();
   const menu=document.getElementById('mobile-nav');if(menu)menu.hidden=true;document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
   window.dispatchEvent(new Event('tk-chat-open'));
  },true);
  document.body.classList.add('tk-chat-mounted');
 }catch(error){
  host.dataset.ready='error';document.body.classList.remove('tk-chat-open');
  root.replaceChildren();const notice=document.createElement('button');notice.textContent='聊天未能载入，点击重试';notice.style.cssText='position:fixed;right:22px;bottom:20px;z-index:90;padding:14px;background:#223d49;color:white;border:0;border-radius:8px;cursor:pointer';notice.onclick=()=>location.reload();root.appendChild(notice);
  console.error('Thai Kim embedded chat initialization:',error);
 }
})();
