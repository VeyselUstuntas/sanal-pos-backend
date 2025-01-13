import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentInput } from './input-model/create-payment.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

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

  @Post('payment-create-stripe')
  @ApiProperty({ description: 'Create Payment Stripe' })
  async createPaymentStripe(): Promise<BaseResponse<void>> {
    const paymentResult = await this.paymentService.createPaymentStripe();
    return new BaseResponse<any>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
