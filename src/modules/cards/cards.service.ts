import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/global-services/database/database.service';
import { CardViewModel } from './view-model/card.vm';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { CreateUserAndCardInput } from './input-model/card-and-user-create.im';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import { UsersService } from '../users/users.service';
import { UserSaveInput } from '../users/input-model/user.im';
import { CardCreateInput, GetCardsInput } from './input-model/card.im';
import { CardDetailsViewModel } from './view-model/saved-cards.vm';

@Injectable()
export class CardsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly iyzicoService: IyzicoService,
    private readonly userService: UsersService,
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

  async createUserAndAddCard(
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<CreateUserAndCardViewModel> {
    try {
      const result: CreateUserAndCardViewModel =
        await this.iyzicoService.createUserAndAddCard(createUserAndCard);
      console.log('bkaalim ', result);

      await this.userService.saveUser(
        new UserSaveInput({
          email: result.email,
          cardUserKey: result.cardUserKey,
        }),
      );

      await this.saveCard(
        new CardCreateInput({
          card: {
            cardAlias: result.cardAlias,
            cardNumber: createUserAndCard.card.cardNumber,
            expireMonth: createUserAndCard.card.expireMonth,
            expireYear: createUserAndCard.card.expireYear,
            cardHolderName: createUserAndCard.card.cardHolderName,
            cardUserKey: result.cardUserKey,
            cardBankName: result.cardBankName,
            cardTokenKey: result.cardToken,
          },
        }),
      );
      return result;
    } catch (error) {
      console.log('create user adn card error ', error);
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
}
