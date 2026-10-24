export const VERSION=1;
export const STATS=['STR','AGI','VIT','INT','PER'];
export const templates=[
 {id:'move',name:'Move your body',detail:'20 minutes of comfortable movement. Adapt it to your ability.',xp:20,gold:5,stat:'STR'},
 {id:'routine',name:'Keep your anchor routine',detail:'Start one planned task on time; prepare your workspace.',xp:15,gold:4,stat:'AGI'},
 {id:'water',name:'Hydration & a proper meal',detail:'Follow your usual hydration needs and eat a regular meal.',xp:10,gold:3,stat:'VIT'},
 {id:'rest',name:'Protect your recovery',detail:'Reflect on sleep and protect tonight’s rest window.',xp:20,gold:5,stat:'VIT'},
 {id:'plan',name:'Plan & reflect',detail:'Five minutes: choose a priority and note one lesson.',xp:15,gold:4,stat:'PER'}
];
export const today=(now=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
export function addDate(date,n){const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
export function dayNumber(start,date=today()){return Math.floor((new Date(date+'T12:00:00Z')-new Date(start+'T12:00:00Z'))/86400000)+1}
export function initial(date=today()){return {version:VERSION,player:{name:'Player',start:date,minutes:180,target:'General Business Analyst'},events:{},missions:{},days:{},closed:{},penalty:null,raids:{},inventory:[],activeShadows:[],lastSeen:date}}
export function threshold(level){return 50*(level-1)*(level+2)}
export function progression(xp){xp=Math.max(0,xp);const level=Math.floor((Math.sqrt(9+0.08*xp)-1)/2);const floor=threshold(level),ceiling=threshold(level+1);return {level,rank:level>=21?'S':level>=17?'A':level>=13?'B':level>=9?'C':level>=5?'D':'E',current:xp-floor,required:ceiling-floor,next:ceiling,remaining:ceiling-xp,percent:Math.round(100*(xp-floor)/(ceiling-floor))}}
export function totals(s){const stats=Object.fromEntries(STATS.map(k=>[k,10]));let xp=0,gold=0;for(const e of Object.values(s.events)){xp+=e.xp||0;gold+=e.gold||0;for(const k of STATS)stats[k]+=e.stats?.[k]||0}return {xp,gold,stats,...progression(xp)}}
export function award(s,key,{xp=0,gold=0,stats={},source=key,date=today()}){if(s.events[key])return false;s.events[key]={id:key,source,xp,gold,stats,date,createdAt:new Date().toISOString()};return true}
export function completeMission(s,day,part,date=today()){
 if(day<1||day>90||day>dayNumber(s.player.start,date))throw Error('This mission unlocks on its scheduled date. You can preview it now.');
 const m=s.missions[day]||={evidence:'',speakNote:''};
 if(part==='study'&&m.evidence.trim().length<30)throw Error('Add at least 30 characters of evidence or artifact notes first.');
 if(!['study','speak'].includes(part))throw Error('Unknown mission task');
 const result=award(s,`mission:${day}:${part}`,{xp:part==='study'?80:20,gold:part==='study'?20:5,stats:part==='study'?{INT:2}:{PER:1},source:`Day ${day} ${part}`,date});
 if(result)m[part]=date;return result;
}
export function completeHabit(s,id,date=today()){
 const t=templates.find(x=>x.id===id);if(!t)throw Error('Unknown habit');
 const result=award(s,`habit:${date}:${id}`,{xp:t.xp,gold:t.gold,stats:{[t.stat]:1},source:t.name,date});
 if(result){s.days[date]||={habits:[],minutes:0,exempt:false};if(!s.days[date].habits.includes(id))s.days[date].habits.push(id)}return result;
}
export function missedFor(s,date){if(s.days[date]?.exempt)return 0;const n=dayNumber(s.player.start,date);if(n<1||n>90)return 0;const m=s.missions[n]||{};return templates.filter(t=>!s.days[date]?.habits?.includes(t.id)).length+(!m.study||m.study>date?1:0)+(!m.speak||m.speak>date?1:0)}
export function reconcile(s,date=today()){
 // Idempotent close of elapsed IST calendar days. Runs on open and every minute.
 const elapsed=Math.min(90,Math.max(0,dayNumber(s.player.start,date)-1));let changed=false;
 for(let i=0;i<elapsed;i++){
  const d=addDate(s.player.start,i);if(s.closed[d])continue;const missed=missedFor(s,d);
  s.closed[d]={missed,closedAt:date,due:addDate(d,1)};changed=true;
  if(missed){if(s.penalty&&!s.penalty.done){if(!s.penalty.missedDates.includes(d))s.penalty.missedDates.push(d)}else s.penalty={id:`recovery:${d}`,due:addDate(d,1),missedDates:[d],done:false,note:''};}
 }
 s.lastSeen=date;return changed;
}
export function fatigue(s,date=today()){
 let f=0;const dates=[...new Set([...Object.keys(s.closed),date])].sort();
 for(const d of dates){const log=s.days[d]||{};if(log.exempt)continue;
  const overload=4*Math.ceil(Math.max(0,(log.minutes||0)-180)/30);
  const missed=s.closed[d]?.missed||0;
  const recovered=(log.habits?.includes('rest')?12:0)+(log.recovery?8:0);
  f=Math.min(80,Math.max(0,f+Math.min(12,3*missed)+overload-recovered));
 }
 return {fatigue:f,hp:100-f};
}
export function completeRecovery(s,date=today()){
 if(!s.penalty||s.penalty.done)return false;
 if((s.penalty.note||'').trim().length<20)throw Error('Note what got in the way and your smaller next step (at least 20 characters).');
 s.penalty.done=true;s.penalty.completedAt=date;s.days[date]||={habits:[],minutes:0,exempt:false};s.days[date].recovery=true;return true;
}
export function missionDone(s,day){return !!(s.missions[day]?.study&&s.missions[day]?.speak)}
export function clearRaid(s,raid,note,checks,date=today()){
 if(s.raids[raid.id])return false;const start=raid.start||Math.max(1,raid.day-29),end=raid.end||raid.day;
 for(let i=start;i<=end;i++)if(!missionDone(s,i))throw Error(`Complete both training tasks for Day ${i} first.`);
 if(note.trim().length<30||checks.length!==3||checks.some(x=>!x))throw Error('Add artifact evidence and confirm all three review checks.');
 award(s,raid.id,{xp:raid.xp,gold:raid.gold,stats:{INT:3,PER:2},source:raid.name,date});s.raids[raid.id]={date,note,checks};return true;
}
export function buy(s,item,date=today()){
 if(totals(s).gold<item.cost)throw Error('Earn a little more gold before buying this reward.');
 const id=`purchase:${Date.now()}:${Math.random().toString(36).slice(2,8)}`;
 award(s,id,{gold:-item.cost,source:item.name,date});s.inventory.push({id,itemId:item.id,name:item.name,cost:item.cost,purchasedAt:date,used:false});return id;
}
export function validateImport(s){
 if(!s||s.version!==VERSION||!s.player||typeof s.player.name!=='string'||!s.player.name.trim()||s.player.name.length>40||typeof s.player.target!=='string'||!Number.isFinite(s.player.minutes)||s.player.minutes<1||s.player.minutes>720||!/^\d{4}-\d{2}-\d{2}$/.test(s.player.start)||!Number.isFinite(new Date(s.player.start).getTime()))throw Error('Choose a valid SYSTEM v1 backup.');
 for(const key of ['events','missions','days','closed','raids'])if(!s[key]||typeof s[key]!=='object'||Array.isArray(s[key]))throw Error('Backup is missing '+key);
 if(!Array.isArray(s.inventory)||!Array.isArray(s.activeShadows)||s.inventory.length>10000||Object.keys(s.events).length>100000)throw Error('Backup collections are invalid.');
 for(const m of Object.values(s.missions))if(!m||typeof m!=='object'||(m.evidence!==undefined&&typeof m.evidence!=='string')||(m.speakNote!==undefined&&typeof m.speakNote!=='string'))throw Error('Backup mission notes are invalid.');
 for(const d of Object.values(s.days))if(!d||!Array.isArray(d.habits)||d.habits.some(x=>typeof x!=='string')||!Number.isFinite(d.minutes)||d.minutes<0||d.minutes>720)throw Error('Backup day logs are invalid.');
 for(const p of s.inventory)if(!p||typeof p.name!=='string'||typeof p.id!=='string'||typeof p.purchasedAt!=='string'||!Number.isFinite(p.cost))throw Error('Backup inventory is invalid.');
 if(s.penalty&&(!Array.isArray(s.penalty.missedDates)||typeof s.penalty.due!=='string'||typeof s.penalty.note!=='string'))throw Error('Backup recovery task is invalid.');
 for(const e of Object.values(s.events))if(!e||!Number.isFinite(e.xp)||!Number.isFinite(e.gold)||e.xp<0||Math.abs(e.gold)>100000||Object.values(e.stats||{}).some(n=>!Number.isFinite(n)||n<0))throw Error('Backup ledger is invalid.');
 if(totals(s).gold<0)throw Error('Backup has an invalid gold balance.');return s;
}
