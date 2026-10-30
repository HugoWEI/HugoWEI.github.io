/* Historical research explanation and synthetic Hawkes-process visualization. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const node=(name,attrs={},value)=>{const e=document.createElementNS(NS,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(value!==undefined)e.textContent=value;return e;};
const steps=[
 ['SPRING 2016','Start with aggregate geography','LMP used previously available INSEE sociodemographic statistics and historical polling-station data to help plan where volunteer interviews would take place. No individual-level voter prediction is shown here.','Le Parisien · 21 May 2016'],
 ['MAY 2016','Plan the field operation','A digital tool helped coordinate neighborhoods and canvassing assignments. The original reporting emphasizes the combination of data, software and volunteers.','Le Parisien · 21 May 2016'],
 ['SUMMER 2016','Collect open-ended interviews','Door-to-door volunteers used mobile questionnaires to record conversations. Accounts distinguish roughly 25,000 completed questionnaires from a larger number of reported conversations.','Le Monde · 7 October 2016; Carnegie · 2018'],
 ['AUTUMN 2016','Process unstructured language','Proxem analyzed about 1.5 million reported words using semantic-analysis software. The founder said deep-learning technology was used; model architecture and validation were not publicly established in these sources.','Le Monde Informatique · 2017; Le Monde · 2016'],
 ['OCTOBER 2016','Summarize themes and context','Analysis was used in a public diagnosis of expressed concerns. Proxem’s founder described contrasting associations around nuclear energy depending on the surrounding context.','Le Monde Informatique · 2017; Carnegie · 2018'],
 ['LOOKING BACK','Separate use from effectiveness','This documented workflow shows how data analytics helped organize, process and interpret campaign feedback. It is not evidence that AI caused the presidential election result.','Université Grenoble Alpes · 2018']
];
const flow=$('campaign-flow');let current=0,timer=null;
if(flow){
 const labels=['AGGREGATE DATA','FIELD PLAN','INTERVIEWS','TEXT ANALYSIS','DIAGNOSIS','EVIDENCE'];
 const draw=(index)=>{
  flow.replaceChildren();flow.setAttribute('viewBox','0 0 800 270');
  const boxes=labels.map((label,i)=>({x:21+i*130,y:93,w:115,h:78,label}));
  for(let i=0;i<boxes.length-1;i++){const a=boxes[i],b=boxes[i+1];flow.append(node('line',{x1:a.x+a.w,y1:132,x2:b.x,y2:132,stroke:'#496a80','stroke-width':2,'stroke-dasharray':'5 7'}));if(i===index-1){const circ=node('circle',{cx:a.x+a.w,cy:132,r:4,fill:'#e9ad7c'});flow.append(circ);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const animate=node('animate',{attributeName:'cx',from:a.x+a.w,to:b.x,dur:'1.5s',repeatCount:'indefinite'});circ.append(animate);}}}
  boxes.forEach((b,i)=>{const selected=i===index;flow.append(node('rect',{x:b.x,y:b.y,width:b.w,height:b.h,rx:6,fill:selected?'#23435a':'#142634',stroke:selected?'#9fd8ee':'#436074','stroke-width':selected?2.5:1}));flow.append(node('text',{x:b.x+b.w/2,y:121,'text-anchor':'middle',fill:selected?'#ecf6fc':'#a6b7c4','font-family':'DM Mono, monospace','font-size':9},b.label));flow.append(node('text',{x:b.x+b.w/2,y:150,'text-anchor':'middle',fill:selected?'#e6ad81':'#8199ac','font-family':'DM Mono, monospace','font-size':11},String(i+1).padStart(2,'0')));});
  flow.append(node('text',{x:400,y:228,'text-anchor':'middle',fill:'#97b9cb','font-family':'DM Mono,monospace','font-size':12},'SCHEMATIC HISTORICAL WORKFLOW · NOT ORIGINAL CAMPAIGN DATA'));
  const [date,title,body,source]=steps[index];$('case-step-number').textContent=`Step ${index+1} / ${steps.length}`;$('case-date').textContent=date;$('case-title').textContent=title;$('case-body').textContent=body;$('case-reference').textContent='Source: '+source;
 };
 const set=i=>{current=(i+steps.length)%steps.length;draw(current)};
 const stop=()=>{if(timer!==null){clearInterval(timer);timer=null;}$('case-play').textContent='Play sequence ▷';$('case-play').setAttribute('aria-pressed','false')};
 $('case-prev').addEventListener('click',()=>{stop();set(current-1)});
 $('case-next').addEventListener('click',()=>{stop();set(current+1)});
 $('case-play').addEventListener('click',()=>{if(timer!==null){stop();return}if(matchMedia('(prefers-reduced-motion: reduce)').matches){set(current+1);return}$('case-play').textContent='Pause sequence Ⅱ';$('case-play').setAttribute('aria-pressed','true');timer=setInterval(()=>set(current+1),3200);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});draw(0);
}
const contextButtons={economy:$('context-economy'),environment:$('context-environment')};
if(contextButtons.economy&&contextButtons.environment){
 const contexts={economy:['More positive association reported','According to Proxem’s founder, mentions of nuclear energy framed in economic terms tended to have more favorable associations in the analyzed responses.'],environment:['More negative association reported','The same founder described less favorable associations for nuclear energy when discussed in an ecological context.']};
 const show=key=>{for(const [name,button] of Object.entries(contextButtons)){button.classList.toggle('is-active',name===key);button.setAttribute('aria-pressed',String(name===key))}const [heading,body]=contexts[key];$('context-heading').textContent=heading;$('context-description').textContent=body};
 Object.entries(contextButtons).forEach(([key,button])=>button.addEventListener('click',()=>show(key)));
 show('economy');
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
