const SyntaxError = require('./SyntaxError');
const ReferenceError = require('./ReferenceError');
const TypeError = require('./TypeError');
const MissingModule = require('./MissingModuleError')
const _ = require('lodash');
const path = require('path');

class Type {
	constructor(err){
		this.err = err;
		this.referenceError = new ReferenceError(err);
		this.syntaxError = new SyntaxError(err);
		this.typeError = new TypeError(err);
		this.missingModule = new MissingModule(err)
	}
	availableTypes(){
		return {
			SyntaxError:this.syntaxError,
			ReferenceError:this.referenceError,
			TypeError:this.typeError,
			MissingModule: this.missingModule
		}
	}
	errorTypeName(){
		return _.find(_.keys(this.availableTypes()),key => {
			return _.includes(this.err.stack,_.get(this.availableTypes(),key).identifier)
		})
	}
	errorType(){
		return _.get(this.availableTypes(),this.errorTypeName())
	}
	errorPosition(){
		try {
			return this.errorType().errorPosition()
		}catch(err){
			return {linea:"",columna:""}
		}
	}
	errorRoute(){
		try {
			return this.errorType().errorRoute()
		}catch(err){
			return ""
		}
	}
	isErrorInAppFiles(){
		return _.some(util.obtenerNombresDeArchivos(path.join(__dirname,'..','..')),fileName => _.includes(this.errorRoute(),fileName))
	}
	errorLocalization(){
		try {
			const {linea,columna} = this.errorPosition();
			const columnMessage = columna? ` columna ${columna}`:"";
			const lineMessage =  linea? ` linea ${linea}`:"";
			const fileMessage = this.errorRoute()? `en el archivo ${this.errorRoute()}`:"";
			if(columnMessage||lineMessage||fileMessage){
				const localizationString = `<>Localizacion del error*Revisa ${lineMessage} ${columnMessage}  ${fileMessage} , al parecer ahí está el problema`
				return this.isErrorInAppFiles()? "":localizationString
			}
			return ""
		}catch(err){
			return ""
		}
	}
}

module.exports = Type