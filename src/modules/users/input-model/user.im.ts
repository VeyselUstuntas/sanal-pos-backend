import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CardInput } from 'src/modules/cards/input-model/card.im';

export class UserSaveInput {
  @ApiProperty({ example: 'veysel' })
  name: string;

  @ApiProperty({ example: 'ustuntas' })
  surname: string;

  @ApiProperty({ example: '5466766763' })
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  identityNumber: string;

  @ApiHideProperty()
  cardUserKey?: string;

  // @ApiProperty({ type: CardInput })
  // card: CardInput;

  constructor(partial: Partial<UserSaveInput>) {
    Object.assign(this, partial);
  }
}

export class CreateUserAndCardInput {
  @ApiProperty()
  user: UserSaveInput;

  @ApiProperty()
  card: CardInput;

  constructor(partial: Partial<CreateUserAndCardInput>) {
    Object.assign(this, partial);
  }
}
