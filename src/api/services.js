import axios from 'axios';
import { RequestServices } from './request';
import { 
    ACTION_SERVICE_GET_ALL_POKEMON, 
    PATH_API_GET_ALL_POKEMON 
} from '../constants/constants';


export const ServicesAPI = {

    getAllPokemonsService: async function (params) {
        let request = { ...RequestServices.allPokemon };
        request.limit = params.limit;
        
        let options = this.getOptionsService(PATH_API_GET_ALL_POKEMON, request);
        return options;
    },

    getOptionsService: async function (path, request) {
        const host = process.env.POKEMON_APP_SERVER_URL || 'https://pokeapiserver.herokuapp.com';

        return {
            url: `${host}${path}`,
            method: "POST",
            data: request
        }
    },

    changeServices: function (params) {
        switch (params.action) {
            case ACTION_SERVICE_GET_ALL_POKEMON:
                return this.getAllPokemonsService(params);
            default:
                break;
        };
    },

    callService: async function (params) {
        let options = await this.changeServices(params);
        return await axios(options);
    }
};