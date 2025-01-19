import { UnifiedPaymentRequest } from 'src/common/models/payment/input-model/create-payment.im';
import {
  InitialThreeDSViewModel,
  Verify3DSViewModel,
} from 'src/common/models/payment/view-model/threeDSecure.vm';

export interface Payment3DSProvider {
  threedsInitialize?(
    data: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel>;

  threedsInitializeWithSavedCard?(
    data: UnifiedPaymentRequest,
  ): Promise<InitialThreeDSViewModel>;

  verifyThreeDSayment?(data: string): Promise<Verify3DSViewModel>;
}
