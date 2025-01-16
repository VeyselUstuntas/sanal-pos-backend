import { Injectable } from '@nestjs/common';
import { generateJWKSignature } from './securityHashV2';
import { getGUID, headers, serviceEndpoint } from './common_lib';
import axios from 'axios';
import { PaymentProvider } from 'src/providers/interfaces/payment-provider.interfaces';
import { TamiPaymentRequest } from 'src/modules/payment/input-model/create-paymnet-tami.im';
import { UnifiedPaymentRequest } from 'src/modules/payment/input-model/create-payment.im';

@Injectable()
export class TamiService implements PaymentProvider {
  async createPayment(data: UnifiedPaymentRequest) {
    const body: TamiPaymentRequest = new TamiPaymentRequest({
      currency: data.currency,
      installmentCount: data.installmentCount,
      paymentGroup: data.paymentGroup,
      card: {
        cvv: data.card.cvv,
        expireMonth: data.card.expireMonth,
        expireYear: data.card.expireYear,
        holderName: data.card.holderName,
        number: data.card.number,
      },
      buyer: {
        buyerId: data.buyer.buyerId,
        ipAddress: data.buyer.ipAddress,
        name: data.buyer.name,
        surName: data.buyer.surName,
        emailAddress: data.buyer.emailAddress,
        phoneNumber: data.buyer.phoneNumber,
      },
      orderId: getGUID(),
      amount: data.amount,
    });

    // JWT Signature oluşturuluyor
    const securityHash = generateJWKSignature(JSON.stringify(body));
    body.securityHash = securityHash;

    try {
      console.log('reqBody ', body);
      const response = await axios.post(
        `${serviceEndpoint}/payment/auth`,
        body,
        { headers },
      );
      console.log('Response Data:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Hata: ', error.response.status);
        console.error('Sunucu Yanıtı: ', error.response.data);
      } else if (error.request) {
        console.error(
          'İstek yapıldı, ancak sunucudan yanıt alınamadı:',
          error.request,
        );
      } else {
        console.error('Hata: ', error.message);
      }
    }
  }
}
