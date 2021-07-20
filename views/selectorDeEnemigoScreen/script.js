const {ipcRenderer} = require('electron')


function getButton(button){
	ipcRenderer.send('screens:battleScreen',{enemigoSeleccionado:button.id})	
}
function funcionesDeInicio(){

}
