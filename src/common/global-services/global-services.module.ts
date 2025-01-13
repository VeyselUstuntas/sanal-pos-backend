import { Module } from '@nestjs/common';
import { IyzicoModule } from './iyzico/iyzico.module';
import { StripeModule } from './stripe/stripe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [IyzicoModule, DatabaseModule, StripeModule],
  exports: [IyzicoModule, DatabaseModule],
})
export class GlobalServicesModule {}
