import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/global-services/database/database.service';
import { CardGenerateInput, CardSaveInput } from './input-model/card.im';
import { CardDetails, CardDetailsViewModel } from './view-model/saved-cards.vm';
import { ProviderFactory } from 'src/providers/provider.factory';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardProvider } from 'src/providers/interfaces/card-provider.interfaces';
import { CardViewModel } from './view-model/card.vm';

@Injectable()
export class CardsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly providerFactory: ProviderFactory,
  ) {}

  // kartları veritabanına kaydeder

  async saveCard(cardInput: CardSaveInput): Promise<CardViewModel> {
    try {
      const result: CardViewModel =
        await this.databaseService.storedCards.create({
          data: {
            bankName: cardInput.bankName,
            cardAlias: cardInput.cardAlias,
            cardToken: cardInput.cardToken,
            lastFourDigits: cardInput.lastFourDigits,
            cardUserKey: cardInput.cardUserKey,
            userId: cardInput.userId,
          },
        });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // yeni kart oluşturur => iyzico

  async generateCard(
    providerName: string,
    cardInput: CardGenerateInput,
  ): Promise<CardDetails> {
    try {
      const provider = this.providerFactory.getCardProvider(providerName);
      const card: CardDetails = await provider.generateCard(cardInput);

      await this.saveCard(
        new CardSaveInput({
          bankName: card.cardBankName,
          cardAlias: card.cardAlias,
          cardToken: card.cardToken,
          lastFourDigits: card.lastFourDigits,
          cardUserKey: cardInput.cardUserKey,
          userId: cardInput.userId,
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
    userCardKey: string,
  ): Promise<CardDetailsViewModel> {
    try {
      const provider: CardProvider =
        this.providerFactory.getCardProvider(providerName);
      const result: CardDetailsViewModel =
        await provider.getUserCards(userCardKey);
      return result;
    } catch (error) {
      console.log('get user cards error ', error);
    }
  }

  async fetchUserCardsLocalStorage(
    cardUserKey: string,
  ): Promise<CardDetails[]> {
    try {
      const result = await this.databaseService.storedCards.findMany({
        where: { cardUserKey: cardUserKey },
      });

      const cardList: CardDetails[] = [];
      result.forEach((card) => {
        cardList.push(
          new CardDetails({
            cardToken: card.cardToken,
            cardAlias: card.cardAlias,
            cardBankName: card.bankName,
            lastFourDigits: card.lastFourDigits,
          }),
        );
      });
      return cardList;
    } catch (err: any) {
      console.log(err);
      throw new BadRequestException(ResponseMessages.BAD_REQUEST);
    }
  }
}
