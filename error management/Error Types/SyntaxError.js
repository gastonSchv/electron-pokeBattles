class SyntaxError {
	constructor(err){
		this.err = err;
	}
	errorPosition(){
		const err = this.err
		const linea = err.stack.split('.js:')[1].split('')[0]
		return {linea,columna:'?'}
	}
	errorRoute(){
		const err = this.err
		const ruta = err.stack.split('.js:')[0].split('\\').join('/')
		return ruta
	}
}

module.exports = SyntaxError