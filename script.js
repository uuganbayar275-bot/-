const welcome = document.getElementById('welcome');
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openInvite');
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
const invitationVoice = document.getElementById('invitationVoice');
const poemSection = document.getElementById('poemSection');
let isPlaying = false;
let voicePlayed = false;
let opening = false;
let musicVolumeBeforeVoice = 0.72;
music.volume = 0.72;

async function openInvitation(){
  if(opening) return;
  opening = true;
  welcome.classList.add('opening');
  envelope.classList.add('open');
  try{
    await music.play();
    isPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '❚❚ <span>Зогсоох</span>';
  }catch(e){}
  try{
    invitationVoice.muted = true;
    await invitationVoice.play();
    invitationVoice.pause();
    invitationVoice.currentTime = 0;
    invitationVoice.muted = false;
  }catch(e){}
  setTimeout(()=>{
    welcome.classList.add('fly-away');
    document.body.classList.remove('locked');
  },1450);
  setTimeout(()=>welcome.remove(),2450);
}
openBtn.addEventListener('click',openInvitation);
envelope.addEventListener('click',openInvitation);

musicBtn.addEventListener('click',async()=>{
  if(isPlaying){
    music.pause(); isPlaying=false;
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML='♫ <span>Хөгжим</span>';
  }else{
    try{
      await music.play(); isPlaying=true;
      musicBtn.classList.add('playing');
      musicBtn.innerHTML='❚❚ <span>Зогсоох</span>';
    }catch(e){}
  }
});

const target = new Date('2026-09-16T09:00:00+08:00').getTime();
function updateCountdown(){
  const diff=Math.max(0,target-Date.now());
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
}
updateCountdown(); setInterval(updateCountdown,1000);

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.13,rootMargin:'0px 0px -7% 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const voiceObserver = new IntersectionObserver(async entries=>{
  for(const entry of entries){
    if(!entry.isIntersecting || voicePlayed) continue;
    voicePlayed = true;
    voiceObserver.disconnect();
    musicVolumeBeforeVoice = music.volume || 0.72;
    if(isPlaying) music.volume = 0.08;
    try{
      invitationVoice.currentTime = 0;
      await invitationVoice.play();
    }catch(e){ voicePlayed=false; }
  }
},{threshold:.55});
voiceObserver.observe(poemSection);
invitationVoice.addEventListener('ended',()=>{ if(isPlaying) music.volume=musicVolumeBeforeVoice; });
