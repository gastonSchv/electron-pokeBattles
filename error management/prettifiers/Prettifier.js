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
        return _.some(recommendations,recommendation => 'Resultado esperado vs resultado obtenido' == recommendation)
    }
    addResults(keyWordReplacedRecommendations,errorMessage){
        const results = `Resultado esperado${_.split(errorMessage,'Resultado esperado')[1]}`
        return _.filter(keyWordReplacedRecommendations,recommendation => !_.includes(recommendation,'Resultado esperado')).concat([results])
    }
    recommendationsString(errorMessage){
        const keyWordReplacedRecommendations = _.map(this.recommendations, recommendation => {
        	if(_.includes(recommendation,'keyWord')){
        		return recommendation.replace('keyWord',this.keyWord(errorMessage))
        	}
        	return recommendation
        })
        if(this.hasResultsComparison(keyWordReplacedRecommendations)){
            return this.addResults(keyWordReplacedRecommendations,errorMessage).join('*')
        }
        return keyWordReplacedRecommendations.join('*')
    }
}

module.exports = Prettifier