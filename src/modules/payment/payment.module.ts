import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ProvidersModule } from 'src/providers/providers.module';
import { DatabaseModule } from 'src/common/global-services/database/database.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [ProvidersModule, DatabaseModule],
})
export class PaymentModule {}
