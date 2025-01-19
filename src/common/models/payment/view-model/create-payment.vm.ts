import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ItemTransactionViewModel {
  @ApiProperty()
  @Expose()
  itemId: string;

  @ApiProperty()
  @Expose()
  price: number | string;

  constructor(partial: Partial<ItemTransactionViewModel>) {
    Object.assign(this, partial);
  }
}

export class CreatePaymentViewModel {
  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  price: number | string;

  @ApiProperty()
  @Expose()
  paymentId: string;

  @ApiProperty()
  @Expose()
  binNumber: string;

  @ApiProperty()
  @Expose()
  lastFourDigits: string;

  @ApiProperty()
  @Type(() => ItemTransactionViewModel)
  @Expose()
  itemTransactions: ItemTransactionViewModel[];

  constructor(partial: Partial<CreatePaymentViewModel>) {
    Object.assign(this, partial);
  }
}
