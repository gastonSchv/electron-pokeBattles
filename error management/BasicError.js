const _ = require('lodash')
const prettifiers = require('./prettifiers/prettifiers')


class BasicError {
	constructor(error){
		this.originalError = error;
		this.prettifier = _.find(prettifiers, prettifier => prettifier.isSuitable(this.message()))
	}
	message(){
		return this.originalError.message.replace(/\"|\'|\`/gi,'')
	}
	prettyMessage(){
		return this.prettifier?this.prettifier.prettify(this.message()):this.message()
	}
	recommendations(){
		if(this.prettifier){
			return this.prettifier.recommendationsString(this.message())		
		}
		return ''
	}
	errorPosition(){
		const err = this.originalError
		const [formato,linea,columna] = _.last(err.stack.split('at')[1].split('\\')).split('.')[1].replace(')','').trim().split(':')
		return `${linea}*${columna}`
	}
	errorRoute(){
		const err = this.originalError
		const ruta = _.dropRight(_.slice(err.stack.split('at')[1].split('\\'),1).join('/').split('.'),1).join('')
		return ruta
	}
	errorLocalization(){
		const err = this.originalError
		return `${this.errorPosition(err)}*${this.errorRoute(err)}`
	}
}

module.exports = BasicError	;