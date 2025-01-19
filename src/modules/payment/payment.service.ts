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

      await this.databaseService.payments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          binNumber: result.binNumber,
          lastFourDigits: result.lastFourDigits,
          userId: Number(createPayment.buyer.buyerId),
        },
      });

      result.itemTransactions.forEach(async (item) => {
        await this.databaseService.productPayments.create({
          data: {
            paymentId: result.paymentId,
            productId: Number(item.itemId),
          },
        });
      });

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

      await this.databaseService.storedCardPayments.create({
        data: {
          paymentId: result.paymentId,
          price: Number(result.price),
          cardUserKey: createPayment.card.cardUserKey,
          cardTokenKey: createPayment.card.cardToken,
          binNumber: result.binNumber,
          lastFourDigits: result.lastFourDigits,
        },
      });

      result.itemTransactions.forEach(async (item) => {
        await this.databaseService.storedCardProductPayments.create({
          data: {
            paymentId: result.paymentId,
            productId: Number(item.itemId),
          },
        });
      });

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
