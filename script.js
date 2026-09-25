const starsEl = document.getElementById('stars');
for(let i=0;i<50;i++){
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random()*100+'%';
  s.style.top = Math.random()*40+'%';
  s.style.animationDelay = (Math.random()*4)+'s';
  starsEl.appendChild(s);
}

const railsEl = document.querySelector('.rails');
for(let i=0;i<14;i++){
  const sl = document.createElement('div');
  sl.className = 'sleeper';
  sl.style.left = (i*90)+'px';
  sl.style.top = '55%';
  railsEl.appendChild(sl);
}

const dustEl = document.getElementById('dust');
for(let i=0;i<22;i++){
  const m = document.createElement('div');
  m.className = 'mote';
  m.style.left = Math.random()*100+'%';
  m.style.top = (55+Math.random()*30)+'%';
  m.style.animationDuration = (5+Math.random()*6)+'s';
  m.style.animationDelay = (Math.random()*6)+'s';
  dustEl.appendChild(m);
}

const lines = [ 
  { text:"Smoke", time:0.5  },
  { text:"and ashes from these letters", time:2  },
  { text:"I'm burning", time:4 },
  { text:"No fairytale ending", time:6 },
  { text:"if there was no beginning", time:8 },
  { text:"Is it even worth it", time:11.5 },
  { text:"to reminisce?", time:13.5 },
  { text:"How do you grieve for a love that", time:15.5 },
  { text:"did not even exist?", time:17.5 },
];
const totalDuration = lines[lines.length-1].time + 6;

const captionZone = document.getElementById('captionZone');
const dotsEl = document.getElementById('dots');
lines.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot';
  d.id = 'dot'+i;
  dotsEl.appendChild(d);
});

let currentIndex=-1, startTime=null;

function showLine(index){
  const el = document.createElement('div');
  el.className = 'line';
  el.textContent = lines[index].text;
  captionZone.innerHTML = '';
  captionZone.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('active'));

  document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
  document.getElementById('dot'+index).classList.add('active');
  currentIndex = index;
}

function clearLine(){
  captionZone.innerHTML = '';
  document.querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));
  currentIndex = -1;
}

function tick(ts){
  if(!startTime) startTime = ts;
  const elapsed = (ts-startTime)/1000;

  if(elapsed < lines[0].time){
    requestAnimationFrame(tick);
    return;
  }

  let activeIndex = 0;
  for(let i=0;i<lines.length;i++){ if(elapsed>=lines[i].time) activeIndex=i; }
  if(activeIndex !== currentIndex){ showLine(activeIndex); }

  if(elapsed < totalDuration){
    requestAnimationFrame(tick);
  } else {
    clearLine();
    startTime = null;
    setTimeout(()=>{ requestAnimationFrame(tick); }, 1200);
  }
}

requestAnimationFrame(tick);