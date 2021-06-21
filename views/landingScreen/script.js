const {ipcRenderer} = require('electron')

	
let musicaDeBatallaPrendida = true;

function funcionesDeInicio(){
	let musicaDeBatalla =  document.getElementById("musicaDeBatalla");
    musicaDeBatalla.volume = 0.9		
    musicaDeBatalla.loop = true
    prenderMusicaBatalla()
}
function prenderMusicaBatalla(){
	//musicaDeBatalla.play()
}

function cambiarEstadoMusicaDeBatalla(){
  if(musicaDeBatallaPrendida){
     musicaDeBatallaPrendida = false;
     musicaDeBatalla.pause()
     musicaDeBatallaImg.src  = "../../../assets/images/audio off.png" 
  }else{
    musicaDeBatalla.play()
    musicaDeBatallaPrendida = true;
    musicaDeBatallaImg.src  = "../../../assets/images/audio on.png"
  }
}

function abrirPantallaDeBatalla(){
  cambiarEstadoMusicaDeBatalla()
  ipcRenderer.send('screens:battleScreen',{

  })
}
function abrirModalConfiguracion(){
  ipcRenderer.send('screens:configurationScreen',{
    
  })
}