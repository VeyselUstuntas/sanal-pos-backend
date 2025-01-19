import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ItemTransactionViewModel } from './create-payment.vm';

export class InitialThreeDSViewModel {
  @ApiProperty({
    description: 'İşlem durumu (başarılı veya başarısız)',
    example: 'success',
  })
  @Expose()
  status: string;

  @ApiProperty({
    description: '3D Secure HTML içeriği',
    example: '<html><body>...</body></html>',
  })
  @Expose()
  threeDSHtmlContent: string;

  @ApiProperty({
    description: 'Ödeme ID',
    example: '23390517',
  })
  @Expose()
  paymentId: string;

  @ApiProperty({
    description: 'Yanıtın imzası',
    example: '0d95bbdff873736fecf09becca300e4b672ac8374383ef2b1d59a945945b9ad1',
  })
  @Expose()
  signature: string;

  @ApiProperty()
  @Expose()
  userId: string;

  constructor(partial: Partial<InitialThreeDSViewModel>) {
    Object.assign(this, partial);
  }
}

export class Verify3DSViewModel {
  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  price: number | string;

  @ApiProperty()
  @Expose()
  binNumber: string;

  @ApiProperty()
  @Expose()
  lastFourDigits: string;

  @ApiProperty()
  @Expose()
  paymentId: string;

  @ApiProperty()
  @Expose()
  signature: string;

  @ApiProperty()
  @Type(() => ItemTransactionViewModel)
  @Expose()
  itemTransactions: ItemTransactionViewModel[];

  constructor(partial: Partial<Verify3DSViewModel>) {
    Object.assign(this, partial);
  }
}
