const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus()}});
document.querySelectorAll('[data-workflow-step]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-workflow-step]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));b.querySelector('.step-plus').textContent=selected?'−':'+'});
 const stage=button.dataset.workflowStep;
 document.querySelector('.flow-diagram').dataset.stage=stage;
 document.querySelector('#diagram-label').textContent=['01 — AUDIT THE WORKFLOW','02 — SIMPLIFY THE PROCESS','03 — BUILD THE SOLUTION','04 — REFINE IN PRACTICE'][stage];
}));
let category='all',release='all';
function filter(){
 let count=0;
 document.querySelectorAll('[data-product-card]').forEach(card=>{const stage=release==='all'||(release==='development'?card.dataset.availability==='development':card.dataset.availability==='released'&&card.dataset.distribution===release);const show=(category==='all'||card.dataset.category===category)&&stage;card.hidden=!show;if(show)count++});
 for(const [selector,key,value] of [['[data-product-filter]','productFilter',category],['[data-release-filter]','releaseFilter',release]])document.querySelectorAll(selector).forEach(b=>{const selected=b.dataset[key]===value;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected))});
 const counter=document.querySelector('[data-result-count]');if(counter)counter.textContent=count+' '+(count===1?'tool':'tools');
 const empty=document.querySelector('.empty-state');if(empty)empty.hidden=count!==0;
}
document.querySelectorAll('[data-product-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.productFilter;filter()}));
document.querySelectorAll('[data-release-filter]').forEach(b=>b.addEventListener('click',()=>{release=b.dataset.releaseFilter;filter()}));
document.querySelector('[data-reset-filter]')?.addEventListener('click',()=>{category='all';release='all';filter()});
document.querySelector('[data-motion-control]')?.addEventListener('click',()=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const art=document.querySelector('.hero-visual');
 for(const element of art.querySelectorAll('.drawing-object,.annotation')){element.style.animation='none';void element.offsetWidth;element.style.animation=''}
});
