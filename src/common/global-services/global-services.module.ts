import { Module } from '@nestjs/common';
import { IyzicoModule } from './iyzico/iyzico.module';
import { StripeModule } from './stripe/stripe.module';
import { DatabaseModule } from './database/database.module';
import { TamiModule } from './tami/tami.module';

@Module({
  imports: [IyzicoModule, DatabaseModule, StripeModule, TamiModule],
  exports: [IyzicoModule, DatabaseModule],
})
export class GlobalServicesModule {}
