import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FetchpokemonModule } from './fetchpokemon/fetchpokemon.module';

@Module({
  imports: [FetchpokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
