import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { UnifiedPaymentRequest } from '../../common/models/payment/input-model/create-payment.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CreatePaymentViewModel } from '../../common/models/payment/view-model/create-payment.vm';

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
  @ApiResponse({ type: CreatePaymentViewModel })
  async createPayment(
    @Query('providerName') providerName: string,
    @Body() paymentInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<CreatePaymentViewModel>> {
    const paymentResult: CreatePaymentViewModel =
      await this.paymentService.createPayment(providerName, paymentInput);
    return new BaseResponse<CreatePaymentViewModel>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('payment-create-with-stored-card')
  @ApiProperty({ description: 'Create Payment with Stored Card' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  @ApiResponse({ type: CreatePaymentViewModel })
  async createPaymentWithStoredCard(
    @Query('providerName') providerName: string,
    @Body() paymentInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<CreatePaymentViewModel>> {
    const paymentResult: CreatePaymentViewModel =
      await this.paymentService.createPaymentWithStoredCard(
        providerName,
        paymentInput,
      );
    return new BaseResponse<CreatePaymentViewModel>({
      data: paymentResult,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
