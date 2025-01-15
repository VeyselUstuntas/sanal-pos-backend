import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import {
  CardCreateStripeInput,
  GetCardsStripeInput,
} from 'src/modules/cards/input-model/card.im';
import { CreatePaymentStripeInput } from 'src/modules/payment/input-model/create-payment.im';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK_TEST);
  }

  async createPayment(createPayment: CreatePaymentStripeInput): Promise<any> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(createPayment.price * 100),
        currency: createPayment.currency,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        metadata: {
          basket_id: createPayment.basketId,
          buyer_id: createPayment.buyer.id,
        },
      });
      const paymentResult = await this.confirmPayment(paymentIntent.id);

      return paymentResult;
    } catch (error) {
      console.error('Stripe ödeme oluşturma başarısız:', error);
      throw new Error('Ödeme oluşturma başarısız oldu');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(
        paymentIntentId,
        {
          payment_method: 'pm_card_visa',
        },
      );

      return paymentIntent;
    } catch (error) {
      console.error('PaymentIntent onaylama hatası:', error);
      throw new Error('PaymentIntent onaylanamadı.');
    }
  }

  async saveCard(cardInput: CardCreateStripeInput): Promise<Stripe.Card> {
    try {
      const token = await this.stripe.tokens.create({
        card: {
          number: cardInput.card.cardNumber,
          exp_month: cardInput.card.expireMonth,
          exp_year: cardInput.card.expireYear,
          cvc: cardInput.cvc,
          name: cardInput.card.cardHolderName,
        },
      });

      const source = await this.stripe.customers.createSource(
        cardInput.customerId,
        {
          source: token.id,
        },
      );

      await this.stripe.customers.update(cardInput.customerId, {
        default_source: source.id,
      });

      return source as Stripe.Card;
    } catch (error) {
      console.error('Kart kaydetme hatası:', error.message || error);
      throw new BadRequestException(
        new BaseResponse({
          data: error.message,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }

  async getUserCards(customerData: GetCardsStripeInput): Promise<any[]> {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerData.customer,
        type: 'card',
      });
      return paymentMethods.data;
    } catch (error) {
      console.error('Kartları getirme hatası:', error.message || error);
      throw new Error('Kartlar getirilemedi.');
    }
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      email: email,
    });
  }
}
