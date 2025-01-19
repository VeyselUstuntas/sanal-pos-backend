import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { CreateUserAndCardInput, UserSaveInput } from './input-model/user.im';
import { UserCreateViewModel, UserViewModel } from './view-model/user.vm';
import { CardSaveInput } from '../cards/input-model/card.im';
import { ProviderFactory } from 'src/providers/provider.factory';
import { CardsService } from '../cards/cards.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly providerFactory: ProviderFactory,
    @Inject(forwardRef(() => CardsService))
    private readonly cardService: CardsService,
  ) {}

  // db ye kaydeder user'ı

  async saveUser(userData: UserSaveInput): Promise<UserViewModel> {
    try {
      const result: UserViewModel = await this.databaseService.user.create({
        data: {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          identityNumber: userData.identityNumber,
          phoneNumber: userData.phoneNumber,
          cardUserKey: userData.cardUserKey,
        },
      });
      return result;
    } catch (error) {
      console.log('user not save ', error);
    }
  }

  // db de ki butun user'ları getirir aynı zamanda bu user'lar iyzicodaki userlar

  async getAllUser(): Promise<UserViewModel[]> {
    try {
      const result: UserViewModel[] =
        await this.databaseService.user.findMany();
      return result;
    } catch (error) {
      console.log('user list not loaded ', error);
    }
  }

  async findUserByCardUserKey(cardUserKey: string): Promise<UserViewModel> {
    try {
      const result = await this.databaseService.user.findUnique({
        where: { cardUserKey: cardUserKey },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  // user ve onunla ilişkili card oluşturur iyzico da

  async createUserAndAddCard(
    providerName: string,
    createUserAndCard: CreateUserAndCardInput,
  ): Promise<UserCreateViewModel> {
    try {
      const provider = this.providerFactory.getUserProvider(providerName);
      const result: UserCreateViewModel =
        await provider.createUserAndAddCard(createUserAndCard);

      const savedUser = await this.saveUser(
        new UserSaveInput({
          email: createUserAndCard.user.email,
          name: createUserAndCard.user.name,
          surname: createUserAndCard.user.surname,
          phoneNumber: createUserAndCard.user.phoneNumber,
          identityNumber: uuidv4(),
          cardUserKey: result.cardUserKey,
        }),
      );
      const savedCard = await this.cardService.saveCard(
        new CardSaveInput({
          bankName: result.cardBankName,
          cardAlias: result.cardAlias,
          cardToken: result.cardToken,
          lastFourDigits: result.lastFourDigits,
          cardUserKey: result.cardUserKey,
        }),
      );

      await this.databaseService.userStoredCards.create({
        data: {
          userId: savedUser.id,
          cardId: savedCard.id,
        },
      });
      return result;
    } catch (error) {
      console.log('create user adn card error ', error);
    }
  }
}
