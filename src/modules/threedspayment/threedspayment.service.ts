import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentMethod, PaymentType } from '@prisma/client';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import {
  UnifiedPaymentRequest,
  Verify3DSInput,
  Verify3DSStoredCardInput,
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

      const paymentDirectCard =
        await this.databaseService.paymentDirectCard.create({
          data: {
            binNumber: result.binNumber,
            lastFourDigits: result.lastFourDigits,
          },
        });

      const payment = await this.databaseService.payments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          paymentType: PaymentType.ThreeDS,
          paymentMethod: PaymentMethod.DirectCard,
          user: {
            connect: { id: Number(verifyInput.userId) },
          },
          BillingAddress: {
            connect: { id: verifyInput.billingAddressId },
          },
          ShippingAddress: {
            connect: { id: verifyInput.shippingAddressId },
          },
          PaymentDirectCard: {
            connect: { id: paymentDirectCard.id },
          },
        },
      });

      if (result.itemTransactions.length > 0) {
        for (const item of result.itemTransactions) {
          await this.databaseService.paymentProducts.create({
            data: {
              paymentId: Number(payment.id),
              productId: Number(item.itemId),
            },
          });
        }
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

  async verifyThreeDSaymentWithStoredCard(
    providerName: string,
    verifyInput: Verify3DSStoredCardInput,
  ): Promise<Verify3DSViewModel> {
    try {
      const provider = this.providerFactory.getPayment3DSProvider(providerName);

      const result: Verify3DSViewModel =
        await provider.verifyThreeDSaymentWithStoredCard(verifyInput.paymentId);

      const paymentStoredCard =
        await this.databaseService.paymentStoredCard.create({
          data: {
            cardTokenKey: verifyInput.cardToken,
            cardUserKey: verifyInput.cardUserKey,
          },
        });

      const payment = await this.databaseService.payments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          paymentType: PaymentType.ThreeDS,
          paymentMethod: PaymentMethod.StoredCard,
          user: {
            connect: { id: Number(verifyInput.userId) },
          },
          BillingAddress: {
            connect: { id: verifyInput.billingAddressId },
          },
          ShippingAddress: {
            connect: { id: verifyInput.shippingAddressId },
          },
          PaymentStoredCard: {
            connect: { id: paymentStoredCard.id },
          },
        },
      });

      if (result.itemTransactions.length > 0) {
        for (const item of result.itemTransactions) {
          await this.databaseService.paymentProducts.create({
            data: {
              paymentId: Number(payment.id),
              productId: Number(item.itemId),
            },
          });
        }
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
