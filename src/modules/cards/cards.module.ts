import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { DatabaseModule } from '../../common/global-services/database/database.module';
import { IyzicoModule } from 'src/common/global-services/iyzico/iyzico.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [DatabaseModule, IyzicoModule, UsersModule],
})
export class CardsModule {}
