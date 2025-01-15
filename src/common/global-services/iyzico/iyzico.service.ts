import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentInput } from 'src/modules/payment/input-model/create-payment.im';
import { PaymentGateway } from 'src/modules/payment/payment-gateway/PaymentGateway';
import * as Iyzipay from 'iyzipay';
import { CreateUserAndCardInput } from 'src/modules/cards/input-model/card-and-user-create.im';
import {
  CardCreateInput,
  GetCardsInput,
} from 'src/modules/cards/input-model/card.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

@Injectable()
export class IyzicoService implements PaymentGateway {
  private iyzipay: Iyzipay;

  constructor() {
    this.iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY,
      secretKey: process.env.IYZICO_SEC_KEY,
      uri: process.env.IYZICO_BASE_URL,
    });
  }

  createPayment(createPayment: CreatePaymentInput): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.payment.create(
          {
            locale: createPayment.locale,
            conversationId: createPayment.conversationId,
            price: createPayment.price,
            paidPrice: createPayment.paidPrice,
            installments: createPayment.installments,
            paymentChannel: createPayment.paymentChannel,
            basketId: createPayment.basketId,
            paymentGroup: createPayment.paymentGroup,
            paymentCard: createPayment.paymentCard,
            buyer: createPayment.buyer,
            shippingAddress: createPayment.shippingAddress,
            billingAddress: createPayment.billingAddress,
            basketItems: createPayment.basketItems,
            currency: createPayment.currency,
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

  async createUserAndAddCard(
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.card.create(
          {
            locale: createUserAndCard.locale,
            conversationId: createUserAndCard.conversationId,
            email: createUserAndCard.email,
            externalId: createUserAndCard.externalId,
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

  async generateCard(cardData: CardCreateInput): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.card.create(
          {
            locale: cardData.locale,
            conversationId: cardData.conversationId,
            cardUserKey: cardData.cardUserKey,
            email: 'deneme@gmail.com',
            card: {
              cardAlias: cardData.card.cardAlias,
              cardNumber: cardData.card.cardNumber,
              expireMonth: cardData.card.expireMonth,
              expireYear: cardData.card.expireYear,
              cardHolderName: cardData.card.cardHolderName,
            },
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
            locale: userCardsInput.locale,
            conversationId: userCardsInput.conversationId,
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

  async threedsInitialize(initialThreeds: CreatePaymentInput): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.threedsInitialize.create(
          {
            locale: initialThreeds.locale,
            conversationId: initialThreeds.conversationId,
            price: initialThreeds.price,
            paidPrice: initialThreeds.paidPrice,
            installments: initialThreeds.installments,
            paymentChannel: initialThreeds.paymentChannel,
            basketId: initialThreeds.basketId,
            paymentGroup: initialThreeds.paymentGroup,
            paymentCard: initialThreeds.paymentCard,
            buyer: initialThreeds.buyer,
            shippingAddress: initialThreeds.shippingAddress,
            billingAddress: initialThreeds.billingAddress,
            basketItems: initialThreeds.basketItems,
            currency: initialThreeds.currency,
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
}
