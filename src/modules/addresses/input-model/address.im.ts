import { ApiProperty } from '@nestjs/swagger';
import { AddressType } from '@prisma/client';

export class AddressInput {
  @ApiProperty({
    enum: ['billing', 'shipping'],
    enumName: 'AddressType',
  })
  type: AddressType;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;
}
