import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/global-services/database/database.service';
import { CardViewModel } from './view-model/card.vm';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import {
  CardGenerateInput,
  CardSaveInput,
  GetCardsInput,
} from './input-model/card.im';
import { CardDetailsViewModel } from './view-model/saved-cards.vm';
import { ProviderFactory } from 'src/providers/provider.factory';

@Injectable()
export class CardsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly providerFactory: ProviderFactory,
  ) {}

  // test kartlarını getirir

  async getAllTestCards(): Promise<CardViewModel[]> {
    try {
      const cards: CardViewModel[] =
        await this.databaseService.testCards.findMany();
      return cards;
    } catch (error) {
      console.log('get all card error ', error);
      return [];
    }
  }

  // kartları veritabanına kaydeder

  async saveCard(cardInput: CardSaveInput): Promise<any> {
    try {
      console.log('kaydedileck kart body ', cardInput);
      await this.databaseService.cards.create({
        data: {
          cardAlias: cardInput.card.cardAlias,
          cardNumber: cardInput.card.cardNumber,
          expireMonth: cardInput.card.expireMonth,
          expireYear: cardInput.card.expireYear,
          cardHolderName: cardInput.card.cardHolderName,
          cardUserKey: cardInput.cardUserKey,
          cardToken: cardInput.cardTokenKey,
          cardBankName: cardInput.cardBankName,
        },
      });
    } catch (error) {
      console.log('generate card error ', error);
      return [];
    }
  }

  // yeni kart oluşturur => iyzico

  async generateCard(
    providerName: string,
    cardInput: CardGenerateInput,
  ): Promise<CreateUserAndCardViewModel> {
    try {
      const provider = this.providerFactory.getCardProvider(providerName);
      console.log('GETNERATE ', cardInput);
      console.log('providers ', provider);
      const card: CreateUserAndCardViewModel =
        await provider.generateCard(cardInput);

      await this.saveCard(
        new CardSaveInput({
          card: {
            cardAlias: cardInput.card.cardAlias,
            cardHolderName: cardInput.card.cardHolderName,
            cardNumber: cardInput.card.cardNumber,
            expireMonth: cardInput.card.expireMonth,
            expireYear: cardInput.card.expireYear,
          },
          cardBankName: card.cardBankName,
          cardTokenKey: card.cardToken,
          cardUserKey: cardInput.cardUserKey,
        }),
      );
      return card;
    } catch (error) {
      console.log('generate card error ', error);
      return null;
    }
  }

  // geçerli kullanıcının kartlarını getirir => iyzico

  async getUserCards(
    providerName: string,
    getUserCardsInput: GetCardsInput,
  ): Promise<CardDetailsViewModel> {
    try {
      const provider = this.providerFactory.getCardProvider(providerName);
      const result: CardDetailsViewModel =
        await provider.getUserCards(getUserCardsInput);
      return result;
    } catch (error) {
      console.log('get user cards error ', error);
    }
  }
}
