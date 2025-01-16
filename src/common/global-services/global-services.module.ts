import { Module } from '@nestjs/common';
import { IyzicoModule } from './iyzico/iyzico.module';
import { DatabaseModule } from './database/database.module';
import { TamiModule } from './tami/tami.module';

@Module({
  imports: [IyzicoModule, DatabaseModule, TamiModule],
  exports: [IyzicoModule, DatabaseModule],
})
export class GlobalServicesModule {}
