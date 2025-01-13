import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from 'src/modules/payment/input-model/create-payment.im';
import { PaymentGateway } from 'src/modules/payment/payment-gateway/PaymentGateway';
import * as Iyzipay from 'iyzipay';
import { CreateUserAndCardInput } from 'src/modules/cards/input-model/card-and-user-create.im';
import {
  CardCreateInput,
  GetCardsInput,
} from 'src/modules/cards/input-model/card.im';

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
        this.iyzipay.payment.create(createPayment, (err, result) => {
          if (err) {
            console.log('Hata:', err);
            reject(err);
          } else {
            console.log('Sonuç:', result);
            resolve(result);
          }
        });
      });
    } catch (error) {
      console.log('Iyzico ödeme oluşturma başarısız:', error);
      return Promise.reject(error);
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
    }
  }
}
