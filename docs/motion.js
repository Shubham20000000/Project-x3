// Original vector graphics and a motion layer. No external services or data.
let reduced=false,previousLevel=null;
export function applyMotion(mode='system'){
 reduced=mode==='reduced'||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.documentElement.dataset.motion=reduced?'reduced':'full';
}
export function runeGraphic(seed=0,boss=false){
 const glyphs=[
  '<path d="M55 88V40l25-14 25 14v48M68 88V49l12-7 12 7v39M49 89h62"/>',
  '<path d="m80 30 23 29-23 37-23-37 23-29ZM57 59h46M80 30v66"/>',
  '<path d="M80 43c-9-8-22-9-29-6v46c11-3 20-1 29 6 9-7 18-9 29-6V37c-7-3-20-2-29 6ZM80 43v46M59 48l12 3M89 51l12-3M59 61l12 3M89 64l12-3"/>',
  '<path d="m55 35 39 49-8 6-39-49 8-6ZM105 35 66 84l8 6 39-49-8-6ZM56 83l18 15M86 98l18-15M64 91l-9 10M96 91l9 10"/>',
  '<path d="m49 49 14 12 17-25 17 25 14-12-8 37H57l-8-37ZM58 95h44M66 74h28"/>'
 ];
 return `<svg class="rune-art ${boss?'boss-rune':''}" viewBox="0 0 160 128" aria-hidden="true"><defs><radialGradient id="rune-${seed}-${boss}"><stop stop-color="currentColor" stop-opacity=".18"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><ellipse cx="80" cy="67" rx="77" ry="60" fill="url(#rune-${seed}-${boss})"/><g class="rune-orbit"><circle cx="80" cy="65" r="53" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width=".8"/><circle cx="80" cy="65" r="46" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="25 8 2 9" stroke-width=".8"/><path d="M80 7v11M80 112v11M22 65h11M127 65h11" stroke="currentColor" stroke-opacity=".4"/></g><g class="rune-core" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">${glyphs[boss?4:seed%glyphs.length]}</g><circle class="rune-spark" cx="132" cy="40" r="2" fill="currentColor"/><circle class="rune-spark second" cx="30" cy="86" r="1.5" fill="currentColor"/></svg>`;
}
export function animateView(level){
 document.querySelectorAll('.phase,.raid-card,.shadow-card,.tool-card').forEach((el,i)=>el.style.setProperty('--order',String(Math.min(i,7))));
 if(reduced){previousLevel=level;return}
 if(previousLevel!==null&&level>previousLevel){
  const panel=document.createElement('div');panel.className='level-flash';panel.setAttribute('role','status');panel.innerHTML=`<span>STATUS INCREASED</span><strong>LEVEL ${level}</strong><small>Your next evolution is earned.</small>`;document.body.append(panel);setTimeout(()=>panel.remove(),2600);
 }
 previousLevel=level;
}
export function celebrate(kind='quest'){
 if(reduced)return;
 const box=document.createElement('div');box.className='reward-particles';box.setAttribute('aria-hidden','true');
 for(let i=0;i<14;i++){const p=document.createElement('i');const angle=i*Math.PI*2/14;p.style.setProperty('--dx',Math.cos(angle)*(45+(i%3)*18)+'px');p.style.setProperty('--dy',Math.sin(angle)*(40+(i%4)*15)-35+'px');p.style.setProperty('--delay',i*9+'ms');box.append(p)}
 if(kind==='raid')box.classList.add('raid-reward');document.body.append(box);setTimeout(()=>box.remove(),1400);
}
