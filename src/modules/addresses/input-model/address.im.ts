import { ApiProperty } from '@nestjs/swagger';

export class AddressInput {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactName: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;
}
