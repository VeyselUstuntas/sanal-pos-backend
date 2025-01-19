import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserViewModel {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  cardUserKey: string;

  @Expose()
  @ApiProperty()
  identityNumber: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  surname: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}

export class UserCreateViewModel {
  @Expose()
  @ApiProperty({ example: 'success' })
  status: string;

  @Expose()
  @ApiProperty({ example: 'veysel@gmail.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 'd5151ae5-4470-e544-0795-3f3e26a263ed' })
  cardUserKey: string;

  @Expose()
  @ApiProperty({ example: 'de5d582c-e32a-bcbb-bfac-d1e7e79b7fb0' })
  cardToken: string;

  @Expose()
  @ApiProperty({ example: "veysel's card2" })
  cardAlias: string;

  @Expose()
  @ApiProperty({ example: '51704100' })
  binNumber: string;

  @Expose()
  @ApiProperty({ example: '0004' })
  lastFourDigits: string;

  @Expose()
  @ApiProperty({ example: 'DEBIT_CARD' })
  cardType: string;

  @Expose()
  @ApiProperty({ example: 'MASTER_CARD' })
  cardAssociation: string;

  @Expose()
  @ApiProperty({ example: 'Paracard' })
  cardFamily: string;

  @Expose()
  @ApiProperty({ example: 62 })
  cardBankCode: number;

  @Expose()
  @ApiProperty({ example: 'Garanti Bankası' })
  cardBankName: string;

  constructor(partial: Partial<UserCreateViewModel>) {
    Object.assign(this, partial);
  }
}
