/* Research Lab visualizations | inputs transcribed from the linked dated research notes.
   No external network, no synthetic measurements. All plots redraw in the browser. */
(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const NS = 'http://www.w3.org/2000/svg';
 const palette = {blue:'#9ed4ee', copper:'#e5a875', muted:'#9caebc', rule:'#355165', dim:'#62788b', pale:'#e6eff5'};
 const fmt = (v,n=5) => Number(v).toFixed(n);
 const setText = (id, value) => { if ($(id)) $(id).textContent=value; };
 const el = (tag,attrs={},text='') => {const n=document.createElementNS(NS,tag); for (const [k,v] of Object.entries(attrs)) n.setAttribute(k,String(v));if(text!=='')n.textContent=String(text);return n;};
 const point=(x,y)=>`${x.toFixed(2)},${y.toFixed(2)}`;
 function setup(svg,label) {svg.replaceChildren();svg.setAttribute('viewBox','0 0 760 290');svg.setAttribute('role','img');svg.setAttribute('aria-label',label);}
 function line(svg,x1,y1,x2,y2,stroke=palette.rule,width=1,dash=''){svg.append(el('line',{x1,y1,x2,y2,stroke,'stroke-width':width,...(dash?{'stroke-dasharray':dash}:{})}));}
 function txt(svg,x,y,t,opts={}) {svg.append(el('text',{x,y,fill:palette.muted,'font-family':'DM Mono,monospace','font-size':11,...opts},t));}
 function poly(svg,pts,col,width=2.5){svg.append(el('polyline',{points:pts.map(p=>point(p[0],p[1])).join(' '),fill:'none',stroke:col,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'}));}
 const base = (svg,ticks=4)=>{for(let i=0;i<=ticks;i++)line(svg,58,25+i*51,724,25+i*51,palette.rule,.75,i===ticks?'':'3 7');};
 // EXACT restricted-circuit polynomials from notes/three_t_exact_branch_and_correlation_tube.md (2026-10-30).
 const Pstar=[1103764401,435414168,145739564,27589704,3664950,349032,24908,1080,33];
 const P1=[69521131,28084688,9917468,1747712,162570,11856,1388,96,3];
 function horner(a,s){return a.reduceRight((acc,v)=>acc*s+v,0);}
 function magic(s){const n=s*s+8*s+79;const p=horner(Pstar,s),q=horner(P1,s);return {G:(16*q-p)/(16*n**4),bits:Math.log2(16*q/p),min2:p/(16*n**4),min1:q/(n**4)};}
 const magSvg=$('magic-plot'),magSlider=$('magic-s'),magMetric=$('magic-metric');
 if(magSvg&&magSlider&&magMetric){
  const render=()=>{const s=+magSlider.value;const metric=magMetric.value;const f=metric==='G'?d=>d.G:d=>d.bits;const all=Array.from({length:161},(_,i)=>magic(-.125+.375*i/160));const max=Math.max(...all.map(f))*1.1,min=Math.min(...all.map(f))*.86;const scaleX=x=>58+(x+.125)/.375*666,scaleY=y=>229-(y-min)/(max-min)*204;
   setup(magSvg,'Exact two-CNOT versus one-CNOT optimal magic gain over the input-state parameter s.');base(magSvg);for(let i=0;i<=4;i++)txt(magSvg,49,230-i*51,fmt(min+(max-min)*i/4,metric==='G'?4:5),{'text-anchor':'end'});for(const x of [-.125,0,.125,.25])txt(magSvg,scaleX(x),256,fmt(x,3),{'text-anchor':'middle'});txt(magSvg,389,280,'INPUT PARAMETER  s',{'text-anchor':'middle'});
   poly(magSvg,all.map((d,i)=>[scaleX(-.125+.375*i/160),scaleY(f(d))]),palette.blue,3);const v=magic(s);line(magSvg,scaleX(s),25,scaleX(s),229,palette.copper,1.4,'4 4');magSvg.append(el('circle',{cx:scaleX(s),cy:scaleY(f(v)),r:5.8,fill:palette.copper,stroke:'#0a1019','stroke-width':2}));
   setText('magic-s-out',fmt(s,4));setText('magic-gap',fmt(v.G,8));setText('magic-bits',fmt(v.bits,7)+' bits');setText('magic-small',metric==='G'?'Fourth-moment advantage G(s)':'Additional stabilizer Rényi entropy ΔM₂ (bits)');magSlider.setAttribute('aria-valuetext',fmt(s,4));};
  magSlider.addEventListener('input',render);magMetric.addEventListener('change',render);render();
 }
 // Revival result: conditional floating-point peak enclosures, not certified machine intervals.
 const revival=[{tag:'(1.2, 0.35)',airy:26.42140246234294,r:.004246306274674095,ed:26.42268042,prom:.2215659032675629},{tag:'(0.35, 1.2)',airy:27.304993212354123,r:.010565168182711245,ed:27.31195479,prom:.18248801016152533}];
 const revSvg=$('revival-plot'),showED=$('revival-ed');
 if(revSvg&&showED){const render=()=>{setup(revSvg,'Airy predicted first peaks with conditional error ranges for two defect orientations, optional exact-diagonalization check.');const xx=t=>80+(t-26.20)/(27.50-26.20)*640;
 for(let t=26.2;t<=27.41;t+=.2){line(revSvg,xx(t),32,xx(t),229,palette.rule,.8,'3 6');txt(revSvg,xx(t),251,t.toFixed(1),{'text-anchor':'middle'});}revival.forEach((v,i)=>{const y=86+i*100;txt(revSvg,80,y-35,v.tag,{'font-size':13,fill:palette.pale});line(revSvg,xx(v.airy-v.r),y,xx(v.airy+v.r),y,palette.copper,7);line(revSvg,xx(v.airy-v.r),y-11,xx(v.airy-v.r),y+11,palette.copper,2);line(revSvg,xx(v.airy+v.r),y-11,xx(v.airy+v.r),y+11,palette.copper,2);revSvg.append(el('circle',{cx:xx(v.airy),cy:y,r:5.5,fill:palette.blue}));if(showED.checked)revSvg.append(el('circle',{cx:xx(v.ed),cy:y,r:6.5,fill:'#0a1019',stroke:palette.pale,'stroke-width':2}));txt(revSvg,xx(v.airy)+10,y-16,fmt(v.airy,4),{fill:palette.blue});});txt(revSvg,405,284,'FIRST REVIVAL TIME (MODEL UNITS)',{'text-anchor':'middle'});setText('revival-offset',fmt(revival[1].airy-revival[0].airy,6));setText('revival-meaning',showED.checked?'Hollow circles: post-hoc exact diagonalization checks.': 'Filled dots: Airy predictors; orange ranges: conditional a posteriori bounds.');};showED.addEventListener('change',render);render();}
 // Thermodynamic SdS baseline, classical instantaneous horizons only.
 const Lambda=3e-6,G=1,rm=1/Math.sqrt(Lambda),rdS=Math.sqrt(3/Lambda),pi=Math.PI;
 function fSdS(r,m){return 1-2*m/r-Lambda*r*r/3;}
 function bisect(lo,hi,m){let a=lo,b=hi;for(let i=0;i<90;i++){const mid=(a+b)/2;if(fSdS(mid,m)>0)a=mid;else b=mid;}return(a+b)/2;}
 function horizons(m){const low=(()=>{let a=1e-12,b=rm;for(let i=0;i<90;i++){const x=(a+b)/2;if(fSdS(x,m)>0)b=x;else a=x;}return(a+b)/2;})();return [low,bisect(rm,rdS,m)];}
 function proxy(M0){const [rb,rc]=horizons(M0);const pageRc=Math.hypot(rb,rc);const pageM=.5*pageRc*(1-Lambda*pageRc*pageRc/3);return{rb,rc,pageM,entropy0:pi*(rb*rb+rc*rc)};}
 const sdsSvg=$('sds-plot'),massSlider=$('sds-initial'),massFraction=$('sds-fraction');
 if(sdsSvg&&massSlider&&massFraction){const render=()=>{const M0=+massSlider.value,q=+massFraction.value/100;const p=proxy(M0);const m=M0*q,[rb,rc]=horizons(m);const score=(mm)=>{const [b,c]=horizons(mm);return {island:pi*b*b,proxy:pi*(b*b+c*c)-p.entropy0};};
 const data=Array.from({length:100},(_,i)=>({m:M0*(.03+.97*i/99),...score(M0*(.03+.97*i/99))}));const max=Math.max(...data.map(z=>Math.max(z.island,z.proxy)))*1.1;const x=mass=>68+(mass/M0)*642;const y=v=>236-v/max*200;
 setup(sdsSvg,'Instantaneous SdS black-hole entropy and integrated thermodynamic entropy proxy versus mass. Their crossing is not a fine-grained Page transition.');base(sdsSvg);for(let i=0;i<=4;i++)txt(sdsSvg,56,240-i*51,fmt(max*i/4/1e3,0)+'k',{'text-anchor':'end'});for(const z of [.25,.5,.75,1])txt(sdsSvg,x(M0*z),260,fmt(z,2),{'text-anchor':'middle'});txt(sdsSvg,390,282,'M / INITIAL MASS',{'text-anchor':'middle'});
 poly(sdsSvg,data.map(d=>[x(d.m),y(d.island)]),palette.blue,2.9);poly(sdsSvg,data.map(d=>[x(d.m),y(d.proxy)]),palette.copper,2.9);line(sdsSvg,x(p.pageM),25,x(p.pageM),237,palette.pale,1,'4 5');line(sdsSvg,x(m),25,x(m),237,palette.copper,1,'2 5');
 const d=score(m);sdsSvg.append(el('circle',{cx:x(m),cy:y(d.island),r:5,fill:palette.blue}));sdsSvg.append(el('circle',{cx:x(m),cy:y(d.proxy),r:5,fill:palette.copper}));setText('sds-m0',fmt(M0,0));setText('sds-mcur',fmt(m,2));setText('sds-page',fmt(p.pageM,5));setText('sds-horizons',fmt(rb,3)+' / '+fmt(rc,3));setText('sds-proxy',fmt(d.proxy,2));};
 massSlider.addEventListener('input',render);massFraction.addEventListener('input',render);render();}
 // Independent four-seed CPU negative control; exact published measurements, no interpolation.
 const neural=[{seed:1,uniform:.00305660,weighted:.03265909,terminalU:.000333658,terminalW:.000842321},{seed:2,uniform:.00501294,weighted:.04107316,terminalU:.000570531,terminalW:.000906955},{seed:3,uniform:.00286270,weighted:.01153595,terminalU:.000294046,terminalW:.000886326},{seed:7,uniform:.00487193,weighted:.01974500,terminalU:.000759691,terminalW:.000330229}];
 const neuralSvg=$('neural-plot'),neuralMetric=$('neural-metric');
 if(neuralSvg&&neuralMetric){const render=()=>{const metric=neuralMetric.value,us=metric==='global'?'uniform':'terminalU',ws=metric==='global'?'weighted':'terminalW';setup(neuralSvg,'Recorded seed-level RMSE comparison of uniform and adjoint-weighted neural training on an independent zero-temperature qubit benchmark.');base(neuralSvg);const ymax=Math.max(...neural.map(d=>Math.max(d[us],d[ws])))*1.17;for(let i=0;i<=4;i++)txt(neuralSvg,52,229-i*51,fmt(ymax*i/4,metric==='global'?3:5),{'text-anchor':'end'});neural.forEach((d,i)=>{const center=137+i*168;const y=v=>229-v/ymax*205;for(const [v,shift,col] of [[d[us],-21,palette.blue],[d[ws],6,palette.copper]]){neuralSvg.append(el('rect',{x:center+shift,y:y(v),width:26,height:Math.max(0,229-y(v)),fill:col,rx:2}));}txt(neuralSvg,center,251,'SEED '+d.seed,{'text-anchor':'middle'});});setText('neural-metric-label',metric==='global'?'Global population RMSE':'Terminal population absolute error');const losses=neural.filter(d=>d[ws]>d[us]).length;setText('neural-result',`${losses} / 4 seeds worsened with adjoint weighting on this metric`);};neuralMetric.addEventListener('change',render);render();}
})();
