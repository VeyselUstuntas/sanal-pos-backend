import { CardGenerateInput } from 'src/modules/cards/input-model/card.im';
import { CardDetailsViewModel } from 'src/modules/cards/view-model/saved-cards.vm';
import { UserCreateViewModel } from 'src/modules/users/view-model/user.vm';

export interface CardProvider {
  getUserCards(data: string): Promise<CardDetailsViewModel>;

  generateCard(data: CardGenerateInput): Promise<UserCreateViewModel>;
}
