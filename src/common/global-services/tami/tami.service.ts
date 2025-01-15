import { Injectable } from '@nestjs/common';
import { generateJWKSignature } from './securityHashV2';
import { getGUID, headers, serviceEndpoint } from './common_lib';
import axios from 'axios';
import { PaymentInputTami } from 'src/modules/payment/input-model/create-payment.im';

@Injectable()
export class TamiService {
  async createPayment(body: PaymentInputTami) {
    body.orderId = getGUID();
    body.installmentCount = 1;
    body.currency = 'TRY';

    // JWT Signature oluşturuluyor
    const securityHash = generateJWKSignature(JSON.stringify(body));
    body.securityHash = securityHash;

    try {
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
