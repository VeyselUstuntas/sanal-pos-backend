import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { ProductsViewModel } from './view-model/products.vm';
import { ProductsInput } from './input-model/products.im';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllproducts(): Promise<ProductsViewModel[]> {
    try {
      const result: ProductsViewModel[] =
        await this.databaseService.product.findMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(product: ProductsInput): Promise<ProductsViewModel> {
    try {
      const result = await this.databaseService.product.create({
        data: {
          name: product.name,
          category1: product.category,
          itemType: product.itemType,
          price: Number(product.price),
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
