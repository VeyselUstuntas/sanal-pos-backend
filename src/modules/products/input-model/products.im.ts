import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductsInput {
  @ApiProperty()
  @Expose()
  price: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  category: string;

  @ApiProperty({ example: 'PHYSICAL' })
  @Expose()
  itemType: string;
}
