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
const story=document.querySelector('.room-story');
if(story){let step=0;const select=next=>{step=next;story.querySelectorAll('[data-story-panel]').forEach(p=>p.hidden=Number(p.dataset.storyPanel)!==step);story.querySelectorAll('[data-story-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.storyStep)===step)));story.querySelector('[data-story-next]').textContent=step===2?'Start again ↺':'Next step →'};story.querySelectorAll('[data-story-step]').forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.storyStep))));story.querySelector('[data-story-next]').addEventListener('click',()=>select((step+1)%3));}
const workflowStories=[['A map of how the work happens','Follow a drawing from the brief to issue. Mark where information is copied or sent back for correction.','Find the repeated steps.'],['A simpler sequence to follow','Agree a clear source of information, naming rules and responsibilities before adding software.','Remove unnecessary repetition.'],['A tool for the remaining repeat task','Build around the agreed process. For example, configure a room drawing pack once instead of setting up each view separately.','Automate the useful steps.'],['A checked result, with feedback','Try the workflow on a real task. Check the output and record time, corrections and user feedback before refining it.','Check the result in practice.']];
document.querySelectorAll('[data-workflow-step]').forEach(b=>b.addEventListener('click',()=>{const [title,copy,note]=workflowStories[Number(b.dataset.workflowStep)];document.querySelector('#workflow-output').textContent=title;document.querySelector('#workflow-explanation').textContent=copy;document.querySelector('.diagram-note').textContent=note}));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
window.addEventListener('beforeprint',()=>{document.querySelectorAll('[data-print-answer]').forEach(el=>{el.textContent=document.getElementById(el.dataset.printAnswer).value||' '})});
