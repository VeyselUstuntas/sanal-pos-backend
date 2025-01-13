import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardViewModel } from './view-model/card.vm';
import { CreateUserAndCardInput } from './input-model/card-and-user-create.im';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import { CardCreateInput, GetCardsInput } from './input-model/card.im';
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

  @Post('user-and-card-generate')
  @ApiOperation({ summary: "Create user and user's card" })
  async createUserAndCard(
    @Body() userAndCardData: CreateUserAndCardInput,
  ): Promise<BaseResponse<CreateUserAndCardViewModel>> {
    const result = await this.cardService.createUserAndAddCard(userAndCardData);
    return new BaseResponse<CreateUserAndCardViewModel>({
      data: result,
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
}
