import { BadRequestException, Injectable } from '@nestjs/common';
import * as Iyzipay from 'iyzipay';
import { CreateUserAndCardInput } from 'src/modules/cards/input-model/card-and-user-create.im';
import {
  CardGenerateInput,
  GetCardsInput,
} from 'src/modules/cards/input-model/card.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { PaymentProvider } from 'src/providers/interfaces/payment-provider.interfaces';
import { CardProvider } from 'src/providers/interfaces/card-provider.interfaces';
import { UnifiedPaymentRequest } from 'src/modules/payment/input-model/create-payment.im';
import { UserProvider } from 'src/providers/interfaces/user-provider.interfaces';

@Injectable()
export class IyzicoService
  implements PaymentProvider, CardProvider, UserProvider
{
  private iyzipay: Iyzipay;

  constructor() {
    this.iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SEC_KEY,
      uri: process.env.IYZICO_BASE_URL,
    });
  }

  // PAYMENT ISLEMLERI

  createPayment(createPayment: UnifiedPaymentRequest): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.payment.create(
          {
            basketItems: createPayment.basketItems,
            billingAddress: createPayment.billingAddress,
            buyer: {
              city: createPayment.buyer.city,
              country: createPayment.buyer.country,
              email: createPayment.buyer.emailAddress,
              id: createPayment.buyer.buyerId,
              identityNumber: createPayment.buyer.identityNumber,
              ip: createPayment.buyer.ipAddress,
              name: createPayment.buyer.name,
              registrationAddress: createPayment.buyer.registrationAddress,
              surname: createPayment.buyer.surName,
              zipCode: createPayment.buyer.zipCode,
            },
            currency: createPayment.currency,
            installments: createPayment.installmentCount,
            paidPrice: createPayment.paidPrice,
            paymentCard: {
              cardHolderName: createPayment.card.holderName,
              cardNumber: createPayment.card.number,
              cvc: createPayment.card.cvv,
              expireMonth: createPayment.card.expireMonth.toString(),
              expireYear: createPayment.card.expireYear.toString(),
              cardAlias: 'yok',
            },
            price: createPayment.price,
            shippingAddress: createPayment.shippingAddress,
          },
          (err, result) => {
            if (err) {
              console.log('Hata:', err);
              reject(err);
            } else {
              console.log('Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log('Iyzico ödeme oluşturma başarısız:', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  async threedsInitialize(initialThreeds: UnifiedPaymentRequest): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.threedsInitialize.create(
          {
            basketItems: initialThreeds.basketItems,
            billingAddress: initialThreeds.billingAddress,
            buyer: {
              city: initialThreeds.buyer.city,
              country: initialThreeds.buyer.country,
              email: initialThreeds.buyer.emailAddress,
              id: initialThreeds.buyer.buyerId,
              identityNumber: initialThreeds.buyer.identityNumber,
              ip: initialThreeds.buyer.ipAddress,
              name: initialThreeds.buyer.name,
              registrationAddress: initialThreeds.buyer.registrationAddress,
              surname: initialThreeds.buyer.surName,
              zipCode: initialThreeds.buyer.zipCode,
            },
            currency: initialThreeds.currency,
            installments: initialThreeds.installmentCount,
            paidPrice: initialThreeds.paidPrice,
            paymentCard: {
              cardHolderName: initialThreeds.card.holderName,
              cardNumber: initialThreeds.card.number,
              cvc: initialThreeds.card.cvv,
              expireMonth: initialThreeds.card.expireMonth.toString(),
              expireYear: initialThreeds.card.expireYear.toString(),
              cardAlias: 'yok',
            },
            price: initialThreeds.price,
            shippingAddress: initialThreeds.shippingAddress,
            callbackUrl: initialThreeds.callbackUrl,
          },
          (err, result) => {
            if (err) {
              console.log('3DS Ödeme Başlatma Hatası:', err);
              reject(err);
            } else {
              console.log('3DS Ödeme Başlatma Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log('3ds error ', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  verifyThreeDSayment(paymentToken: string): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.threedsPayment.create(
          { paymentId: paymentToken },
          (err, result) => {
            if (err) {
              console.log('3DS Ödeme Doğrulama Hatası:', err);
              reject(err);
            } else {
              console.log('3DS Ödeme Doğrulama Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  // CARD ISLEMLERI

  async generateCard(cardData: CardGenerateInput): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.card.create(
          {
            card: {
              cardAlias: cardData.card.cardAlias,
              cardNumber: cardData.card.cardNumber,
              expireMonth: cardData.card.expireMonth,
              expireYear: cardData.card.expireYear,
              cardHolderName: cardData.card.cardHolderName,
            },
            email: cardData.email,
            cardUserKey: cardData.cardUserKey,
          },
          (err, result) => {
            if (err) {
              console.log('Hata:', err);
              reject(err);
            } else {
              console.log('Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log('generete card error ', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  async getUserCards(userCardsInput: GetCardsInput): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.cardList.retrieve(
          {
            cardUserKey: userCardsInput.cardUserKey,
          },
          (err, result) => {
            if (err) {
              console.log('Hata:', err);
              reject(err);
            } else {
              console.log('Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log('get user cards error ', error);
      throw new BadRequestException(
        new BaseResponse({
          data: null,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  // USER ISLEMLERI

  async createUserAndAddCard(
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.card.create(
          {
            email: createUserAndCard.email,
            card: createUserAndCard.card,
          },
          (err, result) => {
            if (err) {
              console.log('Hata:', err);
              reject(err);
            } else {
              console.log('Sonuç:', result);
              resolve(result);
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
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
