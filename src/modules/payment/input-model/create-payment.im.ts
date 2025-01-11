export class CreatePaymentInput {
  locale: string;
  conversationId: string;
  price: string;
  paidPrice: string;
  installment: number;
  paymentChannel: string;
  basketId: string;
  paymentGroup: string;
  paymentCard: PaymentCardInput;
  buyer: BuyerInput;
  shippingAddress: AddressInput;
  billingAddress: AddressInput;
  basketItems: BasketItemInput[];
  currency: string;
}

export class PaymentCardInput {
  cardHolderName: string;
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  cvc: string;
  registerCard: number;
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
  price: string;
  name: string;
  category1: string;
  category2: string;
  itemType: string;
}
