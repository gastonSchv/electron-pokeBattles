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
        messageBeforeKeyWord:'Utilizaste una variable',
        messageAfterKeyWord:'pero no la definiste',
        recommendations:[
        'Verifica que la variable keyWord haya sido declarada en tu codigo',
        'Verifica que no hayas olvidado la referencia a la instancia al llamar a keyWord (this)'
        ]
    })
]