const Promise = require('bluebird');
const request = require('request-promise');
const _ = require('lodash');

class PokemonApi {
    constructor() {

    }
    request(options) {
        const { url, method = "GET", qs = {}, body = {} } = options;
        const newOptions = {
            url: `https://pokeapi.co/api/v2/${url}`,
            method,
            json: true
        };
        !_.isEmpty(qs) ? _.assign(newOptions, { qs }) : "";
        !_.isEmpty(body) ? _.assign(newOptions, { body }) : "";
        return request(newOptions)
    }
    getPokemon(pokemonName) {
        const options = {
        	url:`pokemon/${pokemonName}`
        }
        return this.request(options)
    }
    getPokemonList(pokemonNamesList){
    	return Promise.map(pokemonNamesList,pokemon => this.getPokemon(pokemon),{concurrency:15})
    }
}

module.exports = new PokemonApi;