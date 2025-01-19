import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressInput } from './input-model/address.im';
import { BaseResponse } from 'src/base/response/base.response';
import { AddressViewModel } from './view-model/address.vm';
import { AddressesService } from './addresses.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

@ApiTags('Address')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Post('save-address/:userId')
  @ApiOperation({ summary: 'Save Address' })
  async saveAddress(
    @Param('userId') userId: number,
    @Body() addressInput: AddressInput,
  ): Promise<BaseResponse<AddressViewModel>> {
    const address = await this.addressService.saveAddress(addressInput, userId);
    return new BaseResponse<AddressViewModel>({
      data: address,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Get('get-user-addresses/:userId')
  @ApiOperation({ summary: 'Get User Address' })
  async getUserAddress(
    @Param('userId') userId: number,
  ): Promise<BaseResponse<AddressViewModel[]>> {
    const addresses = await this.addressService.getUserAddress(userId);
    return new BaseResponse<AddressViewModel[]>({
      data: addresses,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
