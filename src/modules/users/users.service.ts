import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { UserSaveInput } from './input-model/user.im';
import { UserViewModel } from './view-model/user.vm';
import { CardCreateInput } from '../cards/input-model/card.im';
import { IyzicoService } from 'src/common/global-services/iyzico/iyzico.service';
import { CreateUserAndCardInput } from '../cards/input-model/card-and-user-create.im';
import { CreateUserAndCardViewModel } from '../cards/view-model/card-and-user-create.vm';
import { CardsService } from '../cards/cards.service';
import { StripeService } from 'src/common/global-services/stripe/stripe.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly iyzicoService: IyzicoService,
    private readonly cardService: CardsService,
    private readonly stripeService: StripeService,
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
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<CreateUserAndCardViewModel> {
    try {
      const result: CreateUserAndCardViewModel =
        await this.iyzicoService.createUserAndAddCard(createUserAndCard);

      await this.saveUser(
        new UserSaveInput({
          email: result.email,
          cardUserKey: result.cardUserKey,
        }),
      );

      await this.cardService.saveCard(
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

  async createCustomerStripe(email: string) {
    try {
      const result = await this.stripeService.createCustomer(email);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
