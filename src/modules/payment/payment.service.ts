import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './input-model/create-payment.im';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { StripeService } from 'src/common/global-services/stripe/stripe.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(
    private readonly iyzicoService: IyzicoService,
    private readonly stripeService: StripeService,
  ) {}

  async createPayment(createPayment: CreatePaymentInput): Promise<any> {
    try {
      const result = await this.iyzicoService.createPayment(createPayment);

      return new Promise((resolve, reject) => {
        if (result?.status === 'success') {
          resolve(result);
        } else {
          reject(new Error('Ödeme oluşturma başarısız.'));
        }
      });
    } catch (error) {
      console.log('create payment error:', error);
      throw new Error('Ödeme işlemi sırasında bir hata oluştu.');
    }
  }

  async createPaymentStripe(): Promise<Stripe.PaymentIntent | string> {
    try {
      const result = await this.stripeService.createPayment();

      if (typeof result === 'string') {
        throw new Error(result);
      }

      return result;
    } catch (error) {
      console.log('create payment error:', error);
      throw new Error('Ödeme işlemi sırasında bir hata oluştu.');
    }
  }
}
