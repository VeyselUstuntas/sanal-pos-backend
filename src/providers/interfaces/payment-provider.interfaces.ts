import { UnifiedPaymentRequest } from 'src/modules/payment/input-model/create-payment.im';

export interface PaymentProvider {
  createPayment(data: UnifiedPaymentRequest): Promise<any>;

  threedsInitialize?(data: UnifiedPaymentRequest): Promise<any>;

  verifyThreeDSayment?(data: any): Promise<any>;
}
