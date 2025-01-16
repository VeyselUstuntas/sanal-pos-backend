import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { UserSaveInput } from './input-model/user.im';
import { UserViewModel } from './view-model/user.vm';
import { CardSaveInput } from '../cards/input-model/card.im';
import { CreateUserAndCardInput } from '../cards/input-model/card-and-user-create.im';
import { CreateUserAndCardViewModel } from '../cards/view-model/card-and-user-create.vm';
import { CardsService } from '../cards/cards.service';
import { ProviderFactory } from 'src/providers/provider.factory';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cardService: CardsService,
    private readonly providerFactory: ProviderFactory,
  ) {}

  async saveUser(userData: UserSaveInput) {
    try {
      await this.databaseService.user.create({
        data: {
          email: userData.email,
          cardUserKey: userData.cardUserKey,
        },
      });
    } catch (error) {
      console.log('user not save ', error);
    }
  }

  async getAllUser(): Promise<UserViewModel[]> {
    try {
      const result: UserViewModel[] =
        await this.databaseService.user.findMany();
      return result;
    } catch (error) {
      console.log('user list not loaded ', error);
    }
  }

  async createUserAndAddCard(
    providerName: string,
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<CreateUserAndCardViewModel> {
    try {
      const provider = this.providerFactory.getUserProvider(providerName);
      const result: CreateUserAndCardViewModel =
        await provider.createUserAndAddCard(createUserAndCard);

      await this.saveUser(
        new UserSaveInput({
          email: result.email,
          cardUserKey: result.cardUserKey,
        }),
      );

      await this.cardService.saveCard(
        new CardSaveInput({
          card: {
            cardAlias: result.cardAlias,
            cardNumber: createUserAndCard.card.cardNumber,
            expireMonth: createUserAndCard.card.expireMonth,
            expireYear: createUserAndCard.card.expireYear,
            cardHolderName: createUserAndCard.card.cardHolderName,
          },
          cardBankName: result.cardBankName,
          cardTokenKey: result.cardToken,
          cardUserKey: result.cardUserKey,
        }),
      );
      return result;
    } catch (error) {
      console.log('create user adn card error ', error);
    }
  }
}
