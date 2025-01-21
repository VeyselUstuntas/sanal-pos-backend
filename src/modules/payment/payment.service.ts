import { BadRequestException, Injectable } from '@nestjs/common';
import { UnifiedPaymentRequest } from '../../common/models/payment/input-model/create-payment.im';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { BaseResponse } from 'src/base/response/base.response';
import { ProviderFactory } from 'src/providers/provider.factory';
import {
  CreatePaymentViewModel,
  ItemTransactionViewModel,
} from '../../common/models/payment/view-model/create-payment.vm';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { PaymentMethod, PaymentType } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly databaseService: DatabaseService,
  ) {}

  // ödeme olşturma

  async createPayment(
    providerName: string,
    createPayment: UnifiedPaymentRequest,
  ): Promise<CreatePaymentViewModel> {
    try {
      // provider belirlenir

      const provider = this.providerFactory.getPaymentProvider(providerName);

      const result: CreatePaymentViewModel =
        await provider.createPayment(createPayment);

      if (providerName != 'tami') {
        const paymentDirectCard =
          await this.databaseService.paymentDirectCard.create({
            data: {
              binNumber: result.binNumber,
              lastFourDigits: result.lastFourDigits,
            },
          });
        console.log('paymentDirectCard ', paymentDirectCard);
        const payment = await this.databaseService.payments.create({
          data: {
            paymentId: result.paymentId,
            price: Number(result.price),
            paymentType: PaymentType.NonThreeDS,
            paymentMethod: PaymentMethod.DirectCard,
            user: {
              connect: { id: Number(createPayment.buyer.buyerId) },
            },
            BillingAddress: {
              connect: { id: createPayment.billingAddressId },
            },
            ShippingAddress: {
              connect: { id: createPayment.shippingAddressId },
            },
            PaymentDirectCard: {
              connect: { id: paymentDirectCard.id },
            },
          },
        });

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
        if (result?.status === 'success') {
          resolve(
            new CreatePaymentViewModel({
              status: result.status,
              paymentId: result.paymentId,
              price: result.price,
              binNumber: result.binNumber,
              lastFourDigits: result.lastFourDigits,
              itemTransactions: result.itemTransactions.map((item) => {
                return new ItemTransactionViewModel({
                  itemId: item.itemId,
                  price: item.price,
                });
              }),
            }),
          );
        } else {
          reject(
            new BaseResponse({
              data: null,
              message: 'Ödeme Oluşturma Başarısız',
              success: false,
            }),
          );
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

  async createPaymentWithStoredCard(
    providerName: string,
    createPayment: UnifiedPaymentRequest,
  ): Promise<CreatePaymentViewModel> {
    try {
      // provider belirlenir

      const provider = this.providerFactory.getPaymentProvider(providerName);

      const result: CreatePaymentViewModel =
        await provider.createPaymentWithStoredCard(createPayment);

      const paymentStoredCard =
        await this.databaseService.paymentStoredCard.create({
          data: {
            cardTokenKey: createPayment.card.cardToken,
            cardUserKey: createPayment.card.cardUserKey,
          },
        });

      const payment = await this.databaseService.payments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          paymentType: PaymentType.NonThreeDS,
          paymentMethod: PaymentMethod.StoredCard,
          user: {
            connect: { id: Number(createPayment.buyer.buyerId) },
          },
          BillingAddress: {
            connect: { id: createPayment.billingAddressId },
          },
          ShippingAddress: {
            connect: { id: createPayment.shippingAddressId },
          },
          PaymentStoredCard: {
            connect: { id: paymentStoredCard.id },
          },
        },
      });

      for (const item of result.itemTransactions) {
        await this.databaseService.paymentProducts.create({
          data: {
            paymentId: Number(payment.id),
            productId: Number(item.itemId),
          },
        });
      }

      return new Promise((resolve, reject) => {
        if (result?.status === 'success') {
          resolve(
            new CreatePaymentViewModel({
              status: result.status,
              paymentId: result.paymentId,
              price: result.price,
              binNumber: result.binNumber,
              lastFourDigits: result.lastFourDigits,
              itemTransactions: result.itemTransactions.map((item) => {
                return new ItemTransactionViewModel({
                  itemId: item.itemId,
                  price: item.price,
                });
              }),
            }),
          );
        } else {
          reject(
            new BaseResponse({
              data: null,
              message: 'Ödeme Oluşturma Başarısız',
              success: false,
            }),
          );
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
}
