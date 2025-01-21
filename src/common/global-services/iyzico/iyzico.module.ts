import { Module } from '@nestjs/common';
import { IyzicoService } from './iyzico.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [IyzicoService],
  exports: [IyzicoService],
  imports: [DatabaseModule],
})
export class IyzicoModule {}
