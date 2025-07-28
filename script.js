//Declaración de variables
let i,j,k;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sampleRate = audioCtx.sampleRate; // Típicamente 44100

let frecuencia=65.4; octava=2;cantCiclos=1;
let indiceOnda=0;

let ataque=0.01,decay=1,sustain=0.5,release=0.5,amp1=[0.01,1,0.5,0.5],maxAmps=[10,10,1,10];

let letras=["q","2","w","3","e","r","5","t","6","y","7","u","z","s","x","d","c","v","g","b","h","n","j","m",","];
let letras2=["i","9","o","0","p","Dead","¿","+","Backspace","Enter","Insert","Delete","End"];

let canvas2 = document.querySelector("#teclado");
let ctx2 = canvas2.getContext("2d");
let canvasAmp = document.querySelector("#amp1");
let ctxAmp = canvasAmp.getContext("2d");

//Crear la matriz con todas las notas
let arrayRelaciones=[1,1.059,1.122,1.189,1.26,1.335,1.414,1.498,1.587,1.682,1.782,1.888,2];
let arrayRelaciones2=[0.707,0.749,0.793,0.841,0.891,0.944,1,1.059,1.122,1.189,1.26,1.335];
for(i=0;i<13;i++){arrayRelaciones[i+12]=arrayRelaciones[i]*2;}
for(i=0;i<25;i++){arrayRelaciones2[i+12]=arrayRelaciones2[i]*2;}

let largosOnda=[];
let matrizNotas=[];
let sources=[];
let ganancias=[];
let sonando=[],apretando=[];
let coef=[];

function crearArrays(){  

  silenciar();

  for(i=0;i<arrayRelaciones.length;i++){
    largosOnda[i]=cantCiclos*48000/(frecuencia*Math.pow(2,octava)*arrayRelaciones[i]);
    
    coef[i]=largosOnda[i]/(Math.round(largosOnda[i]));
    largosOnda[i]=Math.round(largosOnda[i]);   
  }

  for(i=0;i<50;i++){
    sources[i]=audioCtx.createBufferSource();
    ganancias[i]=audioCtx.createGain();
    sonando[i]=false;
    apretando[i]=0;
  }

  for(i=0;i<arrayRelaciones.length;i++){
    matrizNotas[i]=new Float32Array(Math.round(largosOnda[i]));
  }

  switch(indiceOnda){
    case 0:crearOndaSeno();break;
    case 1:crearOndaCuadrada();break;
    case 2:crearOndaTriangular();break;
  }

  muestreo();

}

crearArrays();

//Crear ondas
function crearOndaSeno(){
  for(j=0;j<arrayRelaciones.length;j++){
    for(i=0;i<largosOnda[j];i++)matrizNotas[j][i]=Math.sin(2 * Math.PI * frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/ sampleRate)*0.2;
  }
}

function crearOndaCuadrada(){
  for(j=0;j<arrayRelaciones.length;j++){
    for(i=0;i<largosOnda[j];i++){
      if(i>(largosOnda[j]/2))matrizNotas[j][i]=0.1;
      else matrizNotas[j][i]=-0.1;
    }
  }
}

function crearOndaTriangular(){
    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
        matrizNotas[j][i]=(2*i/largosOnda[j]-1)*0.1;
    }
  }
}

//Leer entrada de teclado
document.addEventListener("keydown",(event)=>{
  for(i=0;i<letras.length;i++){
    if(event.key==letras[i]&&!apretando[i])reproducir(i);
  }
  for(i=0;i<letras2.length;i++){
    if(event.key==letras2[i]&&!apretando[i+12])reproducir(i+12);
  }

  // console.log(event.key);

  if(event.key=="ArrowUp"){if(octava<5){octava++;crearArrays();}}
  if(event.key=="ArrowDown"){if(octava>0){octava--;crearArrays();}}
  if(event.key=="ArrowRight"){indiceOnda++;if(indiceOnda>2)indiceOnda=0;crearArrays();}
  if(event.key=="ArrowLeft"){indiceOnda--;if(indiceOnda<0)indiceOnda=2;crearArrays();}

  muestreo();
})
document.addEventListener("keyup",(event)=>{
  for(i=0;i<letras.length;i++){
    if(event.key==letras[i])detener(i);
  }
  for(i=0;i<letras2.length;i++){
    if(event.key==letras2[i])detener(i+12);
  }
  muestreo();
})

//Reproducir
let ahora,src=0,ultimoSource=[];

function reproducir(nota){

  if(sonando[nota]){
    let srcAux2=ultimoSource[nota];
    const t = audioCtx.currentTime;
    ganancias[srcAux2].gain.cancelScheduledValues(t);
    ganancias[srcAux2].gain.setValueAtTime(ganancias[srcAux2].gain.value, t);
    ganancias[srcAux2].gain.linearRampToValueAtTime(0, t + 0.002);

    setTimeout(() => {
      sources[srcAux2].stop();
      muestreo();
    }, 0.002*1000+200);
  }

  ultimoSource[nota]=src;sonando[nota]=true;apretando[nota]=true;

  //Creando envolvente de ganancia
  ganancias[src].gain.value = 0;
  ahora = audioCtx.currentTime;
  ganancias[src].gain.setValueAtTime(0, ahora);
  ganancias[src].gain.linearRampToValueAtTime(1, ahora + amp1[0]); 
  ganancias[src].gain.linearRampToValueAtTime(amp1[2], ahora + amp1[0] + amp1[1]);

  let buffer = audioCtx.createBuffer(1, largosOnda[nota], sampleRate);
  buffer.copyToChannel(matrizNotas[nota], 0);

  sources[src]= audioCtx.createBufferSource();
  sources[src].loop=true;
  sources[src].buffer = buffer;
  sources[src].connect(ganancias[src]).connect(audioCtx.destination);
  sources[src].start();

  src++;
  if(src>=sources.length)src=0;

}

//Detener
function detener(nota){

  let srcAux=ultimoSource[nota];

  apretando[nota]=false;

  const t = audioCtx.currentTime;
  ganancias[srcAux].gain.cancelScheduledValues(t);
  ganancias[srcAux].gain.setValueAtTime(ganancias[srcAux].gain.value, t);
  ganancias[srcAux].gain.linearRampToValueAtTime(0, t + amp1[3]);

  setTimeout(() => {
    try{
      sonando[nota]=false;
      sources[srcAux].stop();
      muestreo();
    }catch{}
    }, amp1[3]*1000);
}

//Mostrar teclado
function muestreo(){

  let posX=3,posX2=33;
  for(i=0;i<25;i++){
    if(i==0||i==2||i==4||i==5||i==7||i==9||i==11||i==12||i==14||i==16||i==17||i==19||i==21||i==23||i==24){

      if(!apretando[i])ctx2.fillStyle="rgba(131, 131, 131, 1)";
      else ctx2.fillStyle="rgba(85, 85, 85, 1)";

      ctx2.fillRect(posX, 3, 47, 200);

      ctx2.fillStyle="rgba(255, 255, 255, 0.5)";
      ctx2.fillRect(posX+43,3,4,200);

      posX+=50;

    }
  }

  for(i=0;i<25;i++){
    if(i==1||i==3||i==6||i==8||i==10||i==13||i==15||i==18||i==20||i==22){
      if(i==6||i==13||i==18)posX2+=50;

      if(!apretando[i])ctx2.fillStyle="black";
      else ctx2.fillStyle="rgba(61, 61, 61, 1)";

      ctx2.fillRect(posX2, 3, 37, 120);

      ctx2.fillStyle="rgba(255, 255, 255, 0.6)";
      ctx2.fillRect(posX2+33,3,4,120);

      posX2+=50;
    }
  }

}

document.querySelector("#botSeno").addEventListener("mousedown",()=>{indiceOnda=0;crearArrays();});
document.querySelector("#botCuadrada").addEventListener("mousedown",()=>{indiceOnda=1;crearArrays();});
document.querySelector("#botTriangular").addEventListener("mousedown",()=>{indiceOnda=2;crearArrays();});
document.querySelector("#subirOctava").addEventListener("mousedown",()=>{if(octava<5){octava++;crearArrays();}});
document.querySelector("#bajarOctava").addEventListener("mousedown",()=>{if(octava>0){octava--;crearArrays();}});

document.addEventListener("mouseup",()=>{
  document.querySelector("#amp1").removeEventListener("mousemove",clickAmp1);
});

let boolAmp1;
document.querySelector("#botAmp1").addEventListener("mousedown",()=>{
  if(!boolAmp1)document.querySelector("#amp1").style.cssText="top:-82px;transition:top 0.5s;";
  else document.querySelector("#amp1").style.cssText="top:0px;transition:top 0.5s;";
  boolAmp1=!boolAmp1;
})

document.querySelector("#mas1st").addEventListener("mousedown",()=>transponer(1));
document.querySelector("#menos1st").addEventListener("mousedown",()=>transponer(-1));

let trans=0,delaySt;
function transponer(st){

  try{clearTimeout(delaySt);}catch{}

  trans+=st;
  if(trans<-6)trans=-6;
  if(trans>6)trans=6;
  
  for(i=0;i<arrayRelaciones.length;i++)arrayRelaciones[i]=arrayRelaciones2[i+6+trans];
  
  document.querySelector("#trans").innerHTML=`${trans}st`;

  document.querySelector("#trans").style.cssText="top:-30px;transition:top 0.2s;";

  delaySt=setTimeout(() => {
    document.querySelector("#trans").style.cssText="top:0px;transition:top 0.5s;";
  }, 2000);

  crearArrays();

}

// document.querySelector("#teclado").addEventListener("mousedown",clickear);
// document.querySelector("#teclado").addEventListener("mouseup",silenciar);
let patronPiano=[0,1,2,1,0,0,1,2,1,2,1,0,0,1,2,1,0,0,1,2,1,2,1,0,0];
function clickear(){
    
  let rect = canvas2.getBoundingClientRect();

  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;

  let nota;
  let XX=0,XXaux=0;
  
  if(mouseY>123){
    nota=Math.floor(mouseX/50)*2;
    if(nota>5)nota--;
    if(nota>12)nota--;
    if(nota>17)nota--;
    if(nota>23)nota--;
  }else{
    for(i=0;i<patronPiano.length;i++){

      XXaux=XX;

      switch (patronPiano[i]){
        case 0: XX+=31;break;
        case 1: XX+=37;break;
        case 2: XX+=13;break;
      }

      if(mouseX>=XXaux+2&&mouseX<XX+2)nota=i;

    }
  }

  if(mouseX>701)nota=24;
  if(mouseX<10)nota=0;


  reproducir(nota);

  muestreo();

}

function silenciar(){
    for(i=0;i<sources.length;i++){
      try{
      detener(i);
      sonando[i]=false;
      }catch{}
    }  
  muestreo();
}

//Canvas Amp1
muestreoAmp1();

let triggerAmp1=false,posX,posY;
document.querySelector("#amp1").addEventListener("mousedown",()=>{
  clickAmp1();
  document.querySelector("#amp1").addEventListener("mousemove",clickAmp1);
});
document.querySelector("#amp1").addEventListener("mouseup",()=>{
  document.querySelector("#amp1").removeEventListener("mousemove",clickAmp1);
  triggerAmp1=false;
});

function muestreoAmp1(){
  ctxAmp.clearRect(0,0,canvasAmp.width,canvasAmp.height);
  ctxAmp.font="16px arial";
  let ancho,total=250;
  ctxAmp.fillStyle="rgba(48, 48, 48, 1)";
  for(i=0;i<4;i++){
    ctxAmp.fillRect(2,20*i+2,total,18);
  }
  ctxAmp.fillStyle="rgba(122, 31, 31, 0.6)";
  for(i=0;i<4;i++){
    ancho=total/(maxAmps[i]/amp1[i]);
    ctxAmp.fillRect(2,20*i+2,ancho,18);
  }

  if(amp1[0]<1)ctxAmp.fillText(`Ataque: ${amp1[0]*1000}ms`, 255, 16);
  else ctxAmp.fillText(`Ataque: ${(amp1[0]).toFixed(2)}s`, 255, 16);
  if(amp1[1]<1)ctxAmp.fillText(`Decay: ${amp1[1]*1000}ms`, 255, 36);
  else ctxAmp.fillText(`Decay: ${(amp1[1]).toFixed(2)}s`, 255, 36);
  ctxAmp.fillText(`Sustain: ${amp1[2]}`, 255, 56);
  if(amp1[3]<1)ctxAmp.fillText(`Release: ${amp1[3]*1000}ms`, 255, 76);
  else ctxAmp.fillText(`Release: ${(amp1[3]).toFixed(2)}s`, 255, 76);

}

function clickAmp1(){

  let total=250;
  let posCanvas = canvasAmp.getBoundingClientRect();
  
  posX=Math.floor(event.clientX-posCanvas.left);

  if(!triggerAmp1){
    posY=Math.floor(event.clientY-posCanvas.top);

    posY=Math.floor(posY/20);
    
  }
  triggerAmp1=true;

  posX=posX*maxAmps[posY]/total;
  if(posY<4)amp1[posY]=posX;

  if(amp1[0]<0.005)amp1[0]=0.005;
  if(amp1[1]<0.005)amp1[1]=0.005;
  if(amp1[3]<0.005)amp1[3]=0.005;
  if(amp1[0]>10)amp1[0]=10;
  if(amp1[1]>10)amp1[1]=10;
  if(amp1[3]>10)amp1[3]=10;
  if(amp1[2]>1)amp1[2]=1;

  muestreoAmp1();

}


document.querySelector("#debug").addEventListener("mousedown",funcionDebug1);
document.querySelector("#debug2").addEventListener("mousedown",funcionDebug2);

function funcionDebug1(){
}
function funcionDebug2(){
}
function debug(cosa="XD"){
  console.log(cosa);
}