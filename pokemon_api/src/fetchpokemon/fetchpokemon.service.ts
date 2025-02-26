import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
require('dotenv').config();
const vision = require('@google-cloud/vision');

@Injectable()
export class FetchpokemonService {
    Func2(){
        console.log('Func2')
        return { message: 'Func2 executada com sucesso!' };
    }


    async getPokemon(name: string) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error(`Erro ao procurar Pokémon: ${response.statusText}`);
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
          color1:this.rgbToHex(colors[0].color),
          color2:this.rgbToHex(colors[1].color),
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
  
}

