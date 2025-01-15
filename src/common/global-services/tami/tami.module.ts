import { Module } from '@nestjs/common';
import { TamiService } from './tami.service';

@Module({
  providers: [TamiService],
  exports: [TamiService],
})
export class TamiModule {}
