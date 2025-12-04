let indiceTut=0;

// document.querySelector("#bloqueoGral").addEventListener("mousedown",()=>{indiceTut=15;});
document.querySelector("#saltar").addEventListener("mousedown",()=>{

  indiceTut++;

  switch(indiceTut){
    case 1:
      document.querySelector("#tutorial").style.cssText="transform:scale(0);transition:all 0.25s;"
      document.querySelector("#bloqueoGral").style.display="none";
      desbloqueo();
      break;
    case 2:
      moverTut(0,20,80,"El sintetizador se puede tocar con el teclado, de forma táctil, o<br>con un dispositivo MIDI")
      break;
    case 3:
      document.querySelector("#bloqueoTut").style.display="block";
      moverTut(-265,230,40,"Acá, están las formas de onda");
      let arrayAux=["botSeno","botCuadrada","botTriangular","botRandom","botCustom"];
      for(let i=0;i<5;i++){

        setTimeout(() => {
          reproducir(12);
          reproducir(16);
          reproducir(19);
          muestreo();
          document.querySelector(`#${arrayAux[i]}`).style.cssText="animation: foco 0.8s infinite ease;"
        }, 1000*i+1000);

        setTimeout(() => {
          indiceOnda++;
          crearArrays();
          document.querySelector(`#${arrayAux[i]}`).style.cssText="animation: none;"
          if(i==4)document.querySelector("#bloqueoTut").style.display="none";
        }, 1000*i+1900);
      }
      break;
    case 4:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#subirOctava`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector(`#bajarOctava`).style.cssText="animation: foco 0.8s infinite ease;"
      moverTut(-110,250,60,"Con las flechas, se cambia de octava");
      indiceOnda=1;
      octava=0;
      crearArrays();
      for(let i=0;i<5;i++){
        
        setTimeout(() => {
          reproducir(16);
          reproducir(23);
          muestreo();
        }, 1000*i+1000);

        setTimeout(() => {
          octava++;
          crearArrays();
          if(i==4){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#subirOctava`).style.cssText="animation: none;"
            document.querySelector(`#bajarOctava`).style.cssText="animation: none;"
            octava=1;
            crearArrays();
          }
        }, 1000*i+1900);
      }
      break;
    case 5:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#mas1st`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector(`#menos1st`).style.cssText="animation: foco 0.8s infinite ease;"
      moverTut(-20,250,60,"Usá estos botones<br>para transponer");
      indiceOnda=2;
      octava=2;
      crearArrays();
      for(let i=0;i<5;i++){
        
        setTimeout(() => {
          reproducir(13);
          reproducir(16);
          reproducir(19);
          muestreo();
        }, 1000*i+1000);

        setTimeout(() => {
          transponer(-1);
          if(i==4){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#mas1st`).style.cssText="animation: none;"
            document.querySelector(`#menos1st`).style.cssText="animation: none;"
            crearArrays();
          }
        }, 1000*i+1900);
      }
      break;
    case 6:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botFX`).style.cssText="animation: foco 0.8s infinite ease;"
      moverTut(60,250,60,"Con este botón, accedés a los efectos");

      setTimeout(() => {

          document.querySelector("#bloqueoTut").style.display="none";
          document.querySelector(`#botFX`).style.cssText="animation: none;"
          
      }, 2000);
      
      break;
    case 7:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botFX`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#efectos").style.cssText="top:-202px;transition:top 0.5s;";
      moverTut(-205,430,40,"Cada efecto tiene sus parámetros");

      indiceOnda=2;
      octava=2;
      boolFX[0]=1;
      matrizEfectos[6][0]=0.6;
      matrizEfectos[7][0]=1;
      selecRev=0;
      crearReverb();
      matrizEfectos[8][0]=-0.5;
      matrizEfectos[10][0]=0.9;
      matrizEfectos[11][0]=0.9;
      matrizEfectos[12][0]=0.1;
      crearArrays();
      muestreoFX();

      for(let i=0;i<7;i++){
        
        setTimeout(() => {
          if(i>0)boolFX[i-1]=0;
          boolFX[i]=1;

          muestreoFX();
          reproducir(12);
          reproducir(16);
          reproducir(19);
          reproducir(23);
          muestreo();

          if(i==2){
            setTimeout(()=>detener(12),20)
          }

          if(i==3)moverTut(185,450,60,"Y se manejan de<br>forma independiente");

        }, 2000*i+1000);

        setTimeout(() => {
          detener(12);
          detener(16);
          detener(19);
          detener(23);
          if(i==6){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botFX`).style.cssText="animation: none;"
          }
        }, 2000*i+2000);
      }

      break;
    case 8:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botInst`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#instrumentos").style.cssText="top:-40px;transition:top 0.5s;";
      document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
      moverTut(0,300,60,"Acá, están los<br>sonidos predeterminados");

      indiceInst=0;
      cambiarInst();

      for(let i=0;i<9;i++){
        
        setTimeout(() => {

          reproducir(6);
          reproducir(10);
          reproducir(13);
          reproducir(15);
          muestreo();

          setTimeout(()=>{detener(6);detener(10);detener(13);detener(15);},500);

        }, 2000*i+1000);

        setTimeout(() => {
          if(i<8){
            if(indiceInst==6)indiceInst++;
            indiceInst++;
            cambiarInst();
          }
          if(i==8){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botInst`).style.cssText="animation: none;"
          }

          if(i==4)moverTut(0,300,60,"Cuenta con 14<br>sonidos diferentes");

        }, 2000*i+2000);
      }

      break;
    case 9:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botCentrar`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
      moverTut(150,250,60,"Este botón es para<br>centrar y bloquear la imagen");
        
        setTimeout(() => {

            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botCentrar`).style.cssText="animation: none;"

        }, 2000);

      break;
    case 10:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botAyuda`).style.cssText="animation: foco 0.8s infinite ease;"
      moverTut(150,205,60,"Con este, entrás<br>nuevamente al tutorial");
        
        setTimeout(() => {

            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botAyuda`).style.cssText="animation: none;"

        }, 2000);

      break;

      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botInst`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#instrumentos").style.cssText="top:-40px;transition:top 0.5s;";
      moverTut(-205,-430,60,"Acá, están los<br>sonidos predeterminados");

      indiceOnda=2;
      octava=2;
      boolFX[0]=1;
      matrizEfectos[6][0]=0.6;
      matrizEfectos[7][0]=1;
      selecRev=0;
      matrizEfectos[8][0]=-0.5;
      matrizEfectos[10][0]=0.9;
      matrizEfectos[11][0]=0.9;
      matrizEfectos[12][0]=0.09;
      crearArrays();
      muestreoFX();

      for(let i=0;i<7;i++){
        
        setTimeout(() => {
          if(i>0)boolFX[i-1]=0;
          boolFX[i]=1;

          muestreoFX();
          reproducir(12);
          muestreo();

          if(i==2){
            setTimeout(()=>{detener(12);p();},100)
          }

          if(i==3)moverTut(185,-450,60,"Y se manejan de<br>forma independiente");

        }, 2000*i+1000);

        setTimeout(() => {
          detener(12);
          if(i==6){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#mas1st`).style.cssText="animation: none;"
            document.querySelector(`#menos1st`).style.cssText="animation: none;"
          }
        }, 2000*i+2000);
      }

      break;
    case 11:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botAmp1`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#env").style.cssText="top:-102px;transition:top 0.5s;";
      moverTut(0,360,60,`En "Amp", modificás el<br>comportamiento del volumen`);

      borrar();
      indiceOnda=2;
      octava=1;
      crearArrays();
      indiceEnv=1;
      muestreoEnv1();

      for(let i=0;i<3;i++){
        
        setTimeout(() => {

          reproducir(15);
          reproducir(18);
          reproducir(22);
          muestreo();

          setTimeout(()=>{detener(15);detener(18);detener(22);},1000);
          
          muestreoEnv1();

        }, 3000*i+1000);

        setTimeout(() => {
          if(i==0)amp1=[1.5,1,1,0.8,0.8];
          if(i==1)amp1=[0.1,0.5,0,0.01,0.3];

          crearArrays();

          if(i==2){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botAmp1`).style.cssText="animation: none;"
          }

        }, 3000*i+3000);
      }

      break;
    case 12:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botEQ1`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#ecu").style.cssText="top:-202px;transition:top 0.5s;";
      moverTut(0,440,40,`En "EQ", tenés el ecualizador`);

      borrar();
      indiceOnda=2;
      octava=1;
      crearArrays();
      muestreoEcu();

      Qfiltros[1]=0.46;
      filtros[1].Q.value=Qfiltros[1];

      for(let i=0;i<6;i++){
        
        setTimeout(() => {

          if(i==0){boolFiltros[1]=1;Xfiltros[1]=310;Yfiltros[1]=50;}
          if(i==1){Xfiltros[1]=410;Yfiltros[1]=35;}
          if(i==2){Xfiltros[1]=510;Yfiltros[1]=30;}
          if(i==3){boolFiltros[1]=0;boolFiltros[3]=1;Xfiltros[3]=500;Yfiltros[3]=30;}
          if(i==4){Xfiltros[3]=400;Yfiltros[3]=30;}
          if(i==5){Xfiltros[3]=300;Yfiltros[3]=20;}

          muestreoEcu();
          clickEcu();

          reproducir(15);
          reproducir(17);
          reproducir(22);
          muestreo();

          setTimeout(()=>{detener(15);detener(17);detener(22);},100);
          
        }, 1000*i+500);

        setTimeout(() => {

          if(i==5){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botEQ1`).style.cssText="animation: none;"
            
            setTimeout(()=>{boolFiltros=[0,0,0,0];clickEcu();},500);
          }

        }, 1000*i+1000);
      }

      break;
    case 13:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botLow1`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector(`#botHigh1`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#env").style.cssText="top:-142px;transition:top 0.5s;";
      document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
      moverTut(0,400,60,`En "Lowpass" y "Highpass",<br>están los filtros dinámicos`);

      borrar();
      indiceOnda=1;
      octava=1;
      crearArrays();
      
      indiceEnv=2;
      muestreoEnv1();

      for(let i=0;i<4;i++){
        
        setTimeout(() => {

          if(i==0){habLow1=1;indiceEnv=2;}
          if(i==1){filtroLow1=[-0, 0.5, 0.15, 0.5, 2600, 3];}
          if(i==2){habLow1=0;habHigh1=1;indiceEnv=3;}
          if(i==3){filtroHigh1=[-0, 0.5, 0.15, 0.5, 4600, 3];}

          muestreoEnv1();

          reproducir(15);
          reproducir(17);
          reproducir(22);
          muestreo();

          setTimeout(()=>{detener(15);detener(17);detener(22);},800);
          
        }, 2000*i+1000);

        setTimeout(() => {

          if(i==3){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botLow1`).style.cssText="animation: none;"
            document.querySelector(`#botHigh1`).style.cssText="animation: none;"
          }

        }, 2000*i+2000);
      }

      break;
    case 14:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#borrar`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
      moverTut(395,230,60,"Con este botón, se resetean<br>todos los parámetros");
        
        setTimeout(() => {

            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#borrar`).style.cssText="animation: none;"

        }, 2000);

      break;
    case 15:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector(`#botRandom`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector(`#botCustom`).style.cssText="animation: foco 0.8s infinite ease;"
      document.querySelector("#custom").style.cssText="top:-202px;transition:top 0.5s;";
      moverTut(0,460,60,`En "Random" y en "Custom",<br>cada barra es un armónico`);

      borrar();
      indiceOnda=4;
      octava=1;
      crearArrays();
      
      mostrarCustom();

      for(let i=0;i<4;i++){
        
        setTimeout(() => {

          if(i==1){armonicosCustom=[1,0,0,0.5,0.5,0.2,0,0,0.3,0.3]}
          if(i==2){armonicosCustom=[0.5,0.7,0.1,0.8]}
          if(i==3){armonicosCustom=[1,0.8,0.7,0.2,0.2,0.5,0.2,0.2,0.3,0.35,0.12,0.13,0.14]}
          crearArrays();

          mostrarCustom();

          reproducir(15);
          reproducir(17);
          reproducir(22);
          muestreo();

          setTimeout(()=>{detener(15);detener(17);detener(22);},800);
          
        }, 2000*i+1000);

        setTimeout(() => {

          if(i==3){
            document.querySelector("#bloqueoTut").style.display="none";
            document.querySelector(`#botRandom`).style.cssText="animation: none;"
            document.querySelector(`#botCustom`).style.cssText="animation: none;"
          }

        }, 2000*i+2000);
      }

      break;
    case 16:
      document.querySelector("#bloqueoTut").style.display="block";
      document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";
      document.querySelector("#saltar").style.cssText="width:0%;";
      document.querySelector("#iniciar").style.cssText="width:100%;";
      moverTut(0,0,40,"Que lo disfrutes!");
      document.querySelector("#bloqueoTut").style.display="none";

      break;

  }

})

document.querySelector("#iniciar").addEventListener("mousedown",()=>{

  indiceTut++;

  if(indiceTut==1){
      document.querySelector("#tutorial").style.cssText="height:130px;transition:height 1s;"
      document.querySelector("#textoTut").style.cssText="height:50px;transition:height 1s;"
      document.querySelector("#textoTut").innerHTML="Primero, subí el volumen";
      document.querySelector("#iniciar").innerHTML="Cerrar";
      document.querySelector("#saltar").innerHTML="Siguiente";
  }else{
      moverTut(0,0,40,"");
      document.querySelector("#tutorial").style.cssText="transform:scale(0);transition:all 0.25s;"
      borrar();
      document.querySelector("#bloqueoGral").style.display="none";
      document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
      document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
      document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";
      desbloqueo();
  }

})

let xTuti=250,yTuti=110;
function moverTut(tutX,tutY,alt,txt){
  document.querySelector("#contCanvas").style.cssText=`right:${tutX}px;top:${tutY}px;transform:scale(${coefZoom});transition:top 1s,right 1s;`
  document.querySelector("#tutorial").style.cssText=`right:${xTuti-tutX}px;top:${yTuti-tutY}px;transition:top 1s,right 1s,height 1s;height:${alt+80}px;`
  
  document.querySelector("#textoTut").style.cssText=`height:${alt}px;transition: height 1s;`;
  document.querySelector("#textoTut").innerHTML=txt;

}

document.querySelector("#botAyuda").addEventListener("mousedown",()=>{
  indiceTut=1;
  borrar();
  document.querySelector("#tutorial").style.cssText="height:130px;transform:scale(1);transition:transform 0.25s;"
  document.querySelector("#textoTut").style.cssText="height:50px;"
  document.querySelector("#textoTut").innerHTML="Primero, subí el volumen";
  document.querySelector("#iniciar").innerHTML="Cerrar";
  document.querySelector("#saltar").innerHTML="Siguiente";

  document.querySelector("#saltar").style.cssText="width:50%;";
  document.querySelector("#iniciar").style.cssText="width:50%;";
  
  document.querySelector("#bloqueoGral").style.display="block";
  document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
  document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
  document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
  document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
  document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
})