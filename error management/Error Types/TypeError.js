class TypeError {
	constructor(err){
		this.err = err;
		this.identifier = "TypeError"
	}
	errorPosition(){
		const err = this.err
		const [formato,linea,columna] = _.last(err.stack.split(' at ')[1].split('\\')).split('.')[1].replace(')','').trim().split(':')
		return {linea,columna}
	}
	errorRoute(){
		const err = this.err
		const ruta = _.dropRight(_.slice(err.stack.split(' at ')[1].split('\\'),1).join('/').split('.'),1).join('')
		return ruta
	}
}

module.exports = TypeError