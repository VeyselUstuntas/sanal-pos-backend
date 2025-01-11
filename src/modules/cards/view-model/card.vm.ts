import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CardViewModel {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  cardNo: string;

  @Expose()
  @ApiProperty()
  bank: string;

  @Expose()
  @ApiProperty()
  cardType: string;

  @Expose()
  @ApiProperty()
  isValid: boolean;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  constructor(card: Partial<CardViewModel>) {
    Object.assign(this, card);
  }
}
