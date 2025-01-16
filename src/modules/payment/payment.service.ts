import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreatePaymentInput,
  PaymentInputTami,
  Verify3DSInput,
} from './input-model/create-payment.im';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { InitialThreeDSViewModel } from './view-model/threeDSecure.vm';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { BaseResponse } from 'src/base/response/base.response';
import { TamiService } from 'src/common/global-services/tami/tami.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly iyzicoService: IyzicoService,
    private readonly tamiService: TamiService,
  ) {}

  async createPayment(createPayment: CreatePaymentInput): Promise<any> {
    try {
      const result = await this.iyzicoService.createPayment(createPayment);

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
    initialThreeDSInput: CreatePaymentInput,
  ): Promise<InitialThreeDSViewModel> {
    try {
      const result =
        await this.iyzicoService.threedsInitialize(initialThreeDSInput);
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

  async verifyThreeDSayment(paymentToken: Verify3DSInput): Promise<any> {
    try {
      const result = this.iyzicoService.verifyThreeDSayment(
        paymentToken.paymentId,
      );
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

  async createPaymentTami(paymentInput: PaymentInputTami): Promise<any> {
    try {
      const result = this.tamiService.createPayment(paymentInput);
      return result;
    } catch (error) {
      console.log('tami create payment error:', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }
}
