class Card {
  holderName: string;
  number: string;
  expireYear: number;
  expireMonth: number;
  cvv: string;
}

class Buyer {
  ipAddress: string;
  buyerId: string;
  name: string;
  surName: string;
  emailAddress: string;

  phoneNumber: string;
}

export class TamiPaymentRequest {
  buyer: Buyer;
  card: Card;
  currency: string;
  installmentCount: number;
  orderId: string;
  amount: number;
  paymentGroup: string;
  securityHash: string;

  constructor(partial: Partial<TamiPaymentRequest>) {
    Object.assign(this, partial);
  }
}
