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
}

module.exports = BasicError	;