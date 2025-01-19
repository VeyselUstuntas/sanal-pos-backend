import { UnifiedPaymentRequest } from 'src/common/models/payment/input-model/create-payment.im';
import { CreatePaymentViewModel } from 'src/common/models/payment/view-model/create-payment.vm';

export interface PaymentProvider {
  createPayment(data: UnifiedPaymentRequest): Promise<CreatePaymentViewModel>;

  createPaymentWithStoredCard?(
    data: UnifiedPaymentRequest,
  ): Promise<CreatePaymentViewModel>;
}
