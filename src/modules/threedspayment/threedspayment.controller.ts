import { Body, Controller, Post, Query } from '@nestjs/common';
import { ThreedspaymentService } from './threedspayment.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import {
  InitialThreeDSViewModel,
  Verify3DSViewModel,
} from 'src/common/models/payment/view-model/threeDSecure.vm';
import {
  UnifiedPaymentRequest,
  Verify3DSInput,
} from 'src/common/models/payment/input-model/create-payment.im';

@ApiTags('ThreeDSPayment')
@Controller('threedspayment')
export class ThreedspaymentController {
  constructor(private readonly threeDSPaymentService: ThreedspaymentService) {}

  @Post('threeds-initial-payment')
  @ApiOperation({ summary: 'threeds Initialize' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  @ApiResponse({ type: InitialThreeDSViewModel })
  async threedsInitialize(
    @Query('providerName') providerName: string,
    @Body() initialThreedsInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<InitialThreeDSViewModel>> {
    const result: InitialThreeDSViewModel =
      await this.threeDSPaymentService.threedsInitialize(
        providerName,
        initialThreedsInput,
      );
    return new BaseResponse<InitialThreeDSViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-initial-payment-with-stored-card')
  @ApiOperation({ summary: 'threeds Initialize with stored card' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  @ApiResponse({ type: InitialThreeDSViewModel })
  async threedsInitializeWithStoredCard(
    @Query('providerName') providerName: string,
    @Body() initialThreedsInput: UnifiedPaymentRequest,
  ): Promise<BaseResponse<InitialThreeDSViewModel>> {
    const result: InitialThreeDSViewModel =
      await this.threeDSPaymentService.threedsInitializeWithStoredCard(
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
  @ApiOperation({ summary: 'verify 3D Secure payment' })
  @ApiResponse({ type: Verify3DSViewModel })
  async verifyThreeDSayment(
    @Query('providerName') providerName: string,
    @Body() token: Verify3DSInput,
  ): Promise<BaseResponse<Verify3DSViewModel>> {
    const result: any = await this.threeDSPaymentService.verifyThreeDSayment(
      providerName,
      token,
    );
    return new BaseResponse<Verify3DSViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('threeds-verify-payment-with-stored-card')
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  @ApiOperation({ summary: 'verify 3D Secure payment with stored card' })
  @ApiResponse({ type: Verify3DSViewModel })
  async verifyThreeDSaymentWithStoredCard(
    @Query('providerName') providerName: string,
    @Body() token: Verify3DSInput,
  ): Promise<BaseResponse<Verify3DSViewModel>> {
    const result: any =
      await this.threeDSPaymentService.verifyThreeDSaymentWithStoredCard(
        providerName,
        token,
      );
    return new BaseResponse<Verify3DSViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
