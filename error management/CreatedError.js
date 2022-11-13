const BasicError = require('./BasicError')

class CreatedError extends BasicError {
	constructor(errorObj){
		super(errorObj);
		this.isCreatedError = true;
	}
}

module.exports = CreatedError;