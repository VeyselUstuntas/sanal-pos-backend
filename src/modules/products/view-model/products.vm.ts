import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductsViewModel {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  category1: string;

  @ApiProperty()
  @Expose()
  itemType: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ProductsViewModel>) {
    Object.assign(this, partial);
  }
}
