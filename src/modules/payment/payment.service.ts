import { Injectable } from '@nestjs/common';
import { CreatePaymentInput } from './input-model/create-payment.im';

@Injectable()
export class PaymentService {
  constructor(private readonly iyzicoService: unknown) {}

  async createPayment(createPayment: CreatePaymentInput): Promise<void> {
    try {
    } catch (error) {
      console.log('create payment error ', error);
      return null;
    }
  }
}
