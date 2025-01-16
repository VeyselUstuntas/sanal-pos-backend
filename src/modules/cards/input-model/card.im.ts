import { ApiProperty } from '@nestjs/swagger';

export class CardInput {
  @ApiProperty({ example: 'user new card' })
  cardAlias: string;

  @ApiProperty({ example: '5528790000000008' })
  cardNumber: string;

  @ApiProperty({ example: '2030' })
  expireYear: string;

  @ApiProperty({ example: '12' })
  expireMonth: string;

  @ApiProperty({ example: 'veysel' })
  cardHolderName: string;

  constructor(card: Partial<CardInput>) {
    Object.assign(this, card);
  }
}

export class CardGenerateInput {
  @ApiProperty({
    example: 'd801e6a2-8fe5-a5de-6ad5-a923ff225e4e',
    required: true,
    type: 'string',
  })
  cardUserKey: string;

  @ApiProperty({ required: true, type: 'string' })
  email: string;

  @ApiProperty({ examples: [CardInput], type: CardInput, required: true })
  card: CardInput;

  constructor(cardData: Partial<CardGenerateInput>) {
    Object.assign(this, cardData);
  }
}

export class CardSaveInput {
  @ApiProperty({ examples: [CardInput], type: CardInput, required: true })
  card: CardInput;

  @ApiProperty({
    example: 'd801e6a2-8fe5-a5de-6ad5-a923ff225e4e',
    required: true,
    type: 'string',
  })
  cardUserKey: string;

  @ApiProperty({ example: '2030' })
  cardTokenKey: string;

  @ApiProperty({ example: '2030' })
  cardBankName: string;

  constructor(partial: Partial<CardSaveInput>) {
    Object.assign(this, partial);
  }
}

export class GetCardsInput {
  @ApiProperty()
  cardUserKey: string;

  constructor(card: Partial<GetCardsInput>) {
    Object.assign(this, card);
  }
}
