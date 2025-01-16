import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardViewModel } from './view-model/card.vm';
import { CreateUserAndCardViewModel } from './view-model/card-and-user-create.vm';
import { CardGenerateInput, GetCardsInput } from './input-model/card.im';
import { CardDetailsViewModel } from './view-model/saved-cards.vm';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all the test cards' })
  @ApiResponse({ description: 'Kart Şablonu', type: [CardViewModel] })
  async getAllTestCards(): Promise<BaseResponse<CardViewModel[]>> {
    const cards: CardViewModel[] = await this.cardService.getAllTestCards();
    return new BaseResponse<CardViewModel[]>({
      data: cards,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('card-generate')
  @ApiOperation({ summary: 'Create card for current user' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  async generateCard(
    @Query('providerName') providerName: string,
    @Body() cardInput: CardGenerateInput,
  ): Promise<BaseResponse<CreateUserAndCardViewModel>> {
    const card = await this.cardService.generateCard(providerName, cardInput);
    return new BaseResponse<CreateUserAndCardViewModel>({
      data: card,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('get-user-cards')
  @ApiOperation({ summary: 'Fetch all cards of current user' })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  async getUserCards(
    @Query('providerName') providerName: string,
    @Body() userCardsInput: GetCardsInput,
  ): Promise<BaseResponse<CardDetailsViewModel>> {
    const result = await this.cardService.getUserCards(
      providerName,
      userCardsInput,
    );
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
