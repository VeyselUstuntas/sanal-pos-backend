import { BadRequestException, Injectable } from '@nestjs/common';
import * as Iyzipay from 'iyzipay';
import { CardGenerateInput } from 'src/modules/cards/input-model/card.im';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { PaymentProvider } from 'src/providers/interfaces/payment-provider.interfaces';
import { CardProvider } from 'src/providers/interfaces/card-provider.interfaces';
import { UnifiedPaymentRequest } from 'src/common/models/payment/input-model/create-payment.im';
import { UserProvider } from 'src/providers/interfaces/user-provider.interfaces';
import {
  CreatePaymentViewModel,
  ItemTransactionViewModel,
} from 'src/common/models/payment/view-model/create-payment.vm';
import { UserCreateViewModel } from 'src/modules/users/view-model/user.vm';
import { CreateUserAndCardInput } from 'src/modules/users/input-model/user.im';
import { Payment3DSProvider } from 'src/providers/interfaces/payment3DS-provider.interface';
import { InitialThreeDSViewModel } from 'src/common/models/payment/view-model/threeDSecure.vm';
@Injectable()
export class IyzicoService
  implements PaymentProvider, Payment3DSProvider, CardProvider, UserProvider
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

  createPayment(
    createPayment: UnifiedPaymentRequest,
  ): Promise<CreatePaymentViewModel> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.payment.create(
          {
            price: createPayment.price,
            paidPrice: createPayment.paidPrice,
            installments: createPayment.installmentCount,
            paymentCard: {
              cardHolderName: createPayment.card.holderName,
              cardNumber: createPayment.card.number,
              cvc: createPayment.card.cvv,
              expireMonth: createPayment.card.expireMonth.toString(),
              expireYear: createPayment.card.expireYear.toString(),
              cardAlias: 'yok',
            },
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
              resolve(
                new CreatePaymentViewModel({
                  status: result.status,
                  price: result.price,
                  paymentId: result.paymentId,
                  binNumber: result.binNumber,
                  lastFourDigits: result.lastFourDigits,
                  itemTransactions: result.itemTransactions.map(
                    (transaction) =>
                      new ItemTransactionViewModel({
                        itemId: transaction.itemId,
                        price: transaction.price,
                      }),
                  ),
                }),
              );
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

  createPaymentWithStoredCard(
    createPayment: UnifiedPaymentRequest,
  ): Promise<CreatePaymentViewModel> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.payment.create(
          {
            price: createPayment.price,
            paidPrice: createPayment.paidPrice,
            installments: createPayment.installmentCount,
            paymentCard: {
              cardUserKey: createPayment.card.cardUserKey,
              cardToken: createPayment.card.cardToken,
            },
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
              resolve(
                new CreatePaymentViewModel({
                  status: result.status,
                  price: result.price,
                  paymentId: result.paymentId,
                  binNumber: result.binNumber,
                  lastFourDigits: result.lastFourDigits,
                  itemTransactions: result.itemTransactions.map(
                    (transaction) =>
                      new ItemTransactionViewModel({
                        itemId: transaction.itemId,
                        price: transaction.price,
                      }),
                  ),
                }),
              );
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

  // 3DS PAYMENT ISLEMLERI

  async threedsInitialize(
    initialThreeds: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.threedsInitialize.create(
          {
            price: initialThreeds.price,
            paidPrice: initialThreeds.paidPrice,
            installments: initialThreeds.installmentCount,
            paymentCard: {
              cardHolderName: initialThreeds.card.holderName,
              cardNumber: initialThreeds.card.number,
              cvc: initialThreeds.card.cvv,
              expireMonth: initialThreeds.card.expireMonth.toString(),
              expireYear: initialThreeds.card.expireYear.toString(),
              cardAlias: 'yok',
            },
            buyer: {
              id: initialThreeds.buyer.buyerId,
              name: initialThreeds.buyer.name,
              surname: initialThreeds.buyer.surName,
              identityNumber: initialThreeds.buyer.identityNumber,
              email: initialThreeds.buyer.emailAddress,
              registrationAddress: initialThreeds.buyer.registrationAddress,
              city: initialThreeds.buyer.city,
              country: initialThreeds.buyer.country,
              ip: initialThreeds.buyer.ipAddress,
            },
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
              const data: InitialThreeDSViewModel = new InitialThreeDSViewModel(
                result,
              );
              data.userId = initialThreeds.buyer.buyerId;
              resolve(data);
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

  async threedsInitializeWithSavedCard(
    initialThreeds: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.threedsInitialize.create(
          {
            price: initialThreeds.price,
            paidPrice: initialThreeds.paidPrice,
            installments: initialThreeds.installmentCount,
            paymentCard: {
              cardUserKey: initialThreeds.card.cardUserKey,
              cardToken: initialThreeds.card.cardToken,
            },
            buyer: {
              id: initialThreeds.buyer.buyerId,
              name: initialThreeds.buyer.name,
              surname: initialThreeds.buyer.surName,
              identityNumber: initialThreeds.buyer.identityNumber,
              email: initialThreeds.buyer.emailAddress,
              registrationAddress: initialThreeds.buyer.registrationAddress,
              city: initialThreeds.buyer.city,
              country: initialThreeds.buyer.country,
              ip: initialThreeds.buyer.ipAddress,
            },
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
              const data: InitialThreeDSViewModel = new InitialThreeDSViewModel(
                result,
              );
              data.userId = initialThreeds.buyer.buyerId;
              resolve(data);
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

  async verifyThreeDSayment(paymentToken: string): Promise<any> {
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

  async generateCard(
    cardData: CardGenerateInput,
  ): Promise<UserCreateViewModel> {
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
              resolve(
                new UserCreateViewModel({
                  binNumber: result.binNumber,
                  cardAlias: result.cardAlias,
                  cardAssociation: result.cardAssociation,
                  cardBankCode: result.cardBankCode,
                  cardBankName: result.cardBankName,
                  cardFamily: result.cardFamily,
                  cardToken: result.cardToken,
                  cardType: result.cardType,
                  cardUserKey: result.cardUserKey,
                  email: result.email,
                  lastFourDigits: result.lastFourDigits,
                  status: result.status,
                }),
              );
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

  async getUserCards(cardUserKey: string): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.cardList.retrieve(
          {
            cardUserKey: cardUserKey,
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

  // // USER ISLEMLERI

  async createUserAndAddCard(
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<UserCreateViewModel> {
    try {
      return new Promise((resolve, reject) => {
        this.iyzipay.card.create(
          {
            email: createUserAndCard.user.email,
            card: {
              cardAlias: createUserAndCard.card.cardAlias,
              cardHolderName: createUserAndCard.card.cardHolderName,
              cardNumber: createUserAndCard.card.cardNumber,
              expireMonth: createUserAndCard.card.expireMonth,
              expireYear: createUserAndCard.card.expireYear,
              cvc: createUserAndCard.card.cvv,
            },
          },
          (err, result) => {
            if (err) {
              console.log('Hata:', err);
              reject(err);
            } else {
              console.log('Sonuç:', result);
              resolve(
                new UserCreateViewModel({
                  binNumber: result.binNumber,
                  cardAlias: result.cardAlias,
                  cardAssociation: result.cardAssociation,
                  cardBankCode: result.cardBankCode,
                  cardBankName: result.cardBankName,
                  cardFamily: result.cardFamily,
                  cardToken: result.cardToken,
                  cardType: result.cardType,
                  cardUserKey: result.cardUserKey,
                  email: result.email,
                  lastFourDigits: result.lastFourDigits,
                  status: result.status,
                }),
              );
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
