const _ = require('lodash')
const prettifiers = require('./prettifiers/prettifiers')
const Type = require('./Error Types/Type')

class BasicError {
	constructor(error){
		this.originalError = error;
		this.prettifier = _.find(prettifiers, prettifier => prettifier.isSuitable(this.message()))
		this.type = new Type(error)
	}
	message(){
		return this.originalError.message.replace(/\"|\'|\`|\r?\n|\r/gi,'')
	}
	prettyMessage(){
		return this.prettifier?this.prettifier.prettify(this.message()):this.message()
	}
	generalRecommendations(){
		return `Error Original*${this.originalError}<>Localizacion del error*${this.errorLocalization()}`
	}
	recommendations(){
		if(this.prettifier){
			return `${this.prettifier.recommendationsString(this.message())}<>${this.generalRecommendations()}`		
		}
		return this.generalRecommendations()
	}
	errorPosition(){
		return this.type.errorPosition()
	}
	errorRoute(){
		return this.type.errorRoute()
	}
	errorLocalization(){
		const err = this.originalError
		const {linea,columna} = this.errorPosition();
		return `Revisa la linea ${linea} y columna ${columna} del archivo ${this.errorRoute()} , al parecer ahí está el problema`
	}
}

module.exports = BasicError	;