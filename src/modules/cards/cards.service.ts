import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/global-services/database/database.service';
import { CardViewModel } from './view-model/card.vm';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import {
  CardCreateInput,
  CardCreateStripeInput,
  GetCardsInput,
  GetCardsStripeInput,
} from './input-model/card.im';
import { CardDetailsViewModel } from './view-model/saved-cards.vm';
import { StripeService } from 'src/common/global-services/stripe/stripe.service';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

@Injectable()
export class CardsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly iyzicoService: IyzicoService,
    private readonly stripeService: StripeService,
  ) {}

  async getAllCards(): Promise<CardViewModel[]> {
    try {
      const cards: CardViewModel[] =
        await this.databaseService.testCards.findMany();
      return cards;
    } catch (error) {
      console.log('get all card error ', error);
      return [];
    }
  }

  async saveCard(cardInput: CardCreateInput): Promise<any> {
    try {
      await this.databaseService.cards.create({
        data: {
          cardAlias: cardInput.card.cardAlias,
          cardNumber: cardInput.card.cardNumber,
          expireMonth: cardInput.card.expireMonth,
          expireYear: cardInput.card.expireYear,
          cardHolderName: cardInput.card.cardHolderName,
          cardUserKey: cardInput.card.cardUserKey,
          cardToken: cardInput.card.cardTokenKey,
          cardBankName: cardInput.card.cardBankName,
        },
      });
    } catch (error) {
      console.log('generate card error ', error);
      return [];
    }
  }

  async generateCard(
    cardInput: CardCreateInput,
  ): Promise<CreateUserAndCardViewModel> {
    try {
      const card: CreateUserAndCardViewModel =
        await this.iyzicoService.generateCard(cardInput);

      await this.saveCard(
        new CardCreateInput({
          card: {
            cardAlias: card.cardAlias,
            cardNumber: cardInput.card.cardNumber,
            expireMonth: cardInput.card.expireMonth,
            expireYear: cardInput.card.expireYear,
            cardHolderName: cardInput.card.cardHolderName,
            cardUserKey: card.cardUserKey,
            cardBankName: card.cardBankName,
            cardTokenKey: card.cardToken,
          },
        }),
      );
      return card;
    } catch (error) {
      console.log('generate card error ', error);
      return null;
    }
  }

  async getUserCards(
    getUserCardsInput: GetCardsInput,
  ): Promise<CardDetailsViewModel> {
    try {
      const result: CardDetailsViewModel =
        await this.iyzicoService.getUserCards(getUserCardsInput);
      return result;
    } catch (error) {
      console.log('get user cards error ', error);
    }
  }

  // ----------------------- stripe

  async getUserCardsStripe(data: GetCardsStripeInput): Promise<any[]> {
    try {
      const cards = await this.stripeService.getUserCards(data);
      return cards;
    } catch (error) {
      console.log('Kartları getirme hatası:', error);
      throw new Error('Kartlar getirilemedi.');
    }
  }

  async saveCardStripe(cardInput: CardCreateStripeInput): Promise<any> {
    try {
      const paymentMethod = await this.stripeService.saveCard(cardInput);

      return paymentMethod;
    } catch (error) {
      console.log('Kart kaydetme hatası:', error);
      throw new BadRequestException(
        new BaseResponse({
          data: error,
          message: ResponseMessages.BAD_REQUEST,
          success: false,
        }),
      );
    }
  }
}
