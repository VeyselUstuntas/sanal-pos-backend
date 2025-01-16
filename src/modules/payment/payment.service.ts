import { BadRequestException, Injectable } from '@nestjs/common';
import {
  UnifiedPaymentRequest,
  Verify3DSInput,
} from './input-model/create-payment.im';
import { InitialThreeDSViewModel } from './view-model/threeDSecure.vm';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { BaseResponse } from 'src/base/response/base.response';
import { ProviderFactory } from 'src/providers/provider.factory';

@Injectable()
export class PaymentService {
  constructor(private readonly providerFactory: ProviderFactory) {}

  async createPayment(
    providerName: string,
    createPayment: UnifiedPaymentRequest,
  ): Promise<any> {
    try {
      const provider = this.providerFactory.getPaymentProvider(providerName);
      console.log('provider: ', provider);

      const result = await provider.createPayment(createPayment);
      console.log('result: ', result);

      return new Promise((resolve, reject) => {
        if (result?.status === 'success') {
          resolve(result);
        } else {
          reject(new Error('Ödeme oluşturma başarısız.'));
        }
      });
    } catch (error) {
      console.log('create payment error:', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  async threedsInitialize(
    providerName: string,
    initialThreeDSInput: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel> {
    try {
      const provider = this.providerFactory.getPaymentProvider(providerName);
      const result = await provider.threedsInitialize(initialThreeDSInput);

      if (result.status !== 'success') {
        throw new BadRequestException(
          new BaseResponse({
            data: null,
            message: ResponseMessages.BAD_REQUEST,
            success: false,
          }),
        );
      }
      return result;
    } catch (error) {
      console.log('3DS başlatılamadı ', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  async verifyThreeDSayment(
    providerName: string,
    paymentToken: Verify3DSInput,
  ): Promise<any> {
    try {
      const provider = this.providerFactory.getPaymentProvider(providerName);

      const result = provider.verifyThreeDSayment(paymentToken.paymentId);
      return result;
    } catch (error) {
      console.log('3DS doğrulanamadı ', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  // Tami

  // async createPaymentTami(paymentInput: PaymentInputTami): Promise<any> {
  //   try {
  //     const result = this.tamiService.createPayment(paymentInput);
  //     return result;
  //   } catch (error) {
  //     console.log('tami create payment error:', error);
  //     throw new BadRequestException(
  //       new BaseResponse({
  //         data: null,
  //         message: ResponseMessages.BAD_REQUEST,
  //         success: false,
  //       }),
  //     );
  //   }
  // }
}
