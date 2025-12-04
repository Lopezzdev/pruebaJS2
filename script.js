//Declaración de variables
let i,j,k;
let varr=0;

//Canvas
let canvasTeclado = document.querySelector("#teclado");
let ctxTeclado = canvasTeclado.getContext("2d");
let canvasAmp = document.querySelector("#env");
let ctxAmp = canvasAmp.getContext("2d");
let canvasCustom = document.querySelector("#custom");
let ctxCustom = canvasCustom.getContext("2d");
let canvasAncho = document.querySelector("#ancho");
let ctxAncho = canvasAncho.getContext("2d");
let canvasEcu = document.querySelector("#ecu");
let ctxEcu = canvasEcu.getContext("2d");
let canvasFX = document.querySelector("#efectos");
let ctxFX = canvasFX.getContext("2d");

let posX,posY,posX2,posY2,posY3=-192;

let canvasDebug = document.querySelector("#canvaPrueba");
let ctxDebug = canvasDebug.getContext("2d");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sampleRate = audioCtx.sampleRate; // Típicamente 44100

// let frecuencia=65.4; octava=1;cantCiclos=1;
let frecuencia=32.703; octava=2;cantCiclos=1;
let indiceOnda=0,indiceEnv=0;
let cantSources=50;

let boolEnv=false,boolAmp1=false,boolLow1=false,habLow1=false,boolHigh1=false,habHigh1=false;
let amp1=[0.01,1,0.5,0.5,0.5],maxAmps=[10,10,1,10,1];boolCustom=false;
let filtroLow1=[1,1,0.3,0.5,1500,10],maxFiltros=[10,10,1,10,10000,20];
let filtroHigh1=[1,1,0.3,0.5,1500,10];
//   Ataque,decay,sustain,release,frecuencia,resonancia
let triggerCustom=false,triggerFX=false,triggerAmp1=false;
let trans=0,delaySt;

//Variables ecualizador
let indiceEcu=null;
let frecuenciaAux=20000,valorQaux=10,cantidadFiltros=4;
let filtros=[],boolFiltros=[0,0,0,0],Xfiltros=[100,250,500,600],Yfiltros=[80,160,20,101],freqFiltros=[54,236,2779,7455],dBFiltros=[6.66,-6.66,16.66,3,16],Qfiltros=[0,1,5,0],xEcu,yEcu,qEcu;
let minsEnv=[0.005,0.005,0,0.01,0,0],maxsEnv=[10,10,1,10,1,20];
let minsFiltros=[0,0.005,0,0.01,0,0],maxsFiltros=[10,10,1,10,10000,20];

let letras=["q","2","w","3","e","r","5","t","6","y","7","u","z","s","x","d","c","v","g","b","h","n","j","m",","];
let letras2=["i","9","o","0","p","Dead","¿","+","Backspace","Enter","Insert","Delete","End"];

let guias=[93,163,326,397,560,630];
let textoGuias=["50","100","500","1k","5k","10k"];

let cantArmonicos=100,anchoColumna=(canvasCustom.width-2)/cantArmonicos,cantArmonicosRandom;
let armonicosCustom=[],armonicosRandom=[];

let anchoCuadrada=100,coefAncho=100/anchoCuadrada;

for(i=0;i<cantArmonicos;i++){armonicosCustom[i]=0;}
armonicosCustom[0]=1;
armonicosCustom[1]=0.5;
armonicosCustom[2]=0.3;

cantArmonicosRandom=Math.round(Math.random()*cantArmonicos);
for(i=0;i<cantArmonicosRandom;i++)armonicosRandom[i]=parseFloat(Math.random().toFixed(3));
for(i=cantArmonicosRandom;i<cantArmonicos;i++)armonicosRandom[i]=0;

//Crear la matriz con todas las notas
let arrayRelaciones=[1,1.059,1.122,1.189,1.26,1.335,1.414,1.498,1.587,1.682,1.782,1.888,2];
let arrayRelaciones2=[0.707,0.749,0.793,0.841,0.891,0.944,1,1.059,1.122,1.189,1.26,1.335];
for(i=0;i<13;i++){arrayRelaciones[i+12]=arrayRelaciones[i]*2;}
for(i=0;i<25;i++){arrayRelaciones2[i+12]=arrayRelaciones2[i]*2;}

let largosOnda=[],matrizNotas=[],sources=[],ruido=[];
let matrizRuido=new Float32Array(sampleRate);
let ganancias=[],filtrosLow=[],filtrosHigh=[];
let sonando=[],apretando=[],coef=[];distaux=[];

let delays=[];
let salidaFiltros=[],salidaFijos,salidaReverbs;
let reverbGain,reverbConv,reverbRes,reverbWet,reverbDry;

let tremoloGain,tremoloLFO,tremoloInt,vibratoGain,vibratoLFO,pitchGain;
let delay,delayFeedback,delayDry,delayWet,delayOut,reverbOut;

let matrizEfectos=[[7,0.2,20],[0.6,0,1],[8,0.2,15],[0.03,0.01,0.1],[0.3,0.05,1],[0.4,0.05,0.8],[0.3,0,1],[0.4,0,1],[0,-2,2],[0.3,0,1],[0.3,0,0.9],[0.8,0,1],[0.05,0,1]];
//                  HzTremolo/intTremolo/HzVibrato/   IntVibrato  /  msDelay  /feedBack delay /IntDelay /IntReverb/intPitch/ msPitch / IntDist / CutDist   /  Ruido
let boolFX=[false,false,false,false,false,false,false],selecRev=1,indiceFX=-1;

for(i=0;i<cantSources;i++){
    sources[i]=audioCtx.createBufferSource();
    ganancias[i]=audioCtx.createGain();
    filtrosLow[i]=audioCtx.createBiquadFilter();
    filtrosHigh[i]=audioCtx.createBiquadFilter();
    sonando[i]=false;
    apretando[i]=0;
    salidaFiltros[i]=audioCtx.createGain();
}

salidaFijos=audioCtx.createGain();
salidaReverbs=audioCtx.createGain();

for(i=0;i<4;i++){
  filtros[i]=audioCtx.createBiquadFilter();
    
  t = Math.min(Math.max(Xfiltros[i] / 700, 0), 1);
  freqFiltros[i]=Math.round(20 * Math.pow(20000 / 20, t));
  dBFiltros[i]=20-Yfiltros[i]/6;
}

filtrosFijos();

for(i=0;i<sampleRate;i++)matrizRuido[i]=Math.random() * amp1[4] - 0.2;

function crearArrays(){  

  silenciar();

  for(i=0;i<arrayRelaciones.length;i++){
    largosOnda[i]=cantCiclos*sampleRate/(frecuencia*Math.pow(2,octava)*arrayRelaciones[i]);
    
    coef[i]=largosOnda[i]/(Math.round(largosOnda[i]));
    largosOnda[i]=Math.round(largosOnda[i]);   
  }

  for(i=0;i<sampleRate;i++)matrizRuido[i]=Math.random() * amp1[4] - 0.2;

  for(i=0;i<arrayRelaciones.length;i++){
    matrizNotas[i]=new Float32Array(Math.round(largosOnda[i]));
  }

  switch(indiceOnda){
    case 0:crearOndaSeno();break;
    case 1:crearOndaCuadrada();break;
    case 2:crearOndaTriangular();break;
    case 3:crearRandom();break;
    // case 4:crearDrums();break;
    // case 4:auxInst=true;break;
    // case 5:crearCustom();break;
    case 4:crearCustom();break;
  }
  
  let max=0;
  if(indiceOnda==3||indiceOnda==4){
    for(i=0;i<largosOnda[0];i++){if(matrizNotas[0][i]>max)max=matrizNotas[0][i]}

    max=amp1[4]*0.2/max;

    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
        matrizNotas[j][i]*=max;
      }
    }
  };

  
  //Escalado por cantidad reverb
  if(boolFX[3]){
    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
          matrizNotas[j][i]+=matrizEfectos[7][0]*matrizNotas[j][i]*5;
      }
    }
  }
  
  if(boolFX[5])sumardist();

  // crearReverb();
  muestreo();
  muestreoDebug();

}

function sumardist(){
  // return;
  let max=0,max2=0;
  let umbral=matrizEfectos[10][0];
  let dureza=matrizEfectos[11][0];

  //Maximo
  for(i=0;i<largosOnda[0];i++)if(matrizNotas[0][i]>max)max=matrizNotas[0][i];

  //Recorte
  for(j=0;j<arrayRelaciones.length;j++){
    for(i=0;i<largosOnda[j];i++){
        if(matrizNotas[j][i]>(max*(1-umbral)))matrizNotas[j][i]=(1-dureza)*[matrizNotas[j][i]-max*(1-umbral)]+max*(1-umbral);
        if(matrizNotas[j][i]<-(max*(1-umbral)))matrizNotas[j][i]=-(1-dureza)*[-matrizNotas[j][i]-max*(1-umbral)]-max*(1-umbral);

    }
  }

  //Maximo2
  for(i=0;i<largosOnda[0];i++)if(matrizNotas[0][i]>max2)max2=matrizNotas[0][i];

  //Escalado
  for(j=0;j<arrayRelaciones.length;j++){
    for(i=0;i<largosOnda[j];i++){
        matrizNotas[j][i]*=max/max2;
    }
  }

}

//Crear ondas
{
  function crearOndaSeno(){
    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
        matrizNotas[j][i]=Math.sin(2*Math.PI*frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/sampleRate)*0.4*amp1[4];
        matrizNotas[j][i]*=-1;
      }
    }
  }

  function crearOndaCuadrada(){
    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
        // if(i>(largosOnda[j]/(2)))matrizNotas[j][i]=0.2*amp1[4];
        if(i>(largosOnda[j]/(2*coefAncho)))matrizNotas[j][i]=0.2*amp1[4];
        else matrizNotas[j][i]=-0.2*amp1[4];
      }
    }
  }

  function crearOndaTriangular(){
    for(j=0;j<arrayRelaciones.length;j++){
      for(i=0;i<largosOnda[j];i++){
        matrizNotas[j][i]=(2*i/largosOnda[j]-1)*0.2*amp1[4];
      }
    }
  }

  function crearRandom(){

    let bool0=false;

    for(i=0;i<armonicosRandom.length;i++)if(armonicosRandom[i]>0)bool0=true;
    if(!bool0){crearOndaSeno();return;}
      
    for(j=0;j<arrayRelaciones.length;j++){

      for(i=0;i<largosOnda[j];i++){

        matrizNotas[j][i]=0;

        for(k=0;k<cantArmonicos;k++){
          // matrizNotas[j][i]-=Math.sin(2*(k+1)*Math.PI*frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/sampleRate)*(armonicosRandom[k]*0.4*amp1[4]/(k+1));
          // matrizNotas[j][i]-=Math.sin(2*(k+1)*Math.PI*frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/sampleRate)*(armonicosRandom[k]*0.4*amp1[4]/(0.25*(k+1)));
          matrizNotas[j][i]-=Math.sin(2*(k+1)*Math.PI*frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/sampleRate)*(armonicosRandom[k]*amp1[4]);
        }
      }
      
    }

    muestreoEnv1();
    
  }

  function crearCustom(){

    let bool0=false;

    for(i=0;i<armonicosCustom.length;i++)if(armonicosCustom[i]>0)bool0=true;
    if(!bool0){crearOndaSeno();return;}

    for(j=0;j<arrayRelaciones.length;j++){

      for(i=0;i<largosOnda[j];i++){

        matrizNotas[j][i]=0;
        for(k=0;k<armonicosCustom.length;k++){
          matrizNotas[j][i]-=Math.sin(2*(k+1)*Math.PI*frecuencia*arrayRelaciones[j]*coef[j]*(Math.pow(2,octava))*(i+1)/sampleRate)*(armonicosCustom[k]*amp1[4]);
        }
      }
    }

    

  }
}
let trigg=0;
//Reproducir
let ahora,src=0,ultimoSource=[];
async function reproducir(nota){

  if(sonando[nota]){
    let srcAux2=ultimoSource[nota];
    const t = audioCtx.currentTime;
    ganancias[srcAux2].gain.cancelScheduledValues(t);
    ganancias[srcAux2].gain.setValueAtTime(ganancias[srcAux2].gain.value, t);
    ganancias[srcAux2].gain.linearRampToValueAtTime(0, t + 0.01);

    setTimeout(() => {
      sources[srcAux2].stop();
      try{ruido[srcAux2].stop();}catch(e){}
      muestreo();
    }, 0.01*1000+200);
  }

  try {
  sources[src].disconnect();
  ruido[src].disconnect();
  ganancias[src].disconnect();
  filtrosHigh[src].disconnect();
  filtrosLow[src].disconnect();
  salidaFiltros[src].disconnect();
} catch(e) {}

  ultimoSource[nota]=src;sonando[nota]=true;apretando[nota]=true;

  let buffer = audioCtx.createBuffer(1, largosOnda[nota], sampleRate);
  buffer.copyToChannel(matrizNotas[nota], 0);

  sources[src]= audioCtx.createBufferSource();
  sources[src].loop=true;
  sources[src].buffer = buffer;

  let buffer2 = audioCtx.createBuffer(1, sampleRate, sampleRate);
  buffer2.copyToChannel(matrizRuido, 0);

  ruido[src]= audioCtx.createBufferSource();
  ruido[src].loop=true;
  ruido[src].buffer = buffer2;

  //Creando envolvente de ganancia
  ahora = audioCtx.currentTime;

  ganancias[src].gain.value = 0;
  ganancias[src].gain.setValueAtTime(0, ahora); //Inicia en 0
  ganancias[src].gain.linearRampToValueAtTime(1, ahora + amp1[0]); //Va al maximo en el tiempo de ataque
  ganancias[src].gain.linearRampToValueAtTime(amp1[2], ahora + amp1[0] + amp1[1]); //Luego del ataque, va al sustain en el tiempo del release

  agregarFiltros(nota);

  salidaFiltros[src]=audioCtx.createGain();

  let gainRuido=audioCtx.createGain();
  let gainSonido=audioCtx.createGain();
  gainRuido.gain.value=matrizEfectos[12][0];
  gainSonido.gain.value=1-matrizEfectos[12][0];
  if(!boolFX[6]){
    gainRuido.gain.value=0;
    gainSonido.gain.value=1;
  }

  sources[src].connect(gainSonido).connect(ganancias[src]).connect(filtrosHigh[src]).connect(filtrosLow[src]).connect(salidaFiltros[src]);

  agregarEfectos();

  //Ruido
  ruido[src].connect(gainRuido).connect(ganancias[src]);
  if(boolFX[6])ruido[src].start();

  //Delay
  delay.delayTime.value=matrizEfectos[4][0];
  delayFeedback.gain.value=matrizEfectos[5][0];
  delayWet.gain.value=matrizEfectos[6][0];
  delayDry.gain.value=1-matrizEfectos[6][0];
  if(!boolFX[2]){delayWet.gain.value=0;delayDry.gain.value=1;}
  if(boolFX[2])delay.connect(delayFeedback).connect(delay);
  
  //Reverb
  reverbWet.gain.value=matrizEfectos[7][0];
  reverbDry.gain.value=1-matrizEfectos[7][0];
  if(!boolFX[3]){reverbWet.gain.value=0;reverbDry.gain.value=1;}
  
  //Conecciones
  salidaFiltros[src].connect(tremoloGain);

  tremoloGain.connect(delay).connect(delayWet).connect(delayOut);
  tremoloGain.connect(delayDry).connect(delayOut);

  delayOut.connect(reverbWet).connect(reverbConv).connect(reverbGain).connect(salidaReverbs);
  delayOut.connect(reverbDry).connect(salidaReverbs);

  salidaReverbs.connect(salidaFijos);

  sources[src].start();

  src++;
  if(src>=sources.length)src=0;

}

function agregarFiltros(nota){
  //Creando envolvente de filtros dinámicos
  let frecuenciaNota=frecuencia*arrayRelaciones[nota]*octava;

  filtrosLow[src].type = "lowpass";
  if(habLow1){
    filtrosLow[src].Q.value = filtroLow1[5];
    filtrosLow[src].frequency.setValueAtTime(frecuenciaNota+10, ahora);
    filtrosLow[src].frequency.linearRampToValueAtTime(frecuenciaNota+filtroLow1[4], ahora + filtroLow1[0]);  
    filtrosLow[src].frequency.linearRampToValueAtTime(frecuenciaNota+filtroLow1[4]*filtroLow1[2], ahora + filtroLow1[0] + filtroLow1[1]);
  }else{filtrosLow[src].Q.value = 1;filtrosLow[src].frequency.value=20000;}
  
  filtrosHigh[src].type = "highpass";
  if(habHigh1){
    filtrosHigh[src].Q.value = filtroHigh1[5];
    filtrosHigh[src].frequency.setValueAtTime(frecuenciaNota+10, ahora);
    filtrosHigh[src].frequency.linearRampToValueAtTime(frecuenciaNota+filtroHigh1[4], ahora + filtroHigh1[0]);  
    filtrosHigh[src].frequency.linearRampToValueAtTime(frecuenciaNota+filtroHigh1[4]*filtroHigh1[2], ahora + filtroHigh1[0] + filtroHigh1[1]);
  }
  else{filtrosHigh[src].Q.value = 1;filtrosHigh[src].frequency.value=0;}

}

function filtrosFijos(){

  filtros[0]=audioCtx.createBiquadFilter();
  filtros[0].type="highpass"
  filtros[0].Q.value=dBFiltros[0];
  filtros[0].frequency.value=freqFiltros[0];

  filtros[1]=audioCtx.createBiquadFilter();
  filtros[1].type="peaking"
  filtros[1].Q.value=Qfiltros[1];
  filtros[1].gain.value=dBFiltros[1];
  filtros[1].frequency.value=freqFiltros[1];
  
  filtros[2]=audioCtx.createBiquadFilter();
  filtros[2].type="peaking"
  filtros[2].Q.value=Qfiltros[2];
  filtros[2].gain.value=dBFiltros[2];
  filtros[2].frequency.value=freqFiltros[2];
  
  filtros[3]=audioCtx.createBiquadFilter();
  filtros[3].type="lowpass"
  filtros[3].Q.value=dBFiltros[3];
  filtros[3].frequency.value=freqFiltros[3];

  if(!boolFiltros[0]){filtros[0].Q.value=0;filtros[0].frequency.value=0;}
  if(!boolFiltros[1]){filtros[1].gain.value=0;}
  if(!boolFiltros[2]){filtros[2].gain.value=0;}
  if(!boolFiltros[3]){filtros[3].Q.value=0;filtros[3].frequency.value=24000;}

  salidaFijos.connect(filtros[0]).connect(filtros[1]).connect(filtros[2]).connect(filtros[3]).connect(audioCtx.destination);

}

function agregarEfectos(){

  //Tremolo
  tremoloGain=audioCtx.createGain();
  tremoloLFO=audioCtx.createOscillator();
  tremoloInt=audioCtx.createGain();

  tremoloGain.gain.value=1.0;
  tremoloLFO.frequency.value=matrizEfectos[0][0];
  tremoloInt.gain.value=matrizEfectos[1][0];
  if(!boolFX[0])tremoloInt.gain.value=0;

  tremoloLFO.connect(tremoloInt).connect(tremoloGain.gain);
  tremoloLFO.start();

  //Vibrato
  vibratoGain=audioCtx.createGain();
  vibratoLFO=audioCtx.createOscillator();

  vibratoLFO.frequency.value=matrizEfectos[2][0];
  vibratoGain.gain.value= matrizEfectos[3][0]*0.4;
  if(!boolFX[1]||matrizEfectos[2][0]==0)vibratoGain.gain.value=0;

  vibratoLFO.connect(vibratoGain).connect(sources[src].playbackRate);
  vibratoLFO.start();

  //Pitch
  if(boolFX[4]){
    let valorAux=matrizEfectos[8][0];
    if(valorAux>=0)valorAux+=1;
    else valorAux=1/(Math.abs(valorAux)+1);

    sources[src].playbackRate.setValueAtTime(valorAux, ahora); 
    sources[src].playbackRate.linearRampToValueAtTime(1.0,ahora + matrizEfectos[9][0]);
  }

}

crearReverb();
async function crearReverb(){

  try{
    reverbConv.disconnect();
    reverbGain.disconnect();
    reverbDry.disconnect();
    reverbWet.disconnect();
  }catch{}

  reverbConv=audioCtx.createConvolver();
  reverbGain=audioCtx.createGain();
  reverbDry=audioCtx.createGain();
  reverbWet=audioCtx.createGain();

  reverbGain.gain.value=1;
  reverbRes=await loadIR(`./media/reverb${selecRev}.wav`);
  reverbConv.buffer=reverbRes;

}

crearDelay();
function crearDelay(){
  
  //Delay
  delay=audioCtx.createDelay();
  delayFeedback=audioCtx.createGain();
  delayDry=audioCtx.createGain();
  delayWet=audioCtx.createGain();
  delayOut=audioCtx.createGain();

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
      // ruido[srcAux].stop();
      // ruido[0].stop();
      muestreo();
    }catch{}
    }, amp1[3]*1000);
}

function transponer(st){

  try{clearTimeout(delaySt);}catch{}

  trans+=st;
  if(trans<-6)trans=-6;
  if(trans>6)trans=6;

  if(st==0)trans=0;
  
  for(i=0;i<arrayRelaciones.length;i++)arrayRelaciones[i]=arrayRelaciones2[i+6+trans];
  
  if(trans<=0)document.querySelector("#trans").innerHTML=`${trans} st`;
  else document.querySelector("#trans").innerHTML=`+${trans} st`;

  if(st!=0)document.querySelector("#trans").style.cssText="top:-30px;transition:top 0.2s;";

    delaySt=setTimeout(() => {
      document.querySelector("#trans").style.cssText="top:0px;transition:top 0.5s;";
    }, 2000);

  crearArrays();

}

async function loadIR(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

//Clicks
function clickEnv1(){

  let total=580;
  let posCanvas = canvasAmp.getBoundingClientRect();
  
  if(!esTactil)posX=Math.floor((event.clientX-posCanvas.left)/coefZoom);
  else posX=Math.floor((event.touches[0].clientX - posCanvas.left)/coefZoom);

  if(!triggerAmp1){

    if(!esTactil)posY=Math.floor((event.clientY-posCanvas.top)/coefZoom);
    else posY=Math.floor((event.touches[0].clientY-posCanvas.top)/coefZoom);

    if(posX>=135&&posX<=151&&posY>=123&&posY<=139){
      if(indiceEnv==2)habLow1=!habLow1;
      if(indiceEnv==3)habHigh1=!habHigh1;
      muestreoEnv1();
      document.querySelector("#env").removeEventListener("mousemove",clickEnv1);
      triggerAmp1=true;
      return;
    }

    posY=Math.floor(posY/20);
    
  }
  triggerAmp1=true;

  if(indiceEnv==1){
    
    if(posY==2||posY==4)posX=posX*maxAmps[posY]/total;
    else posX=minsEnv[posY]+(posX*posX*posX)/(34000*total);
    posX=parseFloat(posX.toFixed(5));
    
    if(posY<5)amp1[posY]=posX;

  }
  if(indiceEnv==2){
    if(posY==2||posY==5)posX=posX*maxFiltros[posY]/total;
    else posX=minsFiltros[posY]+(posX*posX*posX)/(34000*total);
    if(posY==4)posX*=1000;
    posX=parseFloat(posX.toFixed(5));
    
    if(posY<6)filtroLow1[posY]=posX;
  }
  if(indiceEnv==3){
    if(posY==2||posY==5)posX=posX*maxFiltros[posY]/total;
    else posX=minsFiltros[posY]+(posX*posX*posX)/(34000*total);
    if(posY==4)posX*=1000;
    posX=parseFloat(posX.toFixed(5));

    if(posY<6)filtroHigh1[posY]=posX;
  }

  for(i=0;i<=5;i++){
    if(amp1[i]<minsEnv[i])amp1[i]=minsEnv[i];
    if(amp1[i]>maxsEnv[i])amp1[i]=maxsEnv[i];
  }
  for(i=0;i<=5;i++){
    if(filtroLow1[i]<minsFiltros[i])filtroLow1[i]=minsFiltros[i];
    if(filtroLow1[i]>maxsFiltros[i])filtroLow1[i]=maxsFiltros[i];
  }
  for(i=0;i<=5;i++){
    if(filtroHigh1[i]<minsFiltros[i])filtroHigh1[i]=minsFiltros[i];
    if(filtroHigh1[i]>maxsFiltros[i])filtroHigh1[i]=maxsFiltros[i];
  }

  crearArrays();
  muestreoEnv1();

}

function clickCustom(){

  let posCanvas = canvasCustom.getBoundingClientRect();

  if(!esTactil) posY2=1*coefZoom+(posCanvas.top-event.clientY)/(canvasCustom.height)-0.01;
  else posY2=1*coefZoom+(posCanvas.top-event.touches[0].clientY)/(canvasCustom.height)-0.01;

  posY2=posY2/coefZoom;
  posY2=parseFloat(posY2.toFixed(2));

  if(!triggerCustom){
    if(!esTactil) posX2=(event.clientX-posCanvas.left-2)/anchoColumna;
    else posX2=(event.touches[0].clientX-posCanvas.left-2)/anchoColumna;
    posX2=posX2/coefZoom;
    posX2=Math.floor(posX2);
    if(posX2<0)posX2=0;
    if(posX2>cantArmonicos)posX2=cantArmonicos;
  }
  triggerCustom=true;  

  if(indiceOnda==3)armonicosRandom[posX2]=posY2;
  else armonicosCustom[posX2]=posY2;

  mostrarCustom();

}

function clickAncho(){

  let posCanvas = canvasAncho.getBoundingClientRect();

  posY3=Math.floor(event.clientY-posCanvas.bottom);
  posY3=posY3/coefZoom;
  if(posY3<-192)posY3=-192;
  if(posY3>-5)posY3=-5;
  anchoCuadrada=-posY3/1.92;
  coefAncho=100/anchoCuadrada;

  crearArrays();
  muestreoAncho();

}

function clickEcu(){
  let rect = canvasEcu.getBoundingClientRect();

  try{
    if(!esTactil){
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }else{
      mouseX = event.touches[0].clientX - rect.left;
      mouseY = event.touches[0].clientY - rect.top;
    }

  mouseX=mouseX/coefZoom;
  mouseY=mouseY/coefZoom;

  for(i=0;i<cantidadFiltros;i++){
        if(mouseX>=Xfiltros[i]-16&&mouseX<=Xfiltros[i]+16&&mouseY>=Yfiltros[i]-16&&mouseY<=Yfiltros[i]+16&&indiceEcu==null)indiceEcu=i;
  }

  if(indiceEcu==null)indiceEcu=999;

  if(indiceEcu!=null&&indiceEcu!=999){
      Xfiltros[indiceEcu]=mouseX;Yfiltros[indiceEcu]=mouseY;

      let t = Math.min(Math.max(mouseX / 700, 0), 1);
      frecuenciaAux=Math.round(20 * Math.pow(20000 / 20, t));
      if(boolFiltros[indiceEcu])filtros[indiceEcu].frequency.value=frecuenciaAux;
      freqFiltros[indiceEcu]=frecuenciaAux;

      valorQaux=20-mouseY/6;
      if(boolFiltros[indiceEcu]&&(indiceEcu==0||indiceEcu==3))filtros[indiceEcu].Q.value=valorQaux;
      if(boolFiltros[indiceEcu]&&(indiceEcu==1||indiceEcu==2))filtros[indiceEcu].gain.value=valorQaux;
      dBFiltros[indiceEcu]=valorQaux;

  }

  
  }catch{}

  for(i=0;i<4;i++){
      let t = Math.min(Math.max(Xfiltros[i] / 700, 0), 1);
      frecuenciaAux=Math.round(20 * Math.pow(20000 / 20, t));
      if(boolFiltros[i])filtros[i].frequency.value=frecuenciaAux;
      freqFiltros[i]=frecuenciaAux;

      valorQaux=20-Yfiltros[i]/6;
      if(boolFiltros[i]&&(i==0||i==3))filtros[i].Q.value=valorQaux;
      if(boolFiltros[i]&&(i==1||i==2))filtros[i].gain.value=valorQaux;
      dBFiltros[i]=valorQaux;
  }


  if(!boolFiltros[0]){filtros[0].Q.value=0;filtros[0].frequency.value=0;}
  if(!boolFiltros[1]){filtros[1].gain.value=0;}
  if(!boolFiltros[2]){filtros[2].gain.value=0;}
  if(!boolFiltros[3]){filtros[3].Q.value=0;filtros[3].frequency.value=24000;}

  muestreoEcu();

}

function clickFX(){
  let rect = canvasFX.getBoundingClientRect();

  if(!esTactil){
    mouseX=event.clientX - rect.left;
    // mouseY=rect.top-event.clientY;
    mouseY=event.clientY - rect.top;
  }else{
    mouseX = event.touches[0].clientX - rect.left;
    mouseY = rect.top - event.touches[0].clientY;
  }

  mouseX=mouseX/coefZoom;
  mouseY=mouseY/coefZoom;
  if(esTactil)mouseY*=-1;

  if(!triggerFX){
    for(i=0;i<xBoolFX.length;i++){
      // if(mouseX>=xBoolFX[i]&&mouseX<=xBoolFX[i]+15&&mouseY<=185&&mouseY>=170)boolFX[i]=!boolFX[i];
      // if(mouseX>=xBoolFX[i]-5&&mouseX<=xBoolFX[i]+20&&mouseY<=190&&mouseY>=165)boolFX[i]=!boolFX[i];
      if(mouseX>=xBoolFX[i]-5&&mouseX<=xBoolFX[i]+20&&mouseY<=35&&mouseY>=15)boolFX[i]=!boolFX[i];
    }
  }

  if(!triggerFX){
    if(mouseX>=370&&mouseX<=390&&mouseY>=40&&mouseY<=55){selecRev=0;crearReverb();};
    if(mouseX>=370&&mouseX<=390&&mouseY>=70&&mouseY<=90){selecRev=1;crearReverb();};
    if(mouseX>=370&&mouseX<=390&&mouseY>=105&&mouseY<=125){selecRev=2;crearReverb();};
    if(mouseX>=370&&mouseX<=390&&mouseY>=145&&mouseY<=165){selecRev=3;crearReverb();};
  }

  if(!triggerFX){
    for(i=0;i<xFX.length;i++){
      if(mouseX>=xFX[i]&&mouseX<=xFX[i]+28&&mouseY>=42&&mouseY<=172)indiceFX=i;
    }
  }

  if(indiceFX>=0){

    let min=matrizEfectos[indiceFX][1],max=matrizEfectos[indiceFX][2];

    let yAux=Math.round(130-mouseY+42);
    if(yAux<0)yAux=0;if(yAux>130)yAux=130;
    matrizEfectos[indiceFX][0]=min + (yAux / 130) * (max - min);

  }

  triggerFX=true;

  muestreoFX();
}

function silenciar(){

  for(i=0;i<=24;i++){
    try{
      detener(i);
      sonando[i]=false;
    }catch{}
  }

  for(i=0;i<sources.length;i++){
    try{
      sources[i].disconnect();
      ganancias[i].disconnect();
      filtrosHigh[i].disconnect();
      filtrosLow[i].disconnect();
    }catch{}
  }  
  muestreo();
}



document.querySelector("#refrescar").addEventListener("mousedown",()=>{
  // if(indiceOnda==5&&indiceEnv==0){for(i=0;i<cantArmonicos;i++)armonicosCustom[i]=0;mostrarCustom();}
  if(indiceOnda==4&&indiceEnv==0){for(i=0;i<cantArmonicos;i++)armonicosCustom[i]=0;mostrarCustom();}
  if(indiceOnda==3&&indiceEnv==0){
    armonicosRandom.splice(0,armonicosRandom.length);
    cantArmonicosRandom=Math.round(Math.random()*cantArmonicos);
    for(i=0;i<cantArmonicosRandom;i++)armonicosRandom[i]=parseFloat(Math.random().toFixed(3));
    for(i=cantArmonicosRandom;i<cantArmonicos;i++)armonicosRandom[i]=0;
    mostrarCustom();crearArrays();
  }
  if(indiceEnv==1){
    amp1[0]=0.005+Math.random()*2;
    if(amp1[0]<1)amp1[0]=parseFloat(amp1[0].toFixed(3));
    amp1[1]=0.005+Math.random()*2;
    if(amp1[1]<1)amp1[1]=parseFloat(amp1[1].toFixed(3));
    amp1[2]=Math.random();
    amp1[2]=parseFloat(amp1[2].toFixed(2));
    amp1[3]=0.005+Math.random()*2;
    if(amp1[3]<1)amp1[3]=parseFloat(amp1[3].toFixed(3));
  }
  if(indiceEnv==2){
    filtroLow1[0]=0.005+Math.random()*2;
    if(filtroLow1[0]<1)filtroLow1[0]=parseFloat(filtroLow1[0].toFixed(3));
    filtroLow1[1]=0.005+Math.random()*2;
    if(filtroLow1[1]<1)filtroLow1[1]=parseFloat(filtroLow1[1].toFixed(3));
    filtroLow1[2]=Math.random();
    filtroLow1[2]=parseFloat(filtroLow1[2].toFixed(2));
    filtroLow1[3]=0.005+Math.random()*2;
    if(filtroLow1[3]<1)filtroLow1[3]=parseFloat(filtroLow1[3].toFixed(3));
    filtroLow1[4]=Math.random()*10000;
    filtroLow1[5]=Math.random()*15;
  }
  if(indiceEnv==3){
    filtroHigh1[0]=0.005+Math.random()*2;
    if(filtroHigh1[0]<1)filtroHigh1[0]=parseFloat(filtroHigh1[0].toFixed(3));
    filtroHigh1[1]=0.005+Math.random()*2;
    if(filtroHigh1[1]<1)filtroHigh1[1]=parseFloat(filtroHigh1[1].toFixed(3));
    filtroHigh1[2]=Math.random();
    filtroHigh1[2]=parseFloat(filtroHigh1[2].toFixed(2));
    filtroHigh1[3]=0.005+Math.random()*2;
    if(filtroHigh1[3]<1)filtroHigh1[3]=parseFloat(filtroHigh1[3].toFixed(3));
    filtroHigh1[4]=Math.random()*10000;
    filtroHigh1[5]=Math.random()*15;
  }
  if(indiceEnv==4){
    boolFiltros=[0,0,0,0];
    Xfiltros=[100,250,500,600];
    Yfiltros=[101,101,101,101];
    Qfiltros=[0,1,1,0];
    clickEcu();
  }
  if(indiceEnv==5){
    boolFX=[false,false,false,false,false];
    selecRev=1;
    for(i=0;i<matrizEfectos.length;i++)matrizEfectos[i][0]=matrizEfectos[i][1];
    matrizEfectos[8][0]=0;
    muestreoFX();
  }

  muestreoEnv1();

})
document.querySelector("#borrar").addEventListener("mousedown",borrar);

function borrar(){
  indiceOnda=0;
  
  boolEnv=false,boolAmp1=false,boolLow1=false,habLow1=false,boolHigh1=false,habHigh1=false;
  amp1=[0.01,1,0.5,0.5,0.5],maxAmps=[10,10,1,10,1];boolCustom=false;
  filtroLow1=[1,1,0.3,0.5,1500,10],maxFiltros=[10,10,1,10,10000,20];
  filtroHigh1=[1,1,0.3,0.5,1500,10];
  armonicosCustom=[1,0.5,0.3];
  indiceInst=0;

  boolFiltros=[0,0,0,0],Xfiltros=[100,250,500,600],Yfiltros=[80,160,20,101],freqFiltros=[54,236,2779,7455],dBFiltros=[6.66,-6.66,16.66,3,16],Qfiltros=[0,1,5,0],xEcu,yEcu,qEcu;
  
  matrizEfectos=[[7,0.2,20],[0.6,0,1],[8,0.2,15],[0.03,0.01,0.1],[0.3,0.05,1],[0.4,0.05,0.8],[0.3,0,1],[0.4,0,1],[0,-2,2],[0.3,0,1],[0.3,0,0.9],[0.8,0,1],[0.2,0,1]];
  boolFX=[false,false,false,false,false,false,false],selecRev=1,indiceFX=-1;

  octava=2;

  transponer(0);

  muestreoFX();muestreoEcu();muestreoEnv1();

  document.querySelector("#ancho").style.cssText="left:10px;transition:left 0.5s;";
  document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";

  crearArrays();
}

const esTactil = window.matchMedia('(pointer: coarse)').matches;

if(esTactil){
    scrollStyle = document.createElement('style');
    scrollStyle.textContent = `
      ::-webkit-scrollbar { display: none; }
      * { scrollbar-width: none; }
    `;
    document.head.appendChild(scrollStyle); 
}
let notasClick=[];
let patronPiano=[0,1,2,1,0,0,1,2,1,2,1,0,0,1,2,1,0,0,1,2,1,2,1,0,0];

function clickear(event){
    
  let rect = canvasTeclado.getBoundingClientRect();
  let mouseX,mouseY;

  let dedo=0;
  if(esTactil){
    for (let touch of event.changedTouches) {
      dedo=touch.identifier;
    }
  }

  if(!esTactil){
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }else{
    mouseX = event.touches[dedo].clientX - rect.left;
    mouseY = event.touches[dedo].clientY - rect.top;
  }
  
  mouseX=mouseX/coefZoom;
  mouseY=mouseY/coefZoom;

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

  notasClick[dedo]=nota;

  muestreo();

}

function detenerClick(event){

  let dedo=0;
  if(esTactil){
    for (let touch of event.changedTouches) {
      dedo=touch.identifier;
    }
  }

  let notaClick=notasClick[dedo]

  let srcAux=ultimoSource[notaClick];

  apretando[notaClick]=false;

  const t = audioCtx.currentTime;
  try{
    ganancias[srcAux].gain.cancelScheduledValues(t);
    ganancias[srcAux].gain.setValueAtTime(ganancias[srcAux].gain.value, t);
    ganancias[srcAux].gain.linearRampToValueAtTime(0, t + amp1[3]);
  }catch{}

  setTimeout(() => {
    try{
      sonando[notaClick]=false;
      sources[srcAux].stop();
      muestreo();
    }catch{}
    }, amp1[3]*1000);
}

function funcionDebug1(){
}
function funcionDebug2(){
}
function p(cosa="XD"){
  console.log(cosa);
}

