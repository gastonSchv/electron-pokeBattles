const BasicError = require('./BasicError')

class CreatedError extends BasicError {
	constructor(obj){
		super(obj);
		this.isCreatedError = true;
	}
}

module.exports = CreatedError;