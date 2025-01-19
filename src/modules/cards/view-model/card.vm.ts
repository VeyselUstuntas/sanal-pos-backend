export class CardViewModel {
  id: number;
  cardToken: string;
  cardUserKey: string;
  lastFourDigits: string;
  bankName: string;
  cardAlias: string;
  createdAt: Date;
  updatedAt: Date | null;
}
