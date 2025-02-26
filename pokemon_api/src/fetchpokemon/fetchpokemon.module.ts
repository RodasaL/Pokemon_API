import { Module } from '@nestjs/common';
import { FetchpokemonController } from './fetchpokemon.controller';
import { FetchpokemonService } from './fetchpokemon.service';


@Module({
  controllers: [FetchpokemonController],
  providers: [FetchpokemonService]
})
export class FetchpokemonModule {}
