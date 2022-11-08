const Prettifier = require('./Prettifier')
const config = require('../../battle elements/config')
const _ = require('lodash')


const prettifiers = [
    new Prettifier({
        id: 'isNotAFunction',
        stringToIdentify: 'is not a function',
        keyWordLeftBound: '.',
        keyWordRightBound: 'is not a function',
        messageBeforeKeyWord: 'El método',
        messageAfterKeyWord: 'no se ha encontrado',
        recommendations: [{
            titulo: "Declaracion de metodo",
            descripcion: "Verifica, si se exige que tu pokemon tenga el método keyWord, que lo hayas declarado"
        }, {
            titulo: "Typo",
            descripcion: "Lee atentamente el mensaje de error para verificar que no haya habido ningún typo en la declaración del método keyWord"
        }]
    }),
    new Prettifier({
        id: 'isNotDefined',
        stringToIdentify: 'is not defined',
        keyWordLeftBound: 'zzyyxx',
        keyWordRightBound: 'is not defined',
        messageBeforeKeyWord: 'Utilizaste la variable',
        messageAfterKeyWord: 'pero no la definiste',
        recommendations: [{
            titulo: "Declaracion de variable",
            descripcion: "Verifica que la variable keyWord haya sido declarada en tu codigo"
        }, {
            titulo: "Referencia a instancia",
            descripcion: "Verifica que no hayas olvidado la referencia a la instancia al llamar a keyWord (this)"
        }]
    }),
    new Prettifier({
        id: 'methodWrongResult',
        stringToIdentify: 'El metodo',
        keyWordLeftBound: 'El metodo',
        keyWordRightBound: 'ha retornado un valor',
        messageBeforeKeyWord: 'El metodo',
        messageAfterKeyWord: ' ha retornado un valor inesperado',
        recommendations: [{
            titulo: "Resultado inesperado",
            descripcion: "Resultado esperado vs resultado obtenido"
        }, {
            titulo: "Retorno esperado",
            descripcion: "Verifica que es lo que se espera sea retornado por el metodo keyWord"
        }]
    }),
    new Prettifier({
        id: 'isNotEqualWithUndefined',
        stringToIdentify: 'Resultado obtenido: undefined',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Tipo de dato esperado",
            descripcion: "Verifica que no estés recibiendo una string en un sitio donde se espera un objeto"
        }, {
            titulo: "Solicitado vs realizado",
            descripcion: "Verifica lo que se pide exactamente y comparalo con lo que has implementado en tu pokemon"
        }, {
            titulo: "Analiza resultado obtenido",
            descripcion: "Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada"
        }]
    }),
    new Prettifier({
        id: 'isNotEqual',
        stringToIdentify: 'El resultado obtenido no coincide con el resultado esperado',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Solicitado vs realizado",
            descripcion: "Verifica lo que se pide exactamente y comparalo con lo que has implementado en tu pokemon"
        }, {
            titulo: "Analiza resultado obtenido",
            descripcion: "Analiza los resultados para encontrar pistas sobre lo que pudo originar la diferencia hallada"
        }]
    }),
    new Prettifier({
        id: 'atributosNecesarios',
        stringToIdentify: 'Tu pokemon no cuenta con los atributos requeridos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Atributos requeridos",
            descripcion: `Recuerda que los atributos requeridos son : ${config.listaAtributosEstado.join(', ')}`
        }, {
            titulo: "Valores validos",
            descripcion: "Asegurate de haber colocado valores válidos en los atributos faltantes"
        }, {
            titulo: "Valores numericos > 0",
            descripcion: "Recuerda quelos atributos pokemon que tienen valores numéricos siempre tienen que se mayor a 0 (salvo deterioroRecibido)"
        }]
    }),
    new Prettifier({
        id: 'atributosConValoresPermitidos',
        stringToIdentify: 'tipo de dato correcto en todos sus atributos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Tipo de dato esperado",
            descripcion: `Recuerda que los tipos de datos para cada atributos son ${
                _.map(_.toPairs(config.tiposDeDatoPorAtributo), pair => pair.join('|')).join(', ')
            }`
        }]
    }),
    new Prettifier({
        id: 'puntoDeAtributosMaximoPermitido',
        stringToIdentify: 'Tu pokemon supera el límite de puntos',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdas',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Limite de puntos permitidos",
            descripcion: `Recuerda que el máximo de puntos asignables son: ${config.puntajeMaximoPermitido()}`
        }, {
            titulo: "Comparacion con maximo permitido",
            descripcion: "Verifica que la suma de los puntajes de tus atributos sea menor o igual al maximo permitido"
        }]
    }),
    new Prettifier({
        id: 'cannotFindModule',
        stringToIdentify: 'Cannot find module',
        keyWordLeftBound: 'Cannot find module',
        keyWordRightBound: 'Require',
        messageBeforeKeyWord: 'No se ha podido encontrar el modulo',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Typo",
            descripcion: "Verifica que no haya ningun typo en tu codigo al solicitar una dependencia (require=... o import ...)"
        }]
    }),
    new Prettifier({
        id: 'deterioroDeAtaquesDisponiblesIncorrectos',
        stringToIdentify: 'Tu pokemon no realiza el deterioro adecuado',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Al menos un ataque",
            descripcion: "Verifica que tu pokemon cuente con al menos un ataque disponible. Recuerda que hay 3 tipos de ataque: basico, fuerte y maximo"
        }, {
            titulo: "deterioro por ataque",
            descripcion: "Verifica que el calculo de deterioro de tu pokemon siga la formula deterioro(tipoDeAtaque) = fuerza X multiplicadorDeAtaque(tipoDeAtaque) X factorDeEvolucion"
        }, {
            titulo: "Multiplicadores por tipo de pokemon",
            descripcion: "Verifica que tus multiplicadoresDeAtaque sean adecuados para el tipo de pokemon que tengas (planta, fuego, agua, electricidad, etc)"
        }]
    }),
    new Prettifier({
        id: 'energiaConsumidaPorAtaqueIncorrecto',
        stringToIdentify: 'Tu pokemon no consume correctamenta la energia',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Al menos un ataque",
            descripcion: "Verifica que tu pokemon cuente con al menos un ataque disponible. Recuerda que hay 3 tipos de ataque: basico, fuerte y maximo"
        }, {
            titulo: "Disminución de energia",
            descripcion: "Verifica que estes disminuyendo la energia de tu pokemon al atacar"
        }, {
            titulo: "Disminución adecuada por ataque",
            descripcion: "Verifica que la disminucion de energia de tu pokemon este siendo correcto para cada tipo de ataque"
        }
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
        {
            titulo: "Solo modificar energia",
            descripcion: "Verifica que no estes alterando ningun otro atributos de tu pokemon por fuera de su energia"
        }, {
            titulo: "Aumento de energia limitado",
            descripcion: "Verifica que estes limitando el aumento de energia de tu pokemon al valor inicial de la energia asignada de tu pokemon"
        }]
    }),
    new Prettifier({
        id: 'recuperarEnergiaCorrectamente',
        stringToIdentify: 'Tu pokemon no recuperar energia',
        keyWordLeftBound: 'asdasdas',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: '',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Solo modificar energia",
            descripcion: "Verifica que no estes alterando ningun otro atributos de tu pokemon por fuera de su energia"
        }, {
            titulo: "Aumento de energia limitado",
            descripcion: "Verifica que estes limitando el aumento de energia de tu pokemon al valor inicial de la energia asignada de tu pokemon"
        }]
    }),
    new Prettifier({
        id: 'funcionSinNombre',
        stringToIdentify: 'Function statements require a function name',
        keyWordLeftBound: 'Function statements require a function name',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: 'Nombre de funcion no declarado',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Colocar nombre a las funciones",
            descripcion: "Verifica que todas las funciones declaradas en tu código tengan nombre"
        }, {
            titulo: "Verificar exportación",
            descripcion: "Verifica que estes exportando correctamente tu pokemon"
        }]
    }),
        new Prettifier({
        id: 'sinArchivoPokemon',
        stringToIdentify: 'The argument id must be a non-empty string. Received',
        keyWordLeftBound: 'The argument id must be a non-empty string. Received',
        keyWordRightBound: 'asdasdasd',
        messageBeforeKeyWord: 'No se ha seleccionado ningún archivo pokemon',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Para poder comenzar el juego es necesario seleccionar un archivo .js",
            descripcion: "Selecciona el archivo .js en donde esté tu pokemon"
        }]
    }),
          new Prettifier({
        id: 'noFuePosibleLeer',
        stringToIdentify: 'Cannot read property',
        keyWordLeftBound: 'Cannot read property',
        keyWordRightBound: 'of undefined',
        messageBeforeKeyWord: 'No fue posible leer la propiedad',
        messageAfterKeyWord: 'de undefined',
        recommendations: [{
            titulo: "Revisa la propiedad",
            descripcion: "Verifica en tu código en que lugar utilizas la propiedad que no ha podido ser leida y porque el valor a dado undefined"
        }]
    })
]

const errorDesconocido =  new Prettifier({
        id: 'errorDesconocido',//siempre último
        stringToIdentify: '',
        keyWordLeftBound: '',
        keyWordRightBound: '',
        messageBeforeKeyWord: 'Error desconocido',
        messageAfterKeyWord: '',
        recommendations: [{
            titulo: "Revisa tu pokemon",
            descripcion: "Se ha producido un error que no hemos podido identificar, revisa tu pokemon para hallar errores en el código"
        }]
    })

module.exports = prettifiers.concat(errorDesconocido)