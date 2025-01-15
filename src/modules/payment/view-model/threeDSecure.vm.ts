import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InitialThreeDSViewModel {
  @ApiProperty({
    description: 'İşlem durumu (başarılı veya başarısız)',
    example: 'success',
  })
  @Expose()
  status: string;

  @ApiProperty({
    description: 'Dil seçeneği',
    example: 'tr',
  })
  @Expose()
  locale: string;

  @ApiProperty({
    description: 'Sistem zamanı (timestamp)',
    example: 1736787980470,
  })
  @Expose()
  systemTime: number;

  @ApiProperty({
    description: 'Sohbet ID',
    example: '123456789',
  })
  @Expose()
  conversationId: string;

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
}
