import { Module } from '@nestjs/common';
import { ThreedspaymentController } from './threedspayment.controller';
import { ThreedspaymentService } from './threedspayment.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { DatabaseModule } from 'src/common/global-services/database/database.module';

@Module({
  controllers: [ThreedspaymentController],
  providers: [ThreedspaymentService],
  imports: [ProvidersModule, DatabaseModule],
})
export class ThreedspaymentModule {}
