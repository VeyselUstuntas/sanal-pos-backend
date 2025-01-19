import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { BaseResponse } from 'src/base/response/base.response';
import { ProductsViewModel } from './view-model/products.vm';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { ProductsInput } from './input-model/products.im';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get-all-products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ type: [ProductsViewModel] })
  async getAllProducts(): Promise<BaseResponse<ProductsViewModel[]>> {
    const result: ProductsViewModel[] =
      await this.productsService.getAllproducts();

    return new BaseResponse<ProductsViewModel[]>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('product-add')
  @ApiOperation({ summary: 'Add Product' })
  @ApiResponse({ type: ProductsViewModel })
  async addProduct(
    @Body() product: ProductsInput,
  ): Promise<BaseResponse<ProductsViewModel>> {
    const resutlt = await this.productsService.addProduct(product);
    return new BaseResponse<ProductsViewModel>({
      data: resutlt,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
