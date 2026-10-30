/* Explanatory interactives: historical aggregate election facts and synthetic Hawkes model. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const node=(name,attrs={},value)=>{const e=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(value!==undefined)e.textContent=value;return e;};
const steps=[
 ['APRIL 2016','A new movement','Emmanuel Macron launches En Marche. The subsequent “Grande Marche” is planned as a national listening exercise.','Carnegie; Le Temps'],
 ['MAY–SUMMER 2016','Target field locations','A campaign consultancy uses aggregate historical electoral and sociodemographic data to help organize neighborhood outreach.','Le Parisien (21 May 2016)'],
 ['SUMMER 2016','Listen at the door','Thousands of volunteers conduct conversations and collect questionnaires. The figures for discussions and completed forms should not be confused.','Le Monde (7 October 2016); Carnegie'],
 ['AUTUMN 2016','Analyze the responses','Interview text is processed with semantic analysis; the campaign presents a diagnosis of reported concerns.','Le Monde (7 October 2016); Carnegie'],
 ['2017 CAMPAIGN','Mobilize and communicate','Campaign teams combine volunteers, online engagement and field organizing. Analytical tools are only one component of the overall political campaign.','University of Grenoble academic analysis'],
 ['APRIL–MAY 2017','Votes, not a causal proof','Macron receives 24.01% of valid votes in the first round and 66.10% in the second. Those results alone cannot attribute his victory to data analytics.','French Ministry of the Interior']
];
const flow=$('campaign-flow');let current=0, timer=null;
if(flow){
 const labels=['MOVEMENT','GEOGRAPHY','CONVERSATION','TEXT ANALYSIS','ORGANIZATION','BALLOTS'];
 const draw=(index)=>{
  flow.replaceChildren();flow.setAttribute('viewBox','0 0 800 270');
  const boxes=labels.map((label,i)=>({x:21+i*130,y:93,w:115,h:78,label}));
  for(let i=0;i<boxes.length-1;i++){const a=boxes[i],b=boxes[i+1];flow.append(node('line',{x1:a.x+a.w,y1:132,x2:b.x,y2:132,stroke:'#496a80','stroke-width':2,'stroke-dasharray':'5 7'}));if(i===index-1){const circ=node('circle',{cx:a.x+a.w,cy:132,r:4,fill:'#e9ad7c'});flow.append(circ);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const animate=node('animate',{attributeName:'cx',from:a.x+a.w,to:b.x,dur:'1.5s',repeatCount:'indefinite'});circ.append(animate);}}}
  boxes.forEach((b,i)=>{const selected=i===index;flow.append(node('rect',{x:b.x,y:b.y,width:b.w,height:b.h,rx:6,fill:selected?'#23435a':'#142634',stroke:selected?'#9fd8ee':'#436074','stroke-width':selected?2.5:1}));flow.append(node('text',{x:b.x+b.w/2,y:121,'text-anchor':'middle',fill:selected?'#ecf6fc':'#a6b7c4','font-family':'DM Mono, monospace','font-size':9},b.label));flow.append(node('text',{x:b.x+b.w/2,y:150,'text-anchor':'middle',fill:selected?'#e6ad81':'#8199ac','font-family':'DM Mono, monospace','font-size':11},String(i+1).padStart(2,'0')));});
  flow.append(node('text',{x:400,y:228,'text-anchor':'middle',fill:'#97b9cb','font-family':'DM Mono,monospace','font-size':12},'CONCEPTUAL INFORMATION FLOW · NOT VOTER DATA'));
  const [date,title,body,source]=steps[index];$('case-step-number').textContent=`Step ${index+1} / ${steps.length}`;$('case-date').textContent=date;$('case-title').textContent=title;$('case-body').textContent=body;$('case-reference').textContent='Source: '+source;
 };
 const set=i=>{current=(i+steps.length)%steps.length;draw(current)};
 const stop=()=>{if(timer!==null){clearInterval(timer);timer=null;}$('case-play').textContent='Play sequence ▷';$('case-play').setAttribute('aria-pressed','false')};
 $('case-prev').addEventListener('click',()=>{stop();set(current-1)});
 $('case-next').addEventListener('click',()=>{stop();set(current+1)});
 $('case-play').addEventListener('click',()=>{if(timer!==null){stop();return}if(matchMedia('(prefers-reduced-motion: reduce)').matches){set(current+1);return}$('case-play').textContent='Pause sequence Ⅱ';$('case-play').setAttribute('aria-pressed','true');timer=setInterval(()=>set(current+1),3200);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});draw(0);
}
const bars=$('election-bars');
if(bars){const votes={one:[['Emmanuel Macron',24.01],['Marine Le Pen',21.30],['François Fillon',20.01],['Jean-Luc Mélenchon',19.58],['Benoît Hamon',6.36],['Other candidates',8.74]],two:[['Emmanuel Macron',66.10],['Marine Le Pen',33.90]]};
 const render=key=>{bars.replaceChildren();votes[key].forEach(([name,value])=>{const row=document.createElement('div');row.className='election-row';const title=document.createElement('span');title.className='election-name';title.textContent=name;const track=document.createElement('div');track.className='election-bar-track';const fill=document.createElement('div');fill.className='election-bar-fill';fill.style.width=value+'%';track.append(fill);const amount=document.createElement('span');amount.className='election-value';amount.textContent=value.toFixed(2)+'%';row.append(title,track,amount);bars.append(row);});for(const name of ['one','two']){$('round-'+name).classList.toggle('is-active',name===key);$('round-'+name).setAttribute('aria-pressed',String(name===key));}bars.setAttribute('aria-label',`Official ${key==='one'?'first':'second'}-round 2017 French presidential shares of valid votes cast.`)};
 $('round-one').addEventListener('click',()=>render('one'));
 $('round-two').addEventListener('click',()=>render('two'));
 render('one');
}
const hawkes=$('hawkes-plot');
if(hawkes){
 const exc=[0.7,4.1,7.7],inh=[2.1,5.3,8.4],mu=0.55,apos=0.8,T=10;
 const render=()=>{const alpha=Number($('hawkes-alpha').value),beta=Number($('hawkes-beta').value);$('hawkes-alpha-out').textContent=alpha.toFixed(2);$('hawkes-beta-out').textContent=beta.toFixed(2);hawkes.replaceChildren();hawkes.setAttribute('viewBox','0 0 800 315');const X=t=>55+t/10*710,Y=v=>260-v/1.8*210;
   for(let i=0;i<=3;i++){const y=Y(i*.6);hawkes.append(node('line',{x1:55,y1:y,x2:766,y2:y,stroke:'#355269','stroke-width':1,'stroke-dasharray':'3 7'}));hawkes.append(node('text',{x:45,y:y+4,'text-anchor':'end',fill:'#9eb6c4','font-size':11},(i*.6).toFixed(1)));}
   const rate=t=>{let value=mu;for(const e of exc)if(e<t)value+=apos*Math.exp(-beta*(t-e));for(const e of inh)if(e<t)value+=alpha*Math.exp(-beta*(t-e));return Math.max(0,value)};
   const ts=Array.from({length:1201},(_,k)=>k*T/1200);for(const events of [[exc,'#e3a773'],[inh,'#caa9c7']])for(const e of events[0]){hawkes.append(node('line',{x1:X(e),y1:29,x2:X(e),y2:259,stroke:events[1],'stroke-dasharray':'3 7','stroke-width':1.4}));hawkes.append(node('circle',{cx:X(e),cy:26,r:5,fill:events[1]}));}
   let d='';for(let k=0;k<ts.length;k++){const t=ts[k],v=rate(t);d+=(k===0?'M':'L')+X(t).toFixed(2)+' '+Y(v).toFixed(2)+' ';}hawkes.append(node('path',{d,stroke:'#a7ddf2','stroke-width':3,fill:'none','stroke-linejoin':'round'}));for(let t=0;t<=10;t+=2)hawkes.append(node('text',{x:X(t),y:284,'text-anchor':'middle',fill:'#9eb6c4','font-size':11},String(t)));hawkes.append(node('text',{x:400,y:306,'text-anchor':'middle',fill:'#9eb6c4','font-size':11},'TIME · SYNTHETIC EVENT SCHEDULE'));};
 $('hawkes-alpha').addEventListener('input',render);$('hawkes-beta').addEventListener('input',render);render();
}
})();
