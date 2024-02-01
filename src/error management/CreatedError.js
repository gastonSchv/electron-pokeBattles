const BasicError = require('./BasicError')

class CreatedError extends BasicError {
    constructor(errorObj) {
        super(errorObj);
        this.isCreatedError = true;
    }
    prettyMessage() {
        return this.prettifier && !this.originalError.stopPrettify ? this.prettifier.prettify(this.message()) : this.message()
    }
    recommendations() {
        const recommendations = _.get(this.prettifier, "recommendations");
        if (recommendations) {
            return this.prettifier.stringifyRecommendations(recommendations)
        }
        return this.generalRecommendations()
    }
}

module.exports = CreatedError;