import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { DatabaseModule } from '../../common/global-services/database/database.module';
import { IyzicoModule } from 'src/common/global-services/iyzico/iyzico.module';
import { StripeModule } from 'src/common/global-services/stripe/stripe.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [DatabaseModule, IyzicoModule, StripeModule],
  exports: [CardsService],
})
export class CardsModule {}
