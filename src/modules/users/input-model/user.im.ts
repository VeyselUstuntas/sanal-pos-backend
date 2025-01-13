import { ApiProperty } from '@nestjs/swagger';

export class UserSaveInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  cardUserKey: string;

  constructor(partial: Partial<UserSaveInput>) {
    Object.assign(this, partial);
  }
}
