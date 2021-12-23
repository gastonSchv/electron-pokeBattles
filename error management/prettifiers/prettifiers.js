const Prettifier = require('./Prettifier')
const config = require('../../battle elements/config')
const _ = require('lodash')

module.exports = [
    new Prettifier({
        id: 'isNotAFunction',
        stringToIdentify: 'is not a function',
        keyWordLeftBound: 'unPokemon.',
        keyWordRightBound: 'is not a function',
        messageBeforeKeyWord: 'El método',
        messageAfterKeyWord: 'no se ha encontrado',
        recommendations: [
            'Verifica, si se exige que tu pokemon tenga el método keyWord, que lo hayas declarado',
            'Verifica que el método keyWord exista o sea soportado',
            'Lee atentamente el mensaje de error para verificar que no haya habido ningún typo en la declaración del método keyWord'
        ]
    }),
    new Prettifier({
        id: 'isNotDefined',
        stringToIdentify: 'is not defined',
        keyWordLeftBound: 'zzyyxx',
        keyWordRightBound: 'is not defined',
        messageBeforeKeyWord: 'Utilizaste la variable',
        messageAfterKeyWord: 'pero no la definiste',
        recommendations: [
            'Verifica que la variable keyWord haya sido declarada en tu codigo',
            'Verifica que no hayas olvidado la referencia a la instancia al llamar a keyWord (this)'
        ]
    }),
    new Prettifier({
        id: 'methodWrongResult',
        stringToIdentify: 'El metodo',
        keyWordLeftBound: 'El metodo',
        keyWordRightBound: 'ha retornado un valor',
        messageBeforeKeyWord: 'El metodo',
        messageAfterKeyWord: ' ha retornado un valor inesperado',
        recommendations: [
            `Resultado esperado vs resultado obtenido`,
            `Verifica que es lo que se espera sea retornado por el metodo keyWord`,
            `Verifica que es lo que está retornando el metodo keyWord de tu pokemon`
        ]
    }),
    new Prettifier({
        id: 'isNotEqualWithUndefined',
        stringToIdentify: 'Resultado obtenido: undefined',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            'Verifica que no estés recibiendo una string en un sitio donde se espera un objeto',
            'Verifica lo que se pide exactamente y comparalo con lo que has implementado en tu pokemon',
            'Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada'
        ]
    }),
    new Prettifier({
        id: 'isNotEqual',
        stringToIdentify: 'Resultado esperado:',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            'Verifica lo que se pide exactamente y comparalo con lo que has implementado en tu pokemon',
            'Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada'
        ]
    }),
    new Prettifier({
        id: 'atributosNecesarios',
        stringToIdentify: 'Tu pokemon no cuenta con los atributos requeridos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Recuerda que los atributos requeridos son : ${config.listaAtributosEstado.join(', ')}`,
            'Asegurate de haber colocado valores válidos en los atributos faltantes',
            'Recuerda quelos atributos pokemon que tienen valores numéricos siempre tienen que se mayor a 0 (salvo dañoRecibido)'
        ]
    }),
    new Prettifier({
        id: 'atributosConValoresPermitidos',
        stringToIdentify: 'tipo de dato correcto en todos sus atributos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Recuerda que los tipos de datos para cada atributos son ${
                _.map(_.toPairs(config.tiposDeDatoPorAtributo), pair => pair.join('|')).join(', ')
            }`
        ]
    }),
    new Prettifier({
        id: 'puntoDeAtributosMaximoPermitido',
        stringToIdentify: 'Tu pokemon supera el límite de puntos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Recuerda que el máximo de puntos asignables son: ${config.puntajeMaximoPermitido()}`,
            'Verifica que la suma de los puntajes de tus atributos sea menor o igual al maximo permitido'
        ]
    }),
    new Prettifier({
        id: 'cannotFindModule',
        stringToIdentify: 'Cannot find module',
        keyWordLeftBound: 'Cannot find module',
        keyWordRightBound: 'Require',
        messageBeforeKeyWord: 'No se ha podido encontrar el modulo',
        messageAfterKeyWord: '',
        recommendations: [
            `Verifica que no haya ningun typo en tu codigo al solicitar una dependencia (require=...)`
        ]
    }),
    new Prettifier({
        id: 'dañoDeAtaquesDisponiblesIncorrectos',
        stringToIdentify: 'Tu pokemon no realiza el daño adecuado',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Verifica que el calculo de daño de tu pokemon siga la formula daño(tipoDeAtaque) = fuerza X multiplicadorDeAtaque(tipoDeAtaque) X factorDeEvolucion`,
            `Verifica que tus multiplicadoresDeAtaque sean adecuados para el tipo de pokemon que tengas (planta,fuego,agua o electricidad)`
        ]
    }),
    new Prettifier({
        id: 'energiaConsumidaPorAtaqueIncorrecto',
        stringToIdentify: 'Tu pokemon no consume correctamenta la energia',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Verifica que estes disminuyendo la energia de tu pokemon al atacar`,
            `Verifica que el consumo de energia de tu pokemon este siendo correcto para cada tipo de ataque`,
            `Verifica que el consumo de energia sea adecuados para el tipo de pokemon que tengas (planta,fuego,agua o electricidad)`
        ]
    }),
        new Prettifier({
        id: 'desmayarseCorrectamente',
        stringToIdentify: 'Tu pokemon no se desmaya correctamente',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Verifica que estes aumentando la energia adecuada segun tu tipo de pokemon (planta,fuego,agua o electricidad)`,
            `Verifica que no estes alterando ningun otro atributos de tu pokemon por fuera de su energia`,
            `Verifica que estes limitando el aumento de energia de tu pokemon al valor inicial de la energia asignada de tu pokemon`
        ]
    }),
        new Prettifier({
        id: 'recuperarEnergiaCorrectamente',
        stringToIdentify: 'Tu pokemon no recuperar energia',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [
            `Verifica que estes aumentando la energia adecuada segun tu tipo de pokemon (planta,fuego,agua o electricidad)`,
            `Verifica que no estes alterando ningun otro atributos de tu pokemon por fuera de su energia`,
            `Verifica que estes limitando el aumento de energia de tu pokemon al valor inicial de la energia asignada de tu pokemon`
        ]
    })
]