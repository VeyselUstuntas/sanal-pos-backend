import { ApiProperty } from '@nestjs/swagger';
import { AddressType } from '@prisma/client';
import { Expose } from 'class-transformer';

export class AddressViewModel {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({
    enum: ['billing', 'shipping'],
    enumName: 'AddressType',
  })
  @Expose()
  type: AddressType;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  contactName: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  country: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<AddressViewModel>) {
    Object.assign(this, partial);
  }
}
