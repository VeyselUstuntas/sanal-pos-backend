import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { IyzicoModule } from 'src/common/global-services/iyzico/iyzico.module';
import { StripeModule } from 'src/common/global-services/stripe/stripe.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [IyzicoModule, StripeModule],
})
export class PaymentModule {}
