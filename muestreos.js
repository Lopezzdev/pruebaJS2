let colorFX="rgba(100, 29, 29, 1)";
let colorFX2="rgba(122,31,31,0.6)";



let coefZoom=1;

function centerDiv() {
    // Aplicar zoom
    let anchoTotal=document.documentElement.clientWidth;
    if(anchoTotal>800)anchoTotal=800;
    let anchoCanvas=document.querySelector("#contCanvas").offsetWidth;
    coefZoom=anchoTotal/anchoCanvas;
    document.querySelector("#contCanvas").style.cssText=`transform:scale(${coefZoom})`

    const target = document.getElementById('contCanvas');
    const rect = target.getBoundingClientRect();

      window.scrollTo({
      left: rect.left + window.scrollX - anchoTotal / 2 + rect.width / 2,
      top: rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2,
      behavior: 'instant'
    });
}

//Mostrar teclado
function muestreo(){

  let posX=3,posX2=33;
  for(i=0;i<25;i++){
    if(i==0||i==2||i==4||i==5||i==7||i==9||i==11||i==12||i==14||i==16||i==17||i==19||i==21||i==23||i==24){

      ctxTeclado.fillStyle="rgba(131, 131, 131, 1)";
      ctxTeclado.fillStyle="rgba(140, 140, 140, 1)";
      ctxTeclado.fillRect(posX, 3, 47, 200);
      if(apretando[i]){
        ctxTeclado.fillStyle="rgba(0,0,0,0.25)";
        ctxTeclado.fillRect(posX, 3, 47, 200);
        ctxTeclado.fillStyle="rgba(0, 0, 0, 0.3)";
        ctxTeclado.strokeStyle="rgba(50,50,50, 0)";

        ctxTeclado.beginPath();

        if(i==4||i==11||i==16||i==23){
          if(!apretando[i+1]){
            ctxTeclado.lineTo(posX+47,0);
            ctxTeclado.lineTo(posX+30,203);
            ctxTeclado.lineTo(posX+47,203);
          }
        }else{
          if(!apretando[i+2]){
            ctxTeclado.lineTo(posX+47,115);
            ctxTeclado.lineTo(posX+30,203);
            ctxTeclado.lineTo(posX+47,203);
          }
        }

        ctxTeclado.fill();
        ctxTeclado.stroke();
        
      }

      ctxTeclado.fillStyle="rgba(255, 255, 255, 0.5)";
      if(!apretando[i])ctxTeclado.fillRect(posX+45,3,2,200);
      ctxTeclado.fillStyle="rgba(0, 0, 0, 0.5)";
      if(!apretando[i])ctxTeclado.fillRect(posX,3,1,200);

      posX+=50;

    }
  }

  for(i=0;i<25;i++){
    if(i==1||i==3||i==6||i==8||i==10||i==13||i==15||i==18||i==20||i==22){
      if(i==6||i==13||i==18)posX2+=50;

      ctxTeclado.fillStyle="rgba(25, 25, 25, 1)";
      ctxTeclado.fillRect(posX2, 3, 37, 120);

      ctxTeclado.fillStyle="rgba(10, 10, 10, 1)";
      ctxTeclado.fillRect(posX2+3,5,28,110);

      ctxTeclado.fillStyle="rgba(255, 255, 255, 0.3)";
      ctxTeclado.fillRect(posX2+30,5,2,110);

      if(apretando[i]){
        ctxTeclado.fillStyle="rgba(255,255,255,0.1)";
        ctxTeclado.fillRect(posX2, 3, 37, 120);
      }
      
      ctxTeclado.fillStyle="rgba(50, 50, 50, 0.5)";
      ctxTeclado.strokeStyle="rgba(50,50,50, 0)";

      ctxTeclado.beginPath();
      ctxTeclado.lineTo(posX2,5);
      if(!apretando[i]){
        if(!apretando[i-1]){
          ctxTeclado.lineTo(posX2-8,10);
          ctxTeclado.lineTo(posX2-12,118);
        }else{
          ctxTeclado.lineTo(posX2-10,10);
          ctxTeclado.lineTo(posX2-18,118);
        }
      }else{
        ctxTeclado.lineTo(posX2-3,10);
        ctxTeclado.lineTo(posX2-5,120);
      }
      ctxTeclado.lineTo(posX2,122);
      ctxTeclado.fill();
      ctxTeclado.stroke();

      posX2+=50;
    }
  }

}
//Mostrar custom
function mostrarCustom(){

  if((indiceOnda==5||indiceOnda==3)){
    document.querySelector("#custom").style.cssText="top:-202px;transition:top 0.5s;";
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:0px;transition:top 0.5s;";
    indiceEnv=0;
    document.querySelector("#refrescar").style.cssText="top:-180px;left:-20px;transition:top 0.5s,left 0.5s;";
  }else{
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    if(indiceEnv==0)document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";
  }

  ctxCustom.clearRect(0,0,canvasCustom.width,canvasCustom.height);

  ctxCustom.fillStyle = "rgb(48,48,48)";
  for(i=0;i<cantArmonicos;i++){
      ctxCustom.fillRect(i*anchoColumna+2, 2, anchoColumna-1, canvasCustom.height-4);
  }

  let alto=canvasCustom.height-4;

  ctxCustom.fillStyle = "rgba(122, 31, 31, 0.6)";
  for(i=0;i<cantArmonicos;i++){
      if(indiceOnda==5)ctxCustom.fillRect(i*anchoColumna+2, alto+2, anchoColumna-1, -armonicosCustom[i]*alto);
      if(indiceOnda==3) ctxCustom.fillRect(i*anchoColumna+2, alto+2, anchoColumna-1, -armonicosRandom[i]*alto);
  }

  mostrarAncho();

}

function muestreoEnv1(){
  ctxAmp.clearRect(0,0,canvasAmp.width,canvasAmp.height);
  ctxAmp.font="16px arial";
  let ancho,total=580;
  ctxAmp.fillStyle="rgba(48, 48, 48, 1)";

  if(indiceEnv<4){
    for(i=0;i<6;i++){
      ctxAmp.fillRect(2,20*i+2,total,18);
    }
  }

  if(indiceEnv==1){
    ctxAmp.fillStyle=colorFX2;
    for(i=0;i<5;i++){

      if(i==2||i==4)ancho=total*amp1[i]/maxAmps[i];
      else ancho=Math.pow((amp1[i]-minsEnv[i])*34000*total,1/3);
      if(ancho>total)ancho=total;

      ctxAmp.fillRect(2,20*i+2,ancho,18);

    }

    ctxAmp.fillStyle=colorFX;
    if(amp1[0]<1)ctxAmp.fillText(`Ataque: ${Math.round(amp1[0]*1000)}ms`, 585, 16);
    else ctxAmp.fillText(`Ataque: ${(amp1[0]).toFixed(2)}s`, 585, 16);
    if(amp1[1]<1)ctxAmp.fillText(`Decay: ${Math.round(amp1[1]*1000)}ms`, 585, 36);
    else ctxAmp.fillText(`Decay: ${(amp1[1]).toFixed(2)}s`, 585, 36);
    ctxAmp.fillText(`Sustain: ${amp1[2].toFixed(2)}`, 585, 56);
    if(amp1[3]<1)ctxAmp.fillText(`Release: ${Math.round(amp1[3]*1000)}ms`, 585, 76);
    else ctxAmp.fillText(`Release: ${(amp1[3]).toFixed(2)}s`, 585, 76);
    ctxAmp.fillText(`Volumen: ${Math.round(amp1[4]*100)}`, 585, 96);
  }
  if(indiceEnv==2){
    ctxAmp.fillStyle=colorFX2;
    for(i=0;i<6;i++){
      if(i==2||i==5) ancho=total/(maxFiltros[i]/filtroLow1[i]);
      else ancho=Math.pow((filtroLow1[i]-minsFiltros[i])*34000*total,1/3);
      if(i==4)ancho/=10;
      if(ancho>total)ancho=total;

      ctxAmp.fillRect(2,20*i+2,ancho,18);
    }

    ctxAmp.fillStyle=colorFX;
    if(filtroLow1[0]<1)ctxAmp.fillText(`Ataque: ${Math.round(filtroLow1[0]*1000)}ms`, 585, 16);
    else ctxAmp.fillText(`Ataque: ${(filtroLow1[0]).toFixed(2)}s`, 585, 16);
    if(filtroLow1[1]<1)ctxAmp.fillText(`Decay: ${Math.round(filtroLow1[1]*1000)}ms`, 585, 36);
    else ctxAmp.fillText(`Decay: ${(filtroLow1[1]).toFixed(2)}s`, 585, 36);
    ctxAmp.fillText(`Sustain: ${filtroLow1[2].toFixed(2)}`, 585, 56);
    if(filtroLow1[3]<1)ctxAmp.fillText(`Release: ${Math.round(filtroLow1[3]*1000)}ms`, 585, 76);
    else ctxAmp.fillText(`Release: ${(filtroLow1[3]).toFixed(2)}s`, 585, 76);
    ctxAmp.fillText(`Freq: ${Math.round(filtroLow1[4])}Hz`, 585, 96);
    ctxAmp.fillText(`Res: ${Math.round(filtroLow1[5])}`, 585, 116);
    
    ctxAmp.fillText(`Habilitar lowpass`, 4, 136);
    ctxAmp.fillRect(135,123,16,16);
    if(!habLow1){
     ctxAmp.fillStyle="rgba(12,12,12,1)";
     ctxAmp.fillRect(136,124,14,14);
    }

  }
  if(indiceEnv==3){
    ctxAmp.fillStyle=colorFX2;
    for(i=0;i<6;i++){
      if(i==2||i==5) ancho=total/(maxFiltros[i]/filtroHigh1[i]);
      else ancho=Math.pow((filtroHigh1[i]-minsFiltros[i])*34000*total,1/3);
      if(i==4)ancho/=10;
      if(ancho>total)ancho=total;
      
      ctxAmp.fillRect(2,20*i+2,ancho,18);
    }

    ctxAmp.fillStyle=colorFX;
    if(filtroHigh1[0]<1)ctxAmp.fillText(`Ataque: ${Math.round(filtroHigh1[0]*1000)}ms`, 585, 16);
    else ctxAmp.fillText(`Ataque: ${(filtroHigh1[0]).toFixed(2)}s`, 585, 16);
    if(filtroHigh1[1]<1)ctxAmp.fillText(`Decay: ${Math.round(filtroHigh1[1]*1000)}ms`, 585, 36);
    else ctxAmp.fillText(`Decay: ${(filtroHigh1[1]).toFixed(2)}s`, 585, 36);
    ctxAmp.fillText(`Sustain: ${filtroHigh1[2].toFixed(2)}`, 585, 56);
    if(filtroHigh1[3]<1)ctxAmp.fillText(`Release: ${Math.round(filtroHigh1[3]*1000)}ms`, 585, 76);
    else ctxAmp.fillText(`Release: ${(filtroHigh1[3]).toFixed(2)}s`, 585, 76);
    ctxAmp.fillText(`Freq: ${Math.round(filtroHigh1[4])}Hz`, 585, 96);
    ctxAmp.fillText(`Res: ${Math.round(filtroHigh1[5])}`, 585, 116);
    
    ctxAmp.fillText(`Habilitar highpass`, 4, 136);
    ctxAmp.fillRect(135,123,16,16);
    if(!habHigh1){
     ctxAmp.fillStyle="rgba(12,12,12,1)";
     ctxAmp.fillRect(136,124,14,14);
    }

  }

}

function mostrarAncho(){
  if(indiceOnda==1)document.querySelector("#ancho").style.cssText="left:-40px;transition:left 0.5s;";
  else document.querySelector("#ancho").style.cssText="left:10px;transition:left 0.5s;";
}

function muestreoAncho(){
  ctxAncho.clearRect(0,0,canvasAncho.width,canvasAncho.height);
  ctxAncho.font="16px arial";

  ctxAncho.fillStyle="rgba(48, 48, 48, 1)";
  ctxAncho.fillRect(5,5,20,192);

  ctxAncho.fillStyle="rgba(122, 31, 31, 0.6)";
  ctxAncho.fillRect(5,197,20,posY3);

}

function muestreoEcu(){
  
  let x,y;

  ctxEcu.clearRect(0,0,canvasEcu.width,canvasEcu.height);

  ctxEcu.fillStyle="rgba(150, 150, 150, 1)";
  ctxEcu.font = '10px arial';

  ctxEcu.strokeStyle="rgba(119, 119, 119, 1)";
  ctxEcu.lineWidth=0.5;

  ctxEcu.beginPath();

  ctxEcu.moveTo(0,101);
  ctxEcu.lineTo(702,101);

  for(i=0;i<guias.length;i++){
    ctxEcu.moveTo(guias[i],2);
    ctxEcu.lineTo(guias[i],200);
  }
  ctxEcu.stroke();
  for(i=0;i<guias.length;i++){
    ctxEcu.clearRect(guias[i]-20,185,40,20);
    ctxEcu.fillText(`${textoGuias[i]}`, guias[i]-(5*textoGuias[i].length)+5, 197);
  }

  //Primer filtro
  ctxEcu.beginPath();

  if(boolFiltros[0]){ctxEcu.strokeStyle="rgb(110, 20, 20)";ctxEcu.lineWidth=4;}
  else{ctxEcu.strokeStyle="rgba(122, 122, 122, 1)";ctxEcu.lineWidth=1;}
  
  x=Xfiltros[0],y=Yfiltros[0];
  ctxEcu.moveTo(x-50,210);
  if(y<100)ctxEcu.quadraticCurveTo(x-30, y, x, y);
  else ctxEcu.quadraticCurveTo(x-30, y+(y-100)*2, x, y);
  ctxEcu.bezierCurveTo(x+20, y,x+30,100, x+80, 101);
  ctxEcu.lineTo(702,101);
  ctxEcu.stroke();

  //Segundo filtro
  ctxEcu.beginPath();

  if(boolFiltros[1]){ctxEcu.strokeStyle="rgb(110,20,20)";ctxEcu.lineWidth=4;}
  else{ctxEcu.strokeStyle="rgba(122, 122, 122, 1)";ctxEcu.lineWidth=1;}
  
  x=Xfiltros[1],y=Yfiltros[1];q=Qfiltros[1];
  ctxEcu.moveTo(0,101);
  ctxEcu.lineTo(x-20/q,101);
  ctxEcu.bezierCurveTo(x, 101,x-1/q,y, x, y);
  ctxEcu.bezierCurveTo(x+1/q, y,x,101, x+20/q, 101);
  ctxEcu.lineTo(702,101);
  ctxEcu.stroke();

  //Tercer filtro
  ctxEcu.beginPath();

  if(boolFiltros[2]){ctxEcu.strokeStyle="rgba(110,20,20)";ctxEcu.lineWidth=4;}
  else{ctxEcu.strokeStyle="rgba(122, 122, 122, 1)";ctxEcu.lineWidth=1;}
  
  x=Xfiltros[2],y=Yfiltros[2];q=Qfiltros[2];
  ctxEcu.moveTo(0,101);
  ctxEcu.lineTo(x-20/q,101);
  ctxEcu.bezierCurveTo(x, 101,x-1/q,y, x, y);
  ctxEcu.bezierCurveTo(x+1/q, y,x,101, x+20/q, 101);
  ctxEcu.lineTo(702,101);
  ctxEcu.stroke();

  ctxEcu.beginPath();

  if(boolFiltros[3]){ctxEcu.strokeStyle="rgb(110, 20, 20)";ctxEcu.lineWidth=4;}
  else{ctxEcu.strokeStyle="rgba(122, 122, 122, 1)";ctxEcu.lineWidth=1;}
  
  x=Xfiltros[3],y=Yfiltros[3];

  //Cuarto filtro
  ctxEcu.moveTo(x+50,210);

  if(y<100)ctxEcu.quadraticCurveTo(x+30, y, x, y);
  else ctxEcu.quadraticCurveTo(x+30, y+(y-100)*2, x, y);
      
  ctxEcu.bezierCurveTo(x-20, y,x-30,100, x-80, 101);
  ctxEcu.lineTo(0,101);

  ctxEcu.stroke();


  ctxEcu.strokeStyle = "rgba(71, 19, 19, 1)";
  ctxEcu.lineWidth="2";

  ctxEcu.fillStyle="darkred";
  for(i=0;i<cantidadFiltros;i++)ctxEcu.fillRect(Xfiltros[i]-6,Yfiltros[i]-6,12,12);
  ctxEcu.fillStyle="rgba(12,12,12, 1)";
  for(i=0;i<cantidadFiltros;i++)if(!boolFiltros[i])ctxEcu.fillRect(Xfiltros[i]-5,Yfiltros[i]-5,10,10);

}

let xFX=[30,61,140,171,250,281,312,421,500,531,610,641];
let xBoolFX=[83,193,313,443,545,650];
// let colorFX="rgba(112, 32, 32, 1)";

function muestreoFX(){

  ctxFX.clearRect(0,0,canvasFX.width,canvasFX.height);
  
  //Tremolo
  ctxFX.fillStyle=colorFX;
  ctxFX.strokeStyle=colorFX;
  ctxFX.font = '16px arial';
  ctxFX.lineWidth=1.5;

  ctxFX.beginPath();
  ctxFX.roundRect(10,10,100,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Tremolo",21,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("Hz",36,185);
  ctxFX.fillText("%",70,185);
  ctxFX.fillRect(xBoolFX[0],17,15,15);

  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[0],40,28,130);
  ctxFX.fillRect(xFX[1],40,28,130);
  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[0])ctxFX.fillRect(xBoolFX[0]+1,18,13,13);

  //Vibrato
  ctxFX.fillStyle=colorFX;
  ctxFX.font = '16px arial';

  ctxFX.beginPath();
  ctxFX.roundRect(120,10,100,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Vibrato",131,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("Hz",146,185);
  ctxFX.fillText("%",180,185);
  ctxFX.fillRect(xBoolFX[1],17,15,15);

  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[2],40,28,130);
  ctxFX.fillRect(xFX[3],40,28,130);
  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[1])ctxFX.fillRect(xBoolFX[1]+1,18,13,13);

  //Delay
  ctxFX.fillStyle=colorFX;
  ctxFX.font = '16px arial';

  ctxFX.beginPath();
  ctxFX.roundRect(230,10,130,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Delay",261,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("ms",256,185);
  ctxFX.fillText("<<",290,185);
  ctxFX.fillText("%",320,185);
  ctxFX.fillRect(xBoolFX[2],17,15,15);

  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[4],40,28,130);
  ctxFX.fillRect(xFX[5],40,28,130);
  ctxFX.fillRect(xFX[6],40,28,130);

  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[2])ctxFX.fillRect(xBoolFX[2]+1,18,13,13);

  //Reverb
  ctxFX.fillStyle=colorFX;
  ctxFX.font = '16px arial';

  ctxFX.beginPath();
  ctxFX.roundRect(370,10,100,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Reverb",381,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("%",430,185);
  ctxFX.fillRect(xBoolFX[3],17,15,15);

  ctxFX.fillRect(388,60,16,16);
  ctxFX.fillRect(386,90,20,20);
  ctxFX.fillRect(384,124,24,24);
  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[7],40,28,130);

  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[3])ctxFX.fillRect(xBoolFX[3]+1,18,13,13);

  if(selecRev!=0)ctxFX.fillRect(389,61,14,14);
  if(selecRev!=1)ctxFX.fillRect(387,91,18,18);
  if(selecRev!=2)ctxFX.fillRect(385,125,22,22);

  //Pitch
  ctxFX.fillStyle=colorFX;
  ctxFX.font = '16px arial';

  ctxFX.beginPath();
  ctxFX.roundRect(480,10,100,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Pitch",501,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("%",509,185);
  ctxFX.fillText("ms",537,185);
  ctxFX.fillRect(xBoolFX[4],17,15,15);

  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[8],40,28,130);
  ctxFX.fillRect(xFX[9],40,28,130);

  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[4])ctxFX.fillRect(xBoolFX[4]+1,18,13,13);

  //Distorsion
  ctxFX.fillStyle=colorFX;
  ctxFX.font = '16px arial';

  ctxFX.beginPath();
  ctxFX.roundRect(590,10,100,182,10);
  ctxFX.stroke();

  ctxFX.fillText("Dist.",615,30);
  ctxFX.font = '14px arial';
  ctxFX.fillText("%",619,185);
  ctxFX.fillText("cut",644,185);
  ctxFX.fillRect(xBoolFX[5],17,15,15);

  ctxFX.fillStyle="rgba(48, 48, 48, 1)";
  ctxFX.fillRect(xFX[10],40,28,130);
  ctxFX.fillRect(xFX[11],40,28,130);

  ctxFX.fillStyle="rgba(12,12,12, 1)";
  if(!boolFX[5])ctxFX.fillRect(xBoolFX[5]+1,18,13,13);

  //Relleno de las barras
  ctxFX.fillStyle=colorFX;
  let alt;
  for(i=0;i<xFX.length;i++){
    let val=matrizEfectos[i][0],min=matrizEfectos[i][1],max=matrizEfectos[i][2];
    alt=((val-min)/(max-min))*130
    ctxFX.fillRect(xFX[i],170,28,-alt);
  }

}


function muestreoDebug(){

  ctxDebug.strokeStyle = "rgba(71, 19, 19, 1)";
  ctxDebug.lineWidth="3";
  ctxDebug.clearRect(0,0,canvasDebug.width,canvasDebug.height);

  //Mostrar onda
  ctxDebug.beginPath();

  for(i=0;i<canvasDebug.width;i++){
    let numOnda=Math.floor(i/matrizNotas[0].length);
    ctxDebug.lineTo(i,matrizNotas[0][i-numOnda*matrizNotas[0].length]*200+100);
  }

  ctxDebug.stroke();

  // mostrar eje
  ctxDebug.strokeStyle = "green";
  ctxDebug.lineWidth="1";
  ctxDebug.beginPath();
  ctxDebug.moveTo(0,100);
  ctxDebug.lineTo(1000,100);
  ctxDebug.stroke();

  //Mostrar 1er suavizado
  ctxDebug.strokeStyle = "yellow";
  ctxDebug.beginPath();

  for(i=0;i<canvasDebug.width;i++){
    let numOnda=Math.floor(i/distaux.length);
    ctxDebug.lineTo(i,distaux[i-numOnda*distaux.length]*200+100);
  }

  ctxDebug.stroke();
  
}


crearArrays();
muestreoEnv1();
muestreoAncho();
muestreoEcu();
muestreoFX();