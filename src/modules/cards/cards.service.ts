import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CardInput } from './input-model/card.im';
import { CardViewModel } from './view-model/card.vm';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async generateCard(cardInput: CardInput): Promise<CardViewModel[]> {
    try {
      const card: CardViewModel = await this.databaseService.testCards.create({
        data: {
          bank: cardInput.bank,
          cardNo: cardInput.cardNo,
          cardType: cardInput.cardType,
          isValid: cardInput.isValid,
        },
      });
      return [card];
    } catch (error) {
      console.log('generate card error ', error);
      return [];
    }
  }
}
