import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [ProvidersModule],
})
export class PaymentModule {}
