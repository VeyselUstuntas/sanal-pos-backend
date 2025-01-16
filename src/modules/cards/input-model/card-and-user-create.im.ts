import { ApiProperty } from '@nestjs/swagger';
import { CardInput } from './card.im';

export class CreateUserAndCardInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  card: CardInput;

  constructor(partial: Partial<CreateUserAndCardInput>) {
    Object.assign(this, partial);
  }
}
