import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/global-services/database/database.service';
import { UserSaveInput } from './input-model/user.im';
import { UserViewModel } from './view-model/user.vm';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

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
}
