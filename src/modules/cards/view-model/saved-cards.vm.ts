import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CardDetails {
  @ApiProperty({ example: '0f0229e6-bb76-e78f-06c2-3876901ed67c' })
  @Expose()
  cardToken: string;

  @ApiProperty({ example: "veysel2's card1" })
  @Expose()
  cardAlias: string;

  @ApiProperty({ example: '0002' })
  @Expose()
  lastFourDigits: string;

  @ApiProperty({ example: 'QNB' })
  @Expose()
  cardBankName: string;

  constructor(partial: Partial<CardDetails>) {
    Object.assign(this, partial);
  }
}

export class CardDetailsViewModel {
  [x: string]: any;
  @ApiProperty({ example: 'success' })
  @Expose()
  status: string;

  @ApiProperty({ example: 'd4bf54bc-d9ae-3875-de1f-4ebfa3c2be30' })
  @Expose()
  cardUserKey: string;

  @ApiProperty({ type: [CardDetails] })
  @Expose()
  cardDetails: CardDetails[];

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  constructor(partial: Partial<CardDetailsViewModel>) {
    Object.assign(this, partial);
  }
}
