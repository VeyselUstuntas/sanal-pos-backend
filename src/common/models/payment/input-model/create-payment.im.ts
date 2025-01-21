import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

class Card {
  @ApiProperty({
    example: 'John Doe',
    description: 'Cardholder name',
    required: true,
  })
  holderName?: string;

  @ApiProperty({
    example: '4111111111111111',
    description: 'Card number',
    required: true,
  })
  number?: string;

  @ApiProperty({
    example: 12,
    description: 'Card expiry month',
    required: true,
  })
  expireMonth?: number;

  @ApiProperty({
    example: 2025,
    description: 'Card expiry year',
    required: true,
  })
  expireYear?: number;

  @ApiProperty({ example: '123', description: 'Card CVV code', required: true })
  cvv?: string;

  @ApiProperty({
    example: '982a49a6-0815-6b7a-9a1e-cb390e919001',
    description: 'Card User Key',
    required: true,
  })
  cardUserKey?: string;

  @ApiProperty({
    example: 'c6bc405d-f2d9-ec2f-8e49-5e2cf49fea94',
    description: 'Card Token',
    required: true,
  })
  cardToken?: string;
}

class Buyer {
  @ApiProperty({
    example: '192.168.1.1',
    description: 'IP address of the buyer',
    required: true,
  })
  ipAddress: string;

  @ApiProperty({
    example: 'buyer123',
    description: 'Unique ID of the buyer',
    required: true,
  })
  buyerId: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the buyer',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the buyer',
    required: true,
  })
  surName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the buyer',
    required: true,
  })
  emailAddress: string;

  @ApiProperty({
    example: '5551234567',
    description: 'Phone number of the buyer',
    required: true,
  })
  phoneNumber: string;

  @ApiProperty({
    example: '12345678901',
    description: 'Identity number of the buyer',
    required: true,
  })
  identityNumber: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'Registration address of the buyer',
    required: true,
  })
  registrationAddress: string;

  @ApiProperty({
    example: 'New York',
    description: 'City of the buyer',
    required: true,
  })
  city: string;

  @ApiProperty({
    example: 'USA',
    description: 'Country of the buyer',
    required: true,
  })
  country: string;

  @ApiProperty({
    example: '10001',
    description: 'ZIP code of the buyer',
    required: true,
  })
  zipCode: string;
}

export type BasketItemType = 'PHYSICAL' | 'VIRTUAL';

class BasketItem {
  @ApiProperty({
    example: 'item123',
    description: 'Unique ID of the basket item',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the basket item',
    required: true,
  })
  price: number;

  @ApiProperty({
    example: 'T-shirt',
    description: 'Name of the basket item',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Clothing',
    description: 'Category of the basket item',
    required: true,
  })
  category1: string;

  @ApiProperty({
    example: 'physical',
    description: 'Type of the basket item',
    required: true,
  })
  itemType: BasketItemType;
}

// class ShippingAddress {
//   @ApiProperty({
//     example: '123 Shipping Street',
//     description: 'Shipping address',
//     required: true,
//   })
//   address: string;

//   @ApiProperty({
//     example: 'John Doe',
//     description: 'Contact name for the shipping address',
//     required: true,
//   })
//   contactName: string;

//   @ApiProperty({
//     example: 'New York',
//     description: 'City for the shipping address',
//     required: true,
//   })
//   city: string;

//   @ApiProperty({
//     example: 'USA',
//     description: 'Country for the shipping address',
//     required: true,
//   })
//   country: string;
// }

// class BillingAddress {
//   @ApiProperty({
//     example: '123 Billing Street',
//     description: 'Billing address',
//     required: true,
//   })
//   address: string;

//   @ApiProperty({
//     example: 'John Doe',
//     description: 'Contact name for the billing address',
//     required: true,
//   })
//   contactName: string;

//   @ApiProperty({
//     example: 'New York',
//     description: 'City for the billing address',
//     required: true,
//   })
//   city: string;

//   @ApiProperty({
//     example: 'USA',
//     description: 'Country for the billing address',
//     required: true,
//   })
//   country: string;
// }

export type Currency =
  | 'TRY'
  | 'EUR'
  | 'USD'
  | 'IRR'
  | 'GBP'
  | 'NOK'
  | 'RUB'
  | 'CHF';

export class UnifiedPaymentRequest {
  @ApiHideProperty()
  orderId: string;

  @ApiProperty({
    example: '20.0',
    description: 'Total price of the order',
    required: true,
  })
  price: string;

  @ApiProperty({
    example: '20.0',
    description: 'Paid price of the order',
    required: true,
  })
  paidPrice: string;

  @ApiProperty({ example: 20.0, description: 'amount', required: true })
  amount: number;

  @ApiProperty({
    example: 1,
    description: 'Installment count for the payment',
    required: true,
  })
  installmentCount: number;

  @ApiProperty({
    example: 'USD',
    description: 'Currency of the payment',
    required: true,
  })
  currency: Currency;

  @ApiProperty({
    example: 'hash123',
    description: 'Security hash for the payment',
    required: true,
  })
  securityHash?: string;

  @ApiProperty({
    type: Card,
    description: 'Card details for the payment',
    required: true,
  })
  card: Card;

  @ApiProperty({ type: Buyer, description: 'Buyer details', required: true })
  buyer: Buyer;

  @ApiProperty({
    type: [BasketItem],
    description: 'List of basket items',
    required: true,
  })
  basketItems: BasketItem[];

  // @ApiProperty({
  //   type: ShippingAddress,
  //   description: 'Shipping address details',
  //   required: true,
  // })
  // shippingAddress: ShippingAddress;

  // @ApiProperty({
  //   type: BillingAddress,
  //   description: 'Billing address details',
  //   required: true,
  // })
  // billingAddress: BillingAddress;

  @ApiProperty()
  billingAddressId: number;

  @ApiProperty()
  shippingAddressId: number;

  @ApiProperty({ example: 'PRODUCT', description: 'Tami payment group' })
  paymentGroup: string;

  @ApiProperty({ example: 'https://www.merchant.com/callback' })
  callbackUrl: string;

  constructor(partial: Partial<UnifiedPaymentRequest>) {
    Object.assign(this, partial);
  }
}

export class Verify3DSInput {
  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  shippingAddressId: number;

  @ApiProperty()
  billingAddressId: number;
}

export class Verify3DSStoredCardInput {
  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  cardUserKey?: string;

  @ApiProperty()
  cardToken?: string;

  @ApiProperty()
  shippingAddressId: number;

  @ApiProperty()
  billingAddressId: number;
}
