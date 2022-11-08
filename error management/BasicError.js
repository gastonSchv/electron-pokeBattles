const _ = require('lodash')
const prettifiers = require('./prettifiers/prettifiers')
const Type = require('./Error Types/Type')

class BasicError {
    constructor(error) {
        this.originalError = error
        this.prettifier = _.find(prettifiers, prettifier => prettifier.isSuitable(this.message()))
        this.type = new Type(error)
    }
    message() {
        return this.originalError.message.replace(/\"|\'|\`|\r?\n|\r/gi, '')
    }
    prettyMessage() {
        return this.prettifier ? this.prettifier.prettify(this.message()) : this.message()
    }
    cleanedErrorStack() {
        return this.originalError.stack.split('\\').join('/').replace(/-|\"|\'|\`|\r?\n|\r/gi, '')
    }
    generalRecommendations() {
        const originalError = this.isCreatedError ? "" : `<>Error Original*${this.cleanedErrorStack()}` //ver para ocultar rutas propios en mensaje de error original
        return `${originalError}${this.type.errorLocalization()}`
    }
    recommendations() {
    	const recommendations = _.get(this.originalError,"recommendations")
        if (this.isCreated && recommendations) {
            return this.prettifier.stringifyRecommendations(recommendations)
        } else if (this.prettifier) {
            return `${this.prettifier.recommendationsString(this.message())}${this.generalRecommendations()}`
        }
        return this.generalRecommendations()
    }
}

module.exports = BasicError;