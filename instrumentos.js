let indiceInst=0;
let instrumentos=[
  "Piano - Sustain","Piano","Órgano",
  "Teclado","Bajo","8-bit","Sinte 1",
  "Sinte 2","Eco","Campana","Violín",
  "Guitarra","Coro","Theremin","Flauta"
  // ,"Bombo","Clap","Hihat","Snare","Aro",
  // "Maraca","Crash"
];

function cambiarInst(){
  if(indiceInst<0)indiceInst=instrumentos.length-1;
  else if(indiceInst>=instrumentos.length)indiceInst=0;
  document.querySelector("#textoIns").innerHTML=instrumentos[indiceInst];

  switch(indiceInst){
    case 0:   //Piano - sustain
      armonicosCustom=[1,0.6,0.8,0.6,0.5,0.45,0.3,0.15,0.1,0.15,0.1,0.12,0.06,0.06,0.1,0.05,0.02,0.01,0.01,0.02,0.04,0.02];
      amp1=[0.005,0.018,0.75,0.651,0.7];
      filtroLow1=[0,0.6,0.5,2,1660,0];
      habLow1=true;      
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=0.98;
      crearReverb();
      indiceOnda=4;
      octava=1;
      break;
    case 1:   //Piano
      armonicosCustom=[1,0.6,0.8,0.6,0.5,0.45,0.3,0.15,0.1,0.15,0.1,0.12,0.06,0.06,0.1,0.05,0.02,0.01,0.01,0.02,0.04,0.02];
      amp1=[0.005,0.018,0.75,0.1,0.7];
      filtroLow1=[0,0.6,0.5,2,1660,0];
      habLow1=true;      
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=0.98;
      crearReverb();
      indiceOnda=4;
      octava=1;
      break;
    case 2:   //Organo
      armonicosCustom=[0.422, 0.68, 0.934, 0.173, 0.463, 0.494, 0.110, 0.525, 0.168, 0.2]
      amp1=[0.03,0.018,0.75,0.6,0.7];
      filtroLow1=[0,0.6,0.5,2,1660,0];
      habLow1=true;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[1,0,0,1,0,0,0];
      selecRev=1;
      matrizEfectos[7][0]=0.45;
      matrizEfectos[0][0]=0.05;
      matrizEfectos[1][0]=0.1;
      crearReverb();
      indiceOnda=4;
      octava=1;
      break;
    case 3:   //Teclado
      armonicosCustom=[1,0.6,0.8,0.6,0.5,0.45,0.3,0.15];
      amp1=[0.005,0.018,0.75,0.5,0.7];
      habLow1=true;
      filtroLow1=[0,0.6,0.5,2,1660,0];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=0.9;
      crearReverb();
      indiceOnda=4;
      octava=2;
      break;
    case 4:   //Bajo
      armonicosCustom=[1,0.9,0.2,0.1];
      amp1=[0.005,2,0,0.07,0.8];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=0.15;
      crearReverb();
      indiceOnda=4;
      octava=1;
      break;
    case 5:   //8-bit
      amp1=[0.005,0,1,0.005,0.5];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,0,0,0,0];
      selecRev=0;
      indiceOnda=1;
      octava=2;
      coefAncho=1;
      break;
    case 6:   //Sinte 1
      amp1=[0.02,1,0.6,0.7,0.5];
      habLow1=true;
      filtroLow1=[0.8,1,0.4,2,1000,7];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[1,0,0,1,0,0,0];
      selecRev=1;
      matrizEfectos[7][0]=0.3;
      matrizEfectos[0][0]=8;
      matrizEfectos[1][0]=0.8;
      indiceOnda=2;
      octava=2;
      break;
    case 7:   //Sinte 2
      amp1=[0.06,1,0.8,0.2,0.4];
      habLow1=true;
      filtroLow1=[0,1.3,0.6,0.5,1700,15];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=1;
      matrizEfectos[7][0]=0.4;
      indiceOnda=2;
      octava=0;
      break;
    case 8:   //Eco
      amp1=[0.04,0.25,0,0.15,0.5];
      armonicosCustom=[1,0.9,0.2];
      habLow1=true;
      filtroLow1=[0.18,0.15,0.4,0.5,1500,10];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,1,1,0,0,0,0];
      matrizEfectos[2][0]=8;
      matrizEfectos[3][0]=0.03;
      matrizEfectos[4][0]=0.2;
      matrizEfectos[5][0]=0.45;
      matrizEfectos[6][0]=0.45;
      indiceOnda=4;
      octava=2;
      break;
    case 9:   //Campana
      armonicosCustom = [1.000, 0.003, 0.759, 0.004, 0.002, 0.011, 0.001, 0.002, 0.003, 0.176, 0.003, 0.001,0,0,0,0,0.3,0,0,0.2,0,0,0.25];
      amp1=[0.007,1.5,0,0.5,0.5];
      habLow1=true;
      filtroLow1=[0,0.6,0.5,2,4000,3];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,1,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=0.9;
      matrizEfectos[2][0]=5;
      matrizEfectos[3][0]=0.01;
      crearReverb();
      indiceOnda=4;
      octava=4;
      break;
    case 10:    //Violín
      armonicosCustom = [0.473, 0.67, 0.546, 0.47, 0.651, 0.421, 0.256, 0.023, 0.948, 0.187, 0.202, 0.426, 0.655, 0.587, 0.575];
      amp1=[0.05, 0.4, 0.4, 0.2, 0.8]
      habLow1=true;
      filtroLow1=[0,0.6,0.5,2,4000,3];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,1,0,1,0,0,0];
      selecRev=0;
      matrizEfectos[7][0]=1;
      matrizEfectos[2][0]=5;
      matrizEfectos[3][0]=0.02;
      crearReverb();
      indiceOnda=4;
      octava=4;
      break;
    case 11:    //Guitarra
      armonicosCustom = [0.159, 0.937, 0.279, 0.959, 0.505, 0.902, 0.218, 0.809, 0.514, 0.075, 0.845, 0.064, 0.396, 0.331, 0.49, 0.883, 0.752, 0.264, 0.937, 0.165, 0.668, 0.716, 0.387, 0.247, 0.032, 0.958, 0.669, 0.128, 0.885, 0.119, 0.743, 0.534, 0.603, 0.298, 0.832, 0.246, 0.101, 0.771, 0.942, 0.603, 0.362, 0.069, 0.704, 0.731, 0.325, 0.888];
      amp1=[0.00504, 3, 0, 0.3, 0.65];
      habLow1=true;
      filtroLow1=[0, 0.47, 0.25, 0.5, 2010, 0];
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,1,0,0,0];
      selecRev=1;
      matrizEfectos[7][0]=1;
      matrizEfectos[2][0]=5;
      matrizEfectos[3][0]=0.02;
      crearReverb();
      indiceOnda=4;
      octava=2;
      break;
    case 12:    //Coro
      armonicosCustom = [0.43, 0.48, 0.54, 0.45, 0.54, 0.4, 0.17, 0.18, 0.31, 0.28, 0.38, 0.42, 0.29];
      amp1=[1.5, 1, 1, 0.2, 0.3];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[1,1,0,1,0,0,0];
      selecRev=3;
      matrizEfectos[7][0]=1;
      matrizEfectos[2][0]=5;
      matrizEfectos[3][0]=0.02;
      matrizEfectos[0][0]=5;
      matrizEfectos[1][0]=0.02;
      crearReverb();
      indiceOnda=4;
      octava=2;
      break;
    case 13:    //Theremin
      amp1=[0.3, 0.3, 0.5, 0.5, 0.5];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[1,1,0,0,0,0,0];
      matrizEfectos[0][0]=3;
      matrizEfectos[1][0]=0.075;
      matrizEfectos[2][0]=5;
      matrizEfectos[3][0]=0.05;
      indiceOnda=0;
      octava=3;
      break;
    case 14:    //Flauta
      amp1=[0.1, 0.3, 1, 0.5, 0.25];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[1,0,0,1,1,0,0];
      matrizEfectos[0][0]=3.7;
      matrizEfectos[1][0]=0.16;
      matrizEfectos[7][0]=0.7;
      matrizEfectos[8][0]=-0.15;
      matrizEfectos[9][0]=0.015;
      selecRev=0;
      crearReverb();
      indiceOnda=0;
      octava=4;
      break;
    case 15:    //Bombo
      amp1=[0.006, 0.25, 0, 0.1, 0.8];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[0,0,0,0];
      boolFX=[0,0,0,0,1,0,0];
      matrizEfectos[8][0]=2;
      matrizEfectos[9][0]=0.05;
      indiceOnda=0;
      octava=0;
      break;
    case 16:    //Clap
      amp1=[0.005, 0.215, 0, 0.1, 0.6];
      habLow1=false;
      habHigh1=true;
      filtroHigh1=[0.073, 0.005, 1, 10, 490, 0.035]
      boolFiltros=[1,0,1,1];
      Xfiltros=[164, 250, 460, 640]
      Yfiltros=[45, 160, 50, 145]
      Qfiltros=[0,1,0.25,0]
      filtros[2].Q.value=Qfiltros[2];
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;
    case 17:    //Hi-Hat
      amp1=[0.005, 0.05, 0, 0.03, 0.6];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[1,0,0,1];
      Xfiltros=[410, 160, 50, 670]
      Yfiltros=[166, 160, 50, 166]
      Qfiltros=[0,1,0.25,0]
      filtros[2].Q.value=Qfiltros[2];
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;
    case 18:    //Snare
      amp1=[0.005, 0.075, 0, 0.05, 0.6];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[1,0,1,1];
      Xfiltros=[120, 160, 230, 610]
      Yfiltros=[150, 160, 60, 160]
      Qfiltros=[0,1,0.4,0]
      filtros[2].Q.value=Qfiltros[2];
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;
    case 19:    //Aro
      amp1=[0.005, 0.015, 0, 0.05, 0.4];
      habLow1=true;
      filtroLow1=[0, 0.015, 0, 0.01, 3000, 0];
      habHigh1=false;
      boolFiltros=[1,0,0,0];
      Xfiltros=[300, 250, 500, 600];
      Yfiltros=[40, 160, 20, 101];
      Qfiltros=[0,1,1,0]
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;
    case 20:    //Maraca
      amp1=[0.03, 0.03, 0, 0.05, 0.5];
      habLow1=false;
      habHigh1=false;
      boolFiltros=[1,0,1,0];
      Xfiltros=[408,250,630,600];
      Yfiltros=[181, 160, 64, 101];
      Qfiltros=[0,1,0.46,0];
      filtros[2].Q.value=Qfiltros[2];
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;
    case 21:    //Crash
      amp1=[0.015, 0.7, 0, 0.16, 0.5]
      habLow1=true;
      filtroLow1=[0, 0.7, 0.5, 0.5, 6300, 0.07]
      habHigh1=false;
      boolFiltros=[1,0,1,1];
      Xfiltros=[440,325,541,660];
      Yfiltros=[135, 75, 78, 160];
      Qfiltros=[0,1,0.66,0];
      filtros[2].Q.value=Qfiltros[2];
      boolFX=[0,0,0,0,0,0,1];
      matrizEfectos[12][0]=1;
      break;

    }
    
    clickEcu();

  for(i=armonicosCustom.length;i<cantArmonicos;i++)armonicosCustom[i]=0;

  crearArrays();
  muestreoFX();
  mostrarAncho();

}

function obtenerIndice(notaMidi) {
  const base = notaMidi % 12; 
  const octava = Math.floor(notaMidi / 12); 

  const octavaRelativa = (octava - 1); // Ajuste para centrar

  let indice = base + (octavaRelativa * 12);

  if (indice < 0) indice = 0;
  if (indice > 24) indice = 24;

  return indice;
}

if (navigator.requestMIDIAccess)navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {

  for (let entrada of midiAccess.inputs.values())entrada.onmidimessage = handleMIDIMessage;
  
}

function onMIDIFailure() {
  console.error("No se pudo acceder al dispositivo MIDI");
}

function handleMIDIMessage(event) {
  const [status, note, velocity] = event.data;

  const tipo = status & 0xf0;
  const indice = obtenerIndice(note);

  if (tipo === 0x90 && velocity > 0) {
    reproducir(indice);
    muestreo();
  } else if (tipo === 0x80 || (tipo === 0x90 && velocity === 0)) {
    detener(indice);
    muestreo();
  }
}