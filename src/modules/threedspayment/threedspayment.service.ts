import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import {
  UnifiedPaymentRequest,
  Verify3DSInput,
} from 'src/common/models/payment/input-model/create-payment.im';
import {
  InitialThreeDSViewModel,
  Verify3DSViewModel,
} from 'src/common/models/payment/view-model/threeDSecure.vm';
import { ProviderFactory } from 'src/providers/provider.factory';

@Injectable()
export class ThreedspaymentService {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly databaseService: DatabaseService,
  ) {}

  // 3ds tetiklenir

  async threedsInitialize(
    providerName: string,
    initialThreeDSInput: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel> {
    try {
      const provider = this.providerFactory.getPayment3DSProvider(providerName);
      const result: InitialThreeDSViewModel =
        await provider.threedsInitialize(initialThreeDSInput);
      console.log('baklimmm ', result);
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

  async threedsInitializeWithStoredCard(
    providerName: string,
    initialThreeDSInput: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel> {
    try {
      const provider = this.providerFactory.getPayment3DSProvider(providerName);
      const result: InitialThreeDSViewModel =
        await provider.threedsInitializeWithSavedCard(initialThreeDSInput);
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

  // 3ds doğrulanır

  async verifyThreeDSayment(
    providerName: string,
    verifyInput: Verify3DSInput,
  ): Promise<Verify3DSViewModel> {
    try {
      const provider = this.providerFactory.getPayment3DSProvider(providerName);

      const result: Verify3DSViewModel = await provider.verifyThreeDSayment(
        verifyInput.paymentId,
      );
      console.log('usr ', verifyInput.userId);
      console.log('usr2 ', result);

      await this.databaseService.payments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          binNumber: result.binNumber,
          lastFourDigits: result.lastFourDigits,
          userId: Number(verifyInput.userId),
        },
      });

      if (result.itemTransactions.length > 0) {
        result.itemTransactions.forEach(async (item) => {
          await this.databaseService.productPayments.create({
            data: {
              paymentId: result.paymentId,
              productId: Number(item.itemId),
            },
          });
        });
      }

      return new Promise((resolve, reject) => {
        if (result.status === 'success') {
          resolve(
            new Verify3DSViewModel({
              binNumber: result.binNumber,
              lastFourDigits: result.lastFourDigits,
              paymentId: result.paymentId,
              price: result.price,
              signature: result.signature,
              status: result.status,
            }),
          );
        } else {
          reject(
            new BaseResponse({
              data: null,
              message: 'Doğrulama Başarısız',
              success: false,
            }),
          );
        }
      });
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
}
