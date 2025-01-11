import { CreatePaymentInput } from '../input-model/create-payment.im';

export interface PaymentGateway {
  createPayment(createPayment: CreatePaymentInput): Promise<any>;
}
