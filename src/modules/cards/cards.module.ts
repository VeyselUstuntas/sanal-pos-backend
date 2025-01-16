import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { DatabaseModule } from '../../common/global-services/database/database.module';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [DatabaseModule, ProvidersModule],
  exports: [CardsService],
})
export class CardsModule {}
