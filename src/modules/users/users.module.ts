import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/common/global-services/database/database.module';
import { ProvidersModule } from 'src/providers/providers.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule, ProvidersModule, forwardRef(() => CardsModule)],
  exports: [UsersService],
})
export class UsersModule {}
