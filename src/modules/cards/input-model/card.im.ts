import { ApiProperty } from '@nestjs/swagger';

export class CardInput {
  @ApiProperty()
  cardNo: string;

  @ApiProperty()
  bank: string;

  @ApiProperty()
  cardType: string;

  @ApiProperty()
  isValid: boolean;

  constructor(card: Partial<CardInput>) {
    Object.assign(this, card);
  }
}
