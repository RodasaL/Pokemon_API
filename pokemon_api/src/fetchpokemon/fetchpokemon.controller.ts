import { Controller } from '@nestjs/common';
import {Get,Post,Delete,Put, Param, Body, Query, NotFoundException } from '@nestjs/common';
import { FetchpokemonService } from './fetchpokemon.service';

@Controller('fetchpokemon')
export class FetchpokemonController {
    constructor(private readonly fetchpokemonService: FetchpokemonService){}
   
    @Get(':name')
    async getPokemon(@Param('name') name: string) {
      return this.fetchpokemonService.getPokemon(name);
    }

   
}
