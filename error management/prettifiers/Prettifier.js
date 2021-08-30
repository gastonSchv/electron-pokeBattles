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
    keyWord(string){
        return _.last(string.split(this.keyWordLeftBound)).split(this.keyWordRightBound)[0]
    }
    prettify(string){
    	return `${this.messageBeforeKeyWord} ${this.keyWord(string)} ${this.messageAfterKeyWord}`
    }
    isSuitable(string) {
        return _.includes(string, this.stringToIdentify)
    }
    recommendationsString(string){
        return _.map(this.recommendations, recommendation => {
        	if(_.includes(recommendation,'keyWord')){
        		return recommendation.replace('keyWord',this.keyWord(string))
        	}
        	return recommendation
        }).join('*')
    }
}

module.exports = Prettifier