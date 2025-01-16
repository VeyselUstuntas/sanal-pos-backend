import { CardGenerateInput } from 'src/modules/cards/input-model/card.im';

export interface CardProvider {
  getUserCards(data: any): Promise<any>;

  generateCard(data: CardGenerateInput): Promise<any>;
}
