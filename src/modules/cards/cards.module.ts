import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [DatabaseModule],
})
export class CardsModule {}
