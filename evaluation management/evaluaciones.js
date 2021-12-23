const evaluacionBuilder = require('./evaluacionBuilder')

module.exports = [
    evaluacionBuilder('atributosNecesarios'),
    evaluacionBuilder('atributosConValoresPermitidos'),
    evaluacionBuilder('puntoDeAtributosMaximoPermitido'),
    evaluacionBuilder('metodosNecesarios'),
    evaluacionBuilder('retornoVitalidadCorrecto'),
    evaluacionBuilder('retornoMiTipoValido'),
    evaluacionBuilder('dañoDeAtaquesDisponiblesCorrecto'),
    evaluacionBuilder('energiaConsumidaPorAtaqueCorrecto'),
 	evaluacionBuilder('desmayarseCorrectamente'),
 	evaluacionBuilder('recuperarEnergiaCorrectamente')
]