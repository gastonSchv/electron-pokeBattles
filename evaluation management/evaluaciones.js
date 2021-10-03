const evaluacionBuilder = require('./evaluacionBuilder')

module.exports = [
    evaluacionBuilder('atributosNecesarios'),
    evaluacionBuilder('atributosConValoresPermitidos'),
    evaluacionBuilder('puntoDeAtributosMaximoPermitido')
]