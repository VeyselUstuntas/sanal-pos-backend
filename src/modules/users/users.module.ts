import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/common/global-services/database/database.module';
import { IyzicoModule } from 'src/common/global-services/iyzico/iyzico.module';
import { CardsModule } from '../cards/cards.module';
import { StripeModule } from 'src/common/global-services/stripe/stripe.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule, IyzicoModule, CardsModule, StripeModule],
})
export class UsersModule {}
