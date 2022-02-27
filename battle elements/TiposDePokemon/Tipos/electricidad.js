const TipoConEspecialEnergetico = require('../TipoConEspecialEnergetico')
const _ = require('lodash')

module.exports = new TipoConEspecialEnergetico({
  nombre:'electricidad',
  multiplicadoresDeAtributo: {vida:90,energia:3.5,fuerza:3,defensa:2,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})