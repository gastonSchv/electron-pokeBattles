class MissingModuleError {
	constructor(err){
		this.err = err;
		this.identifier = "Cannot find module"
	}
	errorRoute(){
		const err = this.err
		const ruta = err.stack.split('Require stack:')[1].split('.js')[0].split('\\').join('/').replace(/-|\"|\'|\`|\r?\n|\r/gi,'')
		console.log(ruta)
		return ruta
	}
}

module.exports = MissingModuleError