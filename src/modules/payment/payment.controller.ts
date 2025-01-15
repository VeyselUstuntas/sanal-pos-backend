import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import {
  CreatePaymentInput,
  CreatePaymentStripeInput,
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
  async createPayment(
    @Body() paymentInput: CreatePaymentInput,
  ): Promise<BaseResponse<void>> {
    const paymentResult = await this.paymentService.createPayment(paymentInput);
    return new BaseResponse<any>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-initial-payment')
  @ApiProperty({ description: 'threeds Initialize' })
  async threedsInitialize(
    @Body() initialThreedsInput: CreatePaymentInput,
  ): Promise<BaseResponse<InitialThreeDSViewModel>> {
    const result: InitialThreeDSViewModel =
      await this.paymentService.threedsInitialize(initialThreedsInput);
    return new BaseResponse<InitialThreeDSViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-verify-payment')
  @ApiProperty({ description: 'verify 3D Secure payment' })
  async verifyThreeDSayment(
    @Body() token: Verify3DSInput,
  ): Promise<BaseResponse<any>> {
    const result: any = await this.paymentService.verifyThreeDSayment(token);
    return new BaseResponse<any>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('payment-create-stripe')
  @ApiProperty({ description: 'Create Payment Stripe' })
  async createPaymentStripe(
    @Body() payment: CreatePaymentStripeInput,
  ): Promise<BaseResponse<void>> {
    const paymentResult =
      await this.paymentService.createPaymentStripe(payment);
    return new BaseResponse<any>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
