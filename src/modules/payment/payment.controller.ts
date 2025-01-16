import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import {
  UnifiedPaymentRequest,
  Verify3DSInput,
} from './input-model/create-payment.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { InitialThreeDSViewModel } from './view-model/threeDSecure.vm';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('payment-create')
  @ApiProperty({ description: 'Create Payment' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico', 'tami'],
  })
  async createPayment(
    @Query('providerName') providerName: string,
    @Body() paymentInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<void>> {
    console.log('alinana parameter quertsi ', providerName);
    const paymentResult = await this.paymentService.createPayment(
      providerName,
      paymentInput,
    );
    return new BaseResponse<any>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-initial-payment')
  @ApiProperty({ description: 'threeds Initialize' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  async threedsInitialize(
    @Query('providerName') providerName: string,
    @Body() initialThreedsInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<InitialThreeDSViewModel>> {
    const result: InitialThreeDSViewModel =
      await this.paymentService.threedsInitialize(
        providerName,
        initialThreedsInput,
      );
    return new BaseResponse<InitialThreeDSViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-verify-payment')
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  @ApiProperty({ description: 'verify 3D Secure payment' })
  async verifyThreeDSayment(
    @Query('providerName') providerName: string,
    @Body() token: Verify3DSInput,
  ): Promise<BaseResponse<any>> {
    const result: any = await this.paymentService.verifyThreeDSayment(
      providerName,
      token,
    );
    return new BaseResponse<any>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
