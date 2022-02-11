const SyntaxError = require('./SyntaxError')
const ReferenceError = require('./ReferenceError')
const _ = require('lodash')

class Type {
	constructor(err){
		this.err = err;
		this.referenceError = new ReferenceError(err);
		this.syntaxError = new SyntaxError(err);
	}
	availableTypes(){
		return {
			SyntaxError:this.syntaxError,
			ReferenceError:this.referenceError
		}
	}
	errorTypeName(){
		return _.find(_.keys(this.availableTypes()),key => _.includes(this.err.stack,key))
	}
	errorType(){
		return _.get(this.availableTypes(),this.errorTypeName())
	}
	errorPosition(){
		return this.errorType().errorPosition()
	}
	errorRoute(){
		return this.errorType().errorRoute()
	}
}

module.exports = Type