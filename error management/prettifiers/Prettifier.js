const _ = require('lodash')

class Prettifier {
    constructor({id,stringToIdentify,messageBeforeKeyWord,messageAfterKeyWord,keyWordLeftBound,keyWordRightBound,recommendations}) {
    	this.id = id;
        this.stringToIdentify = stringToIdentify;
        this.messageBeforeKeyWord = messageBeforeKeyWord;
        this.messageAfterKeyWord = messageAfterKeyWord;
        this.keyWordLeftBound = keyWordLeftBound; 
        this.keyWordRightBound = keyWordRightBound; 
        this.recommendations = recommendations; 
    }
    keyWord(errorMessage){
        return _.last(errorMessage.split(this.keyWordLeftBound)).split(this.keyWordRightBound)[0]
    }
    prettify(errorMessage){
    	return `${this.messageBeforeKeyWord} ${this.keyWord(errorMessage)} ${this.messageAfterKeyWord}`
    }
    isSuitable(errorMessage) {
        return _.includes(errorMessage, this.stringToIdentify)
    }
    hasResultsComparison(recommendations){
        return _.some(recommendations,({descripcion}) => 'Resultado esperado vs resultado obtenido' == descripcion)
    }
    addResults(keyWordReplacedRecommendations,errorMessage){
        const results = `Resultado esperado${_.split(errorMessage,'Resultado esperado')[1]}`
        return _(keyWordReplacedRecommendations)
        .filter(({descripcion}) => !_.includes(descripcion,'Resultado esperado'))
        .map(({titulo,descripcion}) => {
            return {
                titulo,
                descripcion: descripcion + results
            }
        })
        .value()
    }
    stringifyRecommendations(recommendations){
        return _.flatMap(recommendations, ({titulo,descripcion}) => `${titulo}*${descripcion}`).join('<>')
    }
    recommendationsString(errorMessage){
        const keyWordReplacedRecommendations = _.map(this.recommendations, recommendation => {
        	if(_.includes(recommendation.descripcion,'keyWord')){
                recommendation.descripcion = recommendation.descripcion.replace('keyWord',this.keyWord(errorMessage))
        		return recommendation
        	}
        	return recommendation
        })
        if(this.hasResultsComparison(keyWordReplacedRecommendations)){
            return this.stringifyRecommendations(this.addResults(keyWordReplacedRecommendations,errorMessage)) 
        }
        return this.stringifyRecommendations(keyWordReplacedRecommendations)
    }
}

module.exports = Prettifier