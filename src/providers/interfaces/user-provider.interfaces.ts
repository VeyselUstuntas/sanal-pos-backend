import { CreateUserAndCardInput } from 'src/modules/users/input-model/user.im';
import { UserCreateViewModel } from 'src/modules/users/view-model/user.vm';

export interface UserProvider {
  createUserAndAddCard(
    data: CreateUserAndCardInput,
  ): Promise<UserCreateViewModel>;
}
