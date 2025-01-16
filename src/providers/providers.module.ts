import { Module } from '@nestjs/common';
import { ProviderFactory } from './provider.factory';
import { IyzicoModule } from 'src/common/global-services/iyzico/iyzico.module';
import { TamiModule } from 'src/common/global-services/tami/tami.module';

@Module({
  providers: [ProviderFactory],
  exports: [ProviderFactory],
  imports: [IyzicoModule, TamiModule],
})
export class ProvidersModule {}
