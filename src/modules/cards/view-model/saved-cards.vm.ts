import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CardDetails {
  @ApiProperty({ example: '0f0229e6-bb76-e78f-06c2-3876901ed67c' })
  @Expose()
  cardToken: string;

  @ApiProperty({ example: "veysel2's card1" })
  @Expose()
  cardAlias: string;

  @ApiProperty({ example: '49874900' })
  @Expose()
  binNumber: string;

  @ApiProperty({ example: '0002' })
  @Expose()
  lastFourDigits: string;

  @ApiProperty({ example: 'DEBIT_CARD' })
  @Expose()
  cardType: string;

  @ApiProperty({ example: 'VISA' })
  @Expose()
  cardAssociation: string;

  @ApiProperty({ example: 'QNB DC' })
  @Expose()
  cardFamily: string;

  @ApiProperty({ example: 111 })
  @Expose()
  cardBankCode: number;

  @ApiProperty({ example: 'QNB' })
  @Expose()
  cardBankName: string;

  @ApiProperty({ example: '12' })
  @Expose()
  expireMonth: string;

  @ApiProperty({ example: '2030' })
  @Expose()
  expireYear: string;
}

export class CardDetailsViewModel {
  @ApiProperty({ example: 'success' })
  @Expose()
  status: string;

  @ApiProperty({ example: 'tr' })
  @Expose()
  locale: string;

  @ApiProperty({ example: 1736780229211 })
  @Expose()
  systemTime: number;

  @ApiProperty({ example: '123456789' })
  @Expose()
  conversationId: string;

  @ApiProperty({ example: 'd4bf54bc-d9ae-3875-de1f-4ebfa3c2be30' })
  @Expose()
  cardUserKey: string;

  @ApiProperty({ type: [CardDetails] })
  @Expose()
  cardDetails: CardDetails[];

  constructor(partial: Partial<CardDetailsViewModel>) {
    Object.assign(this, partial);
  }
}
