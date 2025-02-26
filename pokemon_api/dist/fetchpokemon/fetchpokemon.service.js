"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchpokemonService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
require('dotenv').config();
const vision = require('@google-cloud/vision');
let FetchpokemonService = class FetchpokemonService {
    Func2() {
        console.log('Func2');
        return { message: 'Func2 executada com sucesso!' };
    }
    async getPokemon(name) {
        const response = await (0, node_fetch_1.default)(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
        }
        const data = await response.json();
        let client = new vision.ImageAnnotatorClient();
        const [result] = await client.imageProperties(data.sprites.front_default);
        const colors = result.imagePropertiesAnnotation?.dominantColors?.colors;
        return {
            name: data.name,
            id: data.id,
            weight: data.weight,
            height: data.height,
            color1: this.rgbToHex(colors[0].color),
            color2: this.rgbToHex(colors[1].color),
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat
            },
            types: data.types.map(t => t.type.name),
            sprites: {
                front: data.sprites.front_default,
                back: data.sprites.back_default
            }
        };
    }
    rgbToHex({ red, green, blue }) {
        return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).toUpperCase()}`;
    }
};
exports.FetchpokemonService = FetchpokemonService;
exports.FetchpokemonService = FetchpokemonService = __decorate([
    (0, common_1.Injectable)()
], FetchpokemonService);
//# sourceMappingURL=fetchpokemon.service.js.map