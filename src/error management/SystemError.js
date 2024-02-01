const BasicError = require('./BasicError')

class SystemError extends BasicError {
	constructor(obj){
		super(obj)
		this.isCreatedError = false;
	}
}

module.exports = SystemError;