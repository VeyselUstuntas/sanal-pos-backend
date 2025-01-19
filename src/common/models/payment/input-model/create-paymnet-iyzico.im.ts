class PaymentCard {
  cardHolderName: string;
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  cvc: string;
}

class Buyer {
  ip: string;
  id: string;
  name: string;
  surname: string;
  email: string;

  identityNumber: string;
  registrationAddress: string;
  city: string;
  country: string;
  zipCode: string;
}

class ShippingAddress {
  address: string;
  contactName: string;
  city: string;
  country: string;
}

class BillingAddress {
  address: string;
  contactName: string;
  city: string;
  country: string;
}

class BasketItem {
  id: string;
  price: string;
  name: string;
  category1: string;
  itemType: string;
}

export class IyzicoPaymentRequest {
  buyer: Buyer;
  paymentCard: PaymentCard;
  currency: string;
  installment: number;
  price: string;
  paidPrice: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
}
