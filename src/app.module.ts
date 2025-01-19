import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';
import { DatabaseModule } from './common/global-services/database/database.module';
import { PaymentModule } from './modules/payment/payment.module';
import { GlobalServicesModule } from './common/global-services/global-services.module';
import { IyzicoModule } from './common/global-services/iyzico/iyzico.module';
import { UsersModule } from './modules/users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ProductsModule } from './modules/products/products.module';
import { ThreedspaymentModule } from './modules/threedspayment/threedspayment.module';

@Module({
  imports: [
    CardsModule,
    DatabaseModule,
    PaymentModule,
    GlobalServicesModule,
    IyzicoModule,
    UsersModule,
    ProvidersModule,
    AddressesModule,
    ProductsModule,
    ThreedspaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
