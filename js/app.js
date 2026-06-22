
let sentence=[];
let current='Todos';
let pictos=[
{text:'YO',cat:'Personas',img:'./img/yo.jpeg'},
{text:'MAMA',cat:'Personas',img:'./img/mama.jpeg'},
{text:'QUIERO',cat:'Acciones',img:'./img/quiero.jpeg'},
{text:'COMER',cat:'Acciones',img:'./img/comer.png'},
{text:'FELIZ',cat:'Emociones',img:'./img/feliz.png'},
{text:'AGUA',cat:'Objetos',img:'./img/agua.png'}
];

const saved=JSON.parse(localStorage.getItem('caa_pictos')||'[]');
pictos=[...pictos,...saved];

function voice(t){
 const u=new SpeechSynthesisUtterance(t);
 u.lang='es-AR';
 speechSynthesis.speak(u);
}

function render(){
 const g=document.getElementById('grid');
 g.innerHTML='';
 pictos.filter(p=>current==='Todos'||p.cat===current).forEach(p=>{
  const d=document.createElement('div');
  d.className='card';
  d.innerHTML=`<img src="${p.img}"><h4>${p.text}</h4>`;
  d.onclick=()=>{
   voice(p.text);
   sentence.push(p.text);
   updateSentence();
  };
  g.appendChild(d);
 });
}

function updateSentence(){
 const s=document.getElementById('sentence');
 s.innerHTML='';
 sentence.forEach(w=>{
  const d=document.createElement('div');
  d.className='word';
  d.textContent=w;
  s.appendChild(d);
 });
}

function speakSentence(){ if(sentence.length) voice(sentence.join(' ')); }
function clearSentence(){ sentence=[]; updateSentence(); }
function openModal(){ document.getElementById('modal').style.display='flex'; }
function closeModal(){ document.getElementById('modal').style.display='none'; }

function savePicto(){
 const text=document.getElementById('text').value;
 const cat=document.getElementById('category').value;
 const file=document.getElementById('image').files[0];
 if(!text||!file) return alert('Complete todos los datos');
 const r=new FileReader();
 r.onload=e=>{
   const p={text:text.toUpperCase(),cat,img:e.target.result};
   const arr=JSON.parse(localStorage.getItem('caa_pictos')||'[]');
   arr.push(p);
   localStorage.setItem('caa_pictos',JSON.stringify(arr));
   pictos.push(p);
   render();
   closeModal();
 };
 r.readAsDataURL(file);
}

document.querySelectorAll('.cat').forEach(b=>{
 b.onclick=()=>{
  document.querySelectorAll('.cat').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  current=b.dataset.cat;
  render();
 };
});

render();
