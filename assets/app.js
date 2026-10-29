(() => {
  const menu = document.querySelector('.mobile-menu');
  if (menu) menu.addEventListener('click', () => {
    const open = document.querySelector('.site-header').classList.toggle('menu-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const selected=button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('is-selected', b===button); b.setAttribute('aria-pressed', String(b===button));});
      document.querySelectorAll('[data-topic]').forEach(card => { card.hidden = selected !== 'all' && card.dataset.topic !== selected; });
    });
  });
  const canvas = document.getElementById('interference');
  if (!canvas) return;
  const ctx=canvas.getContext('2d');
  if(!ctx) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size=560, dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=size*dpr;canvas.height=size*dpr;ctx.scale(dpr,dpr);
  let t=0, active=true;
  const draw=()=>{
    ctx.clearRect(0,0,size,size);
    const cx=280,cy=280;
    const N=31;
    for(let j=0;j<N;j++){
      ctx.beginPath();
      for(let i=0;i<=300;i++){
        const x=36+i*(488/300);
        const distance=(x-cx)/244;
        const y=cy + (j-(N-1)/2)*11.8;
        const e=0.6+0.4*Math.exp(-distance*distance*1.1);
        const phase=0.019*x + 0.72*j + 0.7*t;
        const wave= Math.sin(phase)*17*e + Math.cos(phase*0.58-0.06*j)*10*e;
        const yy=y+wave;
        if(i===0)ctx.moveTo(x,yy); else ctx.lineTo(x,yy);
      }
      const strength=1-Math.abs(j-(N-1)/2)/((N-1)/2);
      ctx.strokeStyle=`rgba(${Math.round(132+strength*62)},${Math.round(192+strength*45)},${Math.round(225+strength*20)},${(0.085+strength*0.23).toFixed(3)})`;
      ctx.lineWidth=0.8+strength*0.38;
      ctx.stroke();
    }
    for(let k=0;k<9;k++){
      const radius=49+23*k;
      ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.setLineDash([2,5]);ctx.strokeStyle=`rgba(145,188,216,${Math.max(0.025,0.115-k*.012)})`;ctx.lineWidth=.6;ctx.stroke();ctx.setLineDash([]);
    }
    ctx.beginPath();ctx.arc(cx,cy,4,0,2*Math.PI);ctx.fillStyle='rgba(235,183,142,.55)';ctx.fill();
    if(active && !reduced){t+=.006;requestAnimationFrame(draw)}
  };
  document.addEventListener('visibilitychange',()=>{const newlyActive=!document.hidden;if(newlyActive&&!active&&!reduced){active=true;requestAnimationFrame(draw)}else if(!newlyActive)active=false;});
  draw();
})();
