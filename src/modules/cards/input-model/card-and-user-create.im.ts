import { ApiProperty } from '@nestjs/swagger';
import { CardInput, Locale } from './card.im';

export class CreateUserAndCardInput {
  @ApiProperty()
  locale: Locale = 'TR';

  @ApiProperty()
  conversationId: string = '123456789';

  @ApiProperty()
  externalId: string = 'external id';

  @ApiProperty()
  email: string;

  @ApiProperty()
  card: CardInput;

  constructor(partial: Partial<CreateUserAndCardInput>) {
    Object.assign(this, partial);
  }
}
