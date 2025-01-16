import { BadRequestException, Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { TamiService } from 'src/common/global-services/tami/tami.service';
import { PaymentProvider } from './interfaces/payment-provider.interfaces';
import { CardProvider } from './interfaces/card-provider.interfaces';
import { UserProvider } from './interfaces/user-provider.interfaces';

@Injectable()
export class ProviderFactory {
  constructor(
    private readonly iyzicoService: IyzicoService,
    private readonly tamiService: TamiService,
  ) {}

  getCardProvider(cardProviderName: string): CardProvider {
    switch (cardProviderName) {
      case 'iyzico': {
        return this.iyzicoService;
      }
      default:
        throw new BadRequestException(
          ResponseMessages.INVALID_CARD_PROVIDER_NAME,
        );
    }
  }

  getPaymentProvider(paymentProviderName: string): PaymentProvider {
    switch (paymentProviderName) {
      case 'iyzico': {
        return this.iyzicoService;
      }
      case 'tami': {
        return this.tamiService;
      }
      default:
        throw new BadRequestException(
          ResponseMessages.INVALID_PAYMENT_PROVIDER_NAME,
        );
    }
  }

  getUserProvider(userProviderName: string): UserProvider {
    switch (userProviderName) {
      case 'iyzico': {
        return this.iyzicoService;
      }
      default:
        throw new BadRequestException(
          ResponseMessages.INVALID_USER_PROVIDER_NAME,
        );
    }
  }
}
