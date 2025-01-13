export class CreatePaymentInput {
  locale: Locale;
  conversationId: string;
  price: string;
  paidPrice: string;
  installments: number;
  paymentChannel: PaymentChannel;
  basketId: string;
  paymentGroup: PaymentGroup;
  paymentCard: PaymentCardInput;
  buyer: BuyerInput;
  shippingAddress: AddressInput;
  billingAddress: AddressInput;
  basketItems: BasketItemInput[];
  currency: Currency;
}

export class BuyerInput {
  id: string;
  name: string;
  surname: string;
  identityNumber: string;
  email: string;
  gsmNumber: string;
  registrationDate: string;
  lastLoginDate: string;
  registrationAddress: string;
  city: string;
  country: string;
  zipCode: string;
  ip: string;
}

export class AddressInput {
  address: string;
  zipCode: string;
  contactName: string;
  city: string;
  country: string;
}

export class BasketItemInput {
  id: string;
  name: string;
  category1: string;
  category2?: string;
  itemType: BasketItemType;
  price: number | string;
  subMerchantPrice?: number | string;
  subMerchantKey?: string;
}

export class PaymentCardInput {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc?: string;
  registerCard?: number;
  registerConsumerCard?: boolean;
  cardAlias: string;
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
