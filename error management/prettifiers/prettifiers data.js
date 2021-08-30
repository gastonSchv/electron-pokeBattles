function 

module.exports = [{
        id: 'isNotAFunction',
        stringToIdentify: 'is not a function',
        keyWordLeftBound:'pokemon.',
        keyWordRightBound:'is not a function',
        messageBeforeKeyWord:'El método',
        messageAfterKeyWord:'no se ha encontrado',
        recommendations:[
        'Verifica, si el entremiento exige que tu pokemon tenga un método, que lo hayas declarado',
        'Verifica que no hayas declarado un método no soportado en tu pokemon',
        'Lee atentamente el mensaje de error para verificar que no haya habido ningún typo en la declaración de tus métodos'
        ]
    },
    {
        id: 'isNotDefined',
        stringToIdentify: 'is not defined',
        prettify: string => `Utilizaste una variable ${getStringChunck(string,'zzz','is not defined')} pero no la definiste`,
        recommendations:[
        'Verifica'
        ]
    }
]