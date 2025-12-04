let arrayCanvas=["env","custom","ecu"];

// Esperar al cargar y redimensionar
window.addEventListener('load', () => {
  setTimeout(centerDiv, 200);
});

window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
  centerDiv();
});

let boolBloqueo=false;

document.querySelector("#botCentrar").addEventListener("mousedown",bloqueo);

document.querySelector("#botones").addEventListener("touchstart",desbloqueo);
document.querySelector("#botones").addEventListener("mousedown",desbloqueo);
document.querySelector("#botAyuda").addEventListener("mousedown",bloqueo);

function desbloqueo(){
  document.querySelector("#botCentrar").innerHTML=`<img src="./media/bloqueo.png" alt="">`;
  document.querySelector("body").style.cssText="overflow:visible;"
}
function bloqueo(){
  document.querySelector("body").style.cssText="overflow:hidden;"
  centerDiv();
  document.querySelector("#botCentrar").innerHTML=`<img src="./media/desbloqueo.png" alt="">`
  try{event.stopPropagation();}catch{}
}

bloqueo();

//Leer entrada de teclado
document.addEventListener("keydown",(event)=>{

  event.preventDefault();

  for(i=0;i<letras.length;i++){
    if(event.key==letras[i]&&!apretando[i])reproducir(i);
  }
  for(i=0;i<letras2.length;i++){
    if(event.key==letras2[i]&&!apretando[i+12])reproducir(i+12);
  }

  // console.log(event.key);

  if(event.key=="ArrowUp"){if(octava<5){octava++;crearArrays();}}
  if(event.key=="ArrowDown"){if(octava>0){octava--;crearArrays();}}
  if(event.key=="ArrowRight"){indiceOnda++;if(indiceOnda>5)indiceOnda=0;mostrarCustom();crearArrays();}
  if(event.key=="ArrowLeft"){indiceOnda--;if(indiceOnda<0)indiceOnda=5;mostrarCustom();crearArrays();}

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

document.querySelector("#botSeno").addEventListener("mousedown",()=>{indiceOnda=0;mostrarCustom();crearArrays();});
document.querySelector("#botCuadrada").addEventListener("mousedown",()=>{indiceOnda=1;mostrarCustom();crearArrays();});
document.querySelector("#botTriangular").addEventListener("mousedown",()=>{indiceOnda=2;mostrarCustom();crearArrays();});
document.querySelector("#botRandom").addEventListener("mousedown",()=>{indiceOnda=3;mostrarCustom();crearArrays();});
// document.querySelector("#botDrums").addEventListener("mousedown",()=>{indiceOnda=4;mostrarCustom();crearArrays();});
document.querySelector("#botCustom").addEventListener("mousedown",()=>{indiceOnda=4;mostrarCustom();crearArrays();});
document.querySelector("#subirOctava").addEventListener("mousedown",()=>{if(octava<5){octava++;crearArrays();}});
document.querySelector("#bajarOctava").addEventListener("mousedown",()=>{if(octava>0){octava--;crearArrays();}});

document.addEventListener("mouseup",()=>{
  document.querySelector("#env").removeEventListener("mousemove",clickEnv1);triggerAmp1=false;
  document.querySelector("#custom").removeEventListener("mousemove",clickCustom);triggerCustom=false;
  document.querySelector("#ancho").removeEventListener("mousemove",clickAncho);
  document.querySelector("#efectos").removeEventListener("mousemove",clickFX);
});

document.querySelector("#botones").addEventListener("mousedown",crearArrays);
document.querySelector("#efectos").addEventListener("mouseup",crearArrays);

let divsBloqueados=["#teclado","#ecu","#bloqueoAux","#efectos","#env","#custom"];

for(i=0;i<divsBloqueados.length;i++){
  document.querySelector(divsBloqueados[i]).addEventListener('touchmove', function (event) {
  event.preventDefault(); // evita desplazamiento
  }, { passive: false });
}

document.querySelector("#botAmp1").addEventListener("mousedown",()=>{

  if(indiceEnv!=1)indiceEnv=1;
  else indiceEnv=0

  if(indiceEnv==1){
    document.querySelector("#env").style.cssText="top:-102px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:-90px;left:-20px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
    muestreoEnv1();
  }
  else{
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
  
})
document.querySelector("#botLow1").addEventListener("mousedown",()=>{
  
  if(indiceEnv!=2)indiceEnv=2;
  else indiceEnv=0

  if(indiceEnv==2){
    document.querySelector("#env").style.cssText="top:-142px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:-130px;left:-20px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
    muestreoEnv1();
  }
  else{
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
})
document.querySelector("#botHigh1").addEventListener("mousedown",()=>{
  
  if(indiceEnv!=3)indiceEnv=3;
  else indiceEnv=0;
  
  if(indiceEnv==3){
    document.querySelector("#env").style.cssText="top:-142px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:-130px;left:-20px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
    muestreoEnv1();
  }
  else{
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
})
document.querySelector("#botFX").addEventListener("mousedown",()=>{
  
  if(indiceEnv!=5)indiceEnv=5;
  else indiceEnv=0;
  
  if(indiceEnv==5){
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:-202px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:-181px;left:-40px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
    muestreoEcu();
  }
  else{
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:10px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
})
document.querySelector("#botEQ1").addEventListener("mousedown",()=>{
  
  if(indiceEnv!=4)indiceEnv=4;
  else indiceEnv=0;
  
  if(indiceEnv==4){
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:-202px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:-121px;left:-20px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
    muestreoEcu();
  }
  else{
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
})
document.querySelector("#botInst").addEventListener("mousedown",()=>{
  
  if(indiceEnv!=6)indiceEnv=6;
  else indiceEnv=0;
  
  if(indiceEnv==6){
    document.querySelector("#env").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#custom").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#ecu").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#efectos").style.cssText="top:10px;transition:top 0.5s;";
    document.querySelector("#instrumentos").style.cssText="top:-50px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";
    boolCustom=false;
  }
  else{
    document.querySelector("#instrumentos").style.cssText="top:0px;transition:top 0.5s;";
    document.querySelector("#refrescar").style.cssText="top:0px;left:40px;transition:top 0.5s,left 0.5s;";  
  }
})

document.querySelector("#mas1st").addEventListener("mousedown",()=>transponer(1));
document.querySelector("#menos1st").addEventListener("mousedown",()=>transponer(-1));



if(!esTactil){
  document.querySelector("#teclado").addEventListener("mousedown",clickear);
  document.querySelector("#teclado").addEventListener("mouseup",detenerClick);
}else{
  document.querySelector("#teclado").addEventListener("touchstart",clickear);
  document.querySelector("#teclado").addEventListener("touchend",detenerClick);
}



if(!esTactil){
  document.querySelector("#env").addEventListener("mousedown",()=>{
    clickEnv1();
    document.querySelector("#env").addEventListener("mousemove",clickEnv1);
  });
  document.querySelector("#env").addEventListener("mouseup",()=>{
    document.querySelector("#env").removeEventListener("mousemove",clickEnv1);
    triggerAmp1=false;
  });
}else{
  document.querySelector("#env").addEventListener("touchstart",()=>{
    clickEnv1();
    document.querySelector("#env").addEventListener("touchmove",clickEnv1);
  });
  document.querySelector("#env").addEventListener("touchend",()=>{
    document.querySelector("#env").removeEventListener("touchmove",clickEnv1);
    triggerAmp1=false;
  });
}

if(!esTactil){
  document.querySelector("#custom").addEventListener("mousedown",()=>{
    clickCustom();
    document.querySelector("#custom").addEventListener("mousemove",clickCustom);
  });
  document.querySelector("#custom").addEventListener("mouseup",()=>{
    document.querySelector("#custom").removeEventListener("mousemove",clickCustom);
    crearArrays();
    triggerCustom=false;
  });
}else{
  document.querySelector("#custom").addEventListener("touchstart",()=>{
    clickCustom();
    document.querySelector("#custom").addEventListener("touchmove",clickCustom);
  });
  document.querySelector("#custom").addEventListener("touchend",()=>{
    document.querySelector("#custom").removeEventListener("touchmove",clickCustom);
    crearArrays();
    triggerCustom=false;
  });
}


document.querySelector("#ancho").addEventListener("mousedown",()=>{
  clickAncho();
  document.querySelector("#ancho").addEventListener("mousemove",clickAncho);
});
document.querySelector("#ancho").addEventListener("mouseup",()=>{
  document.querySelector("#ancho").removeEventListener("mousemove",clickAncho);
});

if(!esTactil){
    document.querySelector("#efectos").addEventListener("mousedown",()=>{
    clickFX();
    document.querySelector("#efectos").addEventListener("mousemove",clickFX);
  })
  document.querySelector("#efectos").addEventListener("mouseup",()=>{
    document.querySelector("#efectos").removeEventListener("mousemove",clickFX);
    indiceFX=-1;triggerFX=false;
  })
}else{
  document.querySelector("#efectos").addEventListener("touchstart",()=>{
    clickFX();
    document.querySelector("#efectos").addEventListener("touchmove",clickFX);
  })
  document.querySelector("#efectos").addEventListener("touchend",()=>{
    document.querySelector("#efectos").removeEventListener("touchmove",clickFX);
    indiceFX=-1;triggerFX=false;
  })
}


if(!esTactil){
  document.querySelector("#ecu").addEventListener("mousedown",()=>{
    indiceEcu=null;
    document.querySelector("#ecu").addEventListener("mousemove",clickEcu);
  })
  document.querySelector("#ecu").addEventListener("mouseup",()=>{
    document.querySelector("#ecu").removeEventListener("mousemove",clickEcu);
    indiceEcu=null;
  })
}else{
  document.querySelector("#ecu").addEventListener("touchstart",()=>{
    indiceEcu=null;
    document.querySelector("#ecu").addEventListener("touchmove",clickEcu);
  })
  document.querySelector("#ecu").addEventListener("touchend",()=>{
    document.querySelector("#ecu").removeEventListener("touchmove",clickEcu);
    indiceEcu=null;
  })
}

document.querySelector("#ecu").addEventListener("dblclick",()=>{
    let rect = canvasEcu.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    mouseX=mouseX/coefZoom;
    mouseY=mouseY/coefZoom;

    for(i=0;i<cantidadFiltros;i++)if(mouseX>=Xfiltros[i]-16&&mouseX<=Xfiltros[i]+16&&mouseY>=Yfiltros[i]-16&&mouseY<=Yfiltros[i]+16){
        boolFiltros[i]=!boolFiltros[i];
    }
    clickEcu();

});

document.querySelector("#ecu").addEventListener("wheel", (event) => {
    event.preventDefault();

    let rect = canvasEcu.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    mouseX/=coefZoom;
    mouseY/=coefZoom;

    for(i=1;i<3;i++)if(mouseX>=Xfiltros[i]-6&&mouseX<=Xfiltros[i]+6&&mouseY>=Yfiltros[i]-6&&mouseY<=Yfiltros[i]+6){

        if(Qfiltros[i]>1)Qfiltros[i]+=event.deltaY/200;
        else{Qfiltros[i]+=event.deltaY/3000;}

        if(Qfiltros[i]<0.1)Qfiltros[i]=0.1;
        if(Qfiltros[i]>20)Qfiltros[i]=20;

        filtros[i].Q.value=Qfiltros[i];
        
    }

    muestreoEcu();

},{passive:false});

document.querySelector("#botIzq").addEventListener("mousedown",()=>{
  indiceInst--;
  cambiarInst();
})
document.querySelector("#botDer").addEventListener("mousedown",()=>{
  indiceInst++;
  cambiarInst();
})

document.querySelector("#botInst").addEventListener("mousedown",cambiarInst)


// document.querySelector("#debug").addEventListener("mousedown",funcionDebug1);
// document.querySelector("#debug2").addEventListener("mousedown",reproducir2);
// document.querySelector("#debug2").addEventListener("mouseup",()=>{sources[0].stop();});

// document.querySelector("#slide1").addEventListener("input",sumardist);
// document.querySelector("#slide2").addEventListener("input",sumardist);