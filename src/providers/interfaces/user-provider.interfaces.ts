export interface UserProvider {
  createUserAndAddCard(data: any): Promise<any>;
}
