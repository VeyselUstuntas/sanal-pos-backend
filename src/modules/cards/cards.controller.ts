import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardViewModel } from './view-model/card.vm';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import {
  CardCreateInput,
  CardCreateStripeInput,
  GetCardsInput,
  GetCardsStripeInput,
} from './input-model/card.im';
import { CardDetailsViewModel } from './view-model/saved-cards.vm';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all the test cards' })
  @ApiResponse({ description: 'Kart Şablonu', type: [CardViewModel] })
  async getAllCards(): Promise<BaseResponse<CardViewModel[]>> {
    const cards: CardViewModel[] = await this.cardService.getAllCards();
    return new BaseResponse<CardViewModel[]>({
      data: cards,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('card-generate')
  @ApiOperation({ summary: 'Create card for current user' })
  async generateCard(
    @Body() cardInput: CardCreateInput,
  ): Promise<BaseResponse<CreateUserAndCardViewModel>> {
    const card = await this.cardService.generateCard(cardInput);
    return new BaseResponse<CreateUserAndCardViewModel>({
      data: card,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('get-user-cards')
  @ApiOperation({ summary: 'Fetch all cards of current user' })
  async getUserCards(
    @Body() userCardsInput: GetCardsInput,
  ): Promise<BaseResponse<CardDetailsViewModel>> {
    const result = await this.cardService.getUserCards(userCardsInput);
    return new BaseResponse<CardDetailsViewModel>({
      data: new CardDetailsViewModel({
        status: result.status,
        locale: result.locale,
        systemTime: result.systemTime,
        conversationId: result.conversationId,
        cardUserKey: result.cardUserKey,
        cardDetails: result.cardDetails,
      }),
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  // -------------------

  @Post('get-user-card-stripe')
  @ApiOperation({ summary: 'get user cards stripe' })
  async getUserCardsStripe(@Body() data: GetCardsStripeInput): Promise<any[]> {
    const result = await this.cardService.getUserCardsStripe(data);
    return result;
  }

  @Post('generate-user-card-stripe')
  @ApiOperation({ summary: 'generate user card stripe' })
  async saveCardStripe(@Body() data: CardCreateStripeInput): Promise<any[]> {
    const result = await this.cardService.saveCardStripe(data);
    return result;
  }
}
