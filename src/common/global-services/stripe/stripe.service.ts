import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SK_TEST);
  }

  async createPayment(): Promise<Stripe.PaymentIntent | string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });
      const confirmResult = this.confirmPayment(paymentIntent.id);
      return confirmResult;
    } catch (error) {
      console.log('stripe create paymnet err ', error);
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
}
