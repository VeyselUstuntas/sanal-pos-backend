import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { DatabaseModule } from 'src/common/global-services/database/database.module';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
  imports: [DatabaseModule],
})
export class AddressesModule {}
