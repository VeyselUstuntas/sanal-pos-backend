import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';
import { DatabaseModule } from './modules/database/database.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [CardsModule, DatabaseModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
