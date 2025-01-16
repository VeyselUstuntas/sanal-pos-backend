import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/common/global-services/database/database.module';
import { CardsModule } from '../cards/cards.module';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, CardsModule, ProvidersModule],
})
export class UsersModule {}
