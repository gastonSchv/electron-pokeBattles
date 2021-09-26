const Prettifier = require('./Prettifier')

module.exports = [
	new Prettifier({
        id: 'isNotAFunction',
        stringToIdentify: 'is not a function',
        keyWordLeftBound:'unPokemon.',
        keyWordRightBound:'is not a function',
        messageBeforeKeyWord:'El método',
        messageAfterKeyWord:'no se ha encontrado',
        recommendations:[
        'Verifica, si el entrenamiento exige que tu pokemon tenga el método keyWord, que lo hayas declarado',
        'Verifica que el método keyWord exista o sea soportado',
        'Lee atentamente el mensaje de error para verificar que no haya habido ningún typo en la declaración del método keyWord'
        ]
    }),
	new Prettifier({
        id:'isNotDefined',
        stringToIdentify:'is not defined',
        keyWordLeftBound:'zzyyxx',
        keyWordRightBound:'is not defined',
        messageBeforeKeyWord:'Utilizaste la variable',
        messageAfterKeyWord:'pero no la definiste',
        recommendations:[
        'Verifica que la variable keyWord haya sido declarada en tu codigo',
        'Verifica que no hayas olvidado la referencia a la instancia al llamar a keyWord (this)'
        ]
    }),
        new Prettifier({
        id:'isNotEqualWithUndefined',
        stringToIdentify:'Resultado obtenido: undefined',
        keyWordLeftBound:'asdasdas',
        keyWordRightBound:'asdasdas',
        messageBeforeKeyWord:'',
        messageAfterKeyWord:'',
        recommendations:[
        'Verifica que no estés recibiendo una string en un sitio donde se espera un objeto',
        'Verifica lo que pide exactamente el entrenamiento y comparalo con lo que has implementado en tu pokemon',
        'Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada'
        ]
    }),
        new Prettifier({
        id:'isNotEqual',
        stringToIdentify:'Resultado esperado:',
        keyWordLeftBound:'asdasdas',
        keyWordRightBound:'asdasdas',
        messageBeforeKeyWord:'',
        messageAfterKeyWord:'',
        recommendations:[
        'Verifica lo que pide exactamente el entrenamiento y comparalo con lo que has implementado en tu pokemon',
        'Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada'
        ]
    })
]