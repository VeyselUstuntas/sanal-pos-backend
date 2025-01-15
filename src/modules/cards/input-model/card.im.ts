import { ApiProperty } from '@nestjs/swagger';

export type Locale = 'TR' | 'EN';

export class CardInput {
  @ApiProperty()
  cardAlias: string;

  @ApiProperty()
  cardNumber: string;

  @ApiProperty()
  expireYear: string;

  @ApiProperty()
  expireMonth: string;

  @ApiProperty()
  cardHolderName: string;

  @ApiProperty()
  cardUserKey: string;

  @ApiProperty()
  cardTokenKey: string;

  @ApiProperty()
  cardBankName: string;

  constructor(card: Partial<CardInput>) {
    Object.assign(this, card);
  }
}

export class CardCreateInput {
  @ApiProperty()
  locale: Locale = 'TR';

  @ApiProperty()
  conversationId: string = '123456789';

  @ApiProperty()
  cardUserKey: string;

  @ApiProperty()
  card: CardInput;

  constructor(card: Partial<CardCreateInput>) {
    Object.assign(this, card);
  }
}

export class GetCardsInput {
  @ApiProperty()
  locale: Locale = 'TR';

  @ApiProperty()
  conversationId: string = '123456789';

  @ApiProperty()
  cardUserKey: string;

  constructor(card: Partial<GetCardsInput>) {
    Object.assign(this, card);
  }
}

//stripe
export class CardCreateStripeInput {
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  card: CardInput;

  @ApiProperty()
  cvc: string;
}

export class GetCardsStripeInput {
  @ApiProperty({ example: 'cus_RaIsW49OIwSdf7' })
  customer: string;

  @ApiProperty({ example: 'card' })
  type: string;
}
