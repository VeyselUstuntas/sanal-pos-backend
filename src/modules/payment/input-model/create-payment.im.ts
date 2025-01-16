import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class BuyerInput {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  identityNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  gsmNumber: string;
  @ApiProperty()
  registrationDate: string;
  @ApiProperty()
  lastLoginDate: string;
  @ApiProperty()
  registrationAddress: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  ip: string;
}

export class AddressInput {
  @ApiProperty()
  address: string;
  @ApiProperty()
  zipCode: string;
  @ApiProperty()
  contactName: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
}

export class BasketItemInput {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  category1: string;
  @ApiProperty()
  category2?: string;
  @ApiProperty()
  itemType: BasketItemType;
  @ApiProperty()
  price: number | string;
  @ApiProperty()
  subMerchantPrice?: number | string;
  @ApiProperty()
  subMerchantKey?: string;
}

export class PaymentCardInput {
  @ApiProperty()
  cardHolderName: string;
  @ApiProperty()
  cardNumber: string;
  @ApiProperty()
  expireMonth: string;
  @ApiProperty()
  expireYear: string;
  @ApiProperty()
  cvc?: string;
  @ApiProperty()
  registerCard?: number;
  @ApiProperty()
  registerConsumerCard?: boolean;
  @ApiProperty()
  cardAlias: string;
}

export class CreatePaymentInput {
  @ApiProperty()
  locale: Locale;
  @ApiProperty()
  conversationId: string;
  @ApiProperty()
  price: string;
  @ApiProperty()
  paidPrice: string;
  @ApiProperty()
  installments: number;
  @ApiProperty()
  paymentChannel: PaymentChannel;
  @ApiProperty()
  basketId: string;
  @ApiProperty()
  paymentGroup: PaymentGroup;
  @ApiProperty()
  paymentCard: PaymentCardInput;
  @ApiProperty()
  buyer: BuyerInput;
  @ApiProperty()
  shippingAddress: AddressInput;
  @ApiProperty()
  billingAddress: AddressInput;
  @ApiProperty()
  basketItems: BasketItemInput[];
  @ApiProperty()
  currency: Currency;
  @ApiProperty()
  callbackUrl: string;

  constructor(partial: Partial<CreatePaymentInput>) {
    Object.assign(this, partial);
  }
}

export class Verify3DSInput {
  @ApiProperty()
  paymentId: string;
}

export type Locale = 'TR' | 'EN';

export type Currency =
  | 'TRY'
  | 'EUR'
  | 'USD'
  | 'IRR'
  | 'GBP'
  | 'NOK'
  | 'RUB'
  | 'CHF';

export type PaymentChannel =
  | 'MOBILE'
  | 'WEB'
  | 'MOBILE_WEB'
  | 'MOBILE_IOS'
  | 'MOBILE_ANDROID'
  | 'MOBILE_WINDOWS'
  | 'MOBILE_TABLET'
  | 'MOBILE_PHONE';

export type PaymentGroup = 'PRODUCT' | 'LISTING' | 'SUBSCRIPTION';

export type BasketItemType = 'PHYSICAL' | 'VIRTUAL';

// stripe

export class Buyer {
  @ApiProperty({ example: 'BUYER123', type: 'string' })
  id: string;

  @ApiProperty({ example: 'veysel', type: 'string' })
  name: string;
}
export class CreatePaymentStripeInput {
  @ApiProperty({ description: 'Ödemenin fiyatı', example: 100, type: 'number' })
  price: number;

  @ApiProperty({
    description: 'Ödemenin yapılacağı para birimi',
    example: 'TRY',
    type: 'string',
  })
  currency: string;

  @ApiProperty({
    description: 'Sepet ID',
    example: 'BASKET12345',
    type: 'string',
  })
  basketId: string;

  @ApiProperty({ description: 'Alıcı bilgileri' })
  buyer: Buyer;
}

// tami

class CardInputTami {
  @ApiProperty({ description: 'Cardholders name', example: 'veysel' })
  holderName: string;

  @ApiProperty({ description: 'Card CVV code', example: '916' })
  cvv: string;

  @ApiProperty({ description: 'Card expiration month', example: 1 })
  expireMonth: number;

  @ApiProperty({ description: 'Card expiration year', example: 2027 })
  expireYear: number;

  @ApiProperty({ description: 'Card number', example: '5549603469426017' })
  number: string;

  constructor(partial: Partial<CardInputTami>) {
    Object.assign(this, partial);
  }
}

class BuyerInputTami {
  @ApiProperty({ description: 'Buyer IP address', example: '127.0.0.1' })
  ipAddress: string;

  @ApiProperty({ description: 'Buyer ID', example: '1234' })
  buyerId: string;

  @ApiProperty({ description: 'Buyer name', example: 'Oğuzhan' })
  name: string;

  @ApiProperty({ description: 'Buyer surname', example: 'Okur' })
  surName: string;

  @ApiProperty({
    description: 'Buyer email address',
    example: 'destek@garantibbva.com.tr',
  })
  emailAddress: string;

  @ApiProperty({ description: 'Buyer phone number', example: '07325555555' })
  phoneNumber: string;

  constructor(partial: Partial<BuyerInputTami>) {
    Object.assign(this, partial);
  }
}

export class PaymentInputTami {
  @ApiProperty({ description: 'Payment amount', example: 15 })
  amount: number;

  @ApiHideProperty()
  orderId?: string;

  @ApiProperty({ description: 'Currency', type: 'string', example: 'TRY' })
  currency: string;

  @ApiProperty({ description: 'Installment Count', type: 'number', example: 1 })
  installmentCount: number;

  @ApiProperty({ description: 'Card details', type: CardInputTami })
  card: CardInputTami;

  @ApiProperty({ description: 'Buyer details', type: BuyerInputTami })
  buyer: BuyerInputTami;

  @ApiProperty({ description: 'Payment group', example: 'PRODUCT' })
  paymentGroup: string;

  @ApiHideProperty()
  securityHash?: string;

  constructor(partial: Partial<PaymentInputTami>) {
    Object.assign(this, partial);
  }
}
