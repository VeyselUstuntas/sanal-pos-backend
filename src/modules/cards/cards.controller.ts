import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardGenerateInput } from './input-model/card.im';
import { CardDetails, CardDetailsViewModel } from './view-model/saved-cards.vm';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

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
  ): Promise<BaseResponse<CardDetails>> {
    const card = await this.cardService.generateCard(providerName, cardInput);
    return new BaseResponse<CardDetails>({
      data: card,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Get('get-user-cards/:userCardKey')
  @ApiOperation({
    summary: 'kullanıcının Iyzico daki bütün kayıtlı kartlarını döndürür ',
  })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  async getUserCards(
    @Query('providerName') providerName: string,
    @Param('userCardKey') userCardKey: string,
  ): Promise<BaseResponse<CardDetailsViewModel>> {
    const result = await this.cardService.getUserCards(
      providerName,
      userCardKey,
    );
    return new BaseResponse<CardDetailsViewModel>({
      data: new CardDetailsViewModel({
        cardDetails: result.cardDetails.map((cardDetail) => {
          return new CardDetails({
            cardAlias: cardDetail.cardAlias,
            cardBankName: cardDetail.cardBankName,
            cardToken: cardDetail.cardToken,
            lastFourDigits: cardDetail.lastFourDigits,
          });
        }),
        cardUserKey: result.cardUserKey,
      }),
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Get('get-current-user-cards/:userCardKey')
  @ApiOperation({
    summary:
      'kullanıcının veritabanındaki daki bütün kayıtlı kartlarını döndürür ',
  })
  async fetchUserCardsLocalStorage(
    @Param('userCardKey') userCardKey: string,
  ): Promise<BaseResponse<CardDetails[]>> {
    const result: CardDetails[] =
      await this.cardService.fetchUserCardsLocalStorage(userCardKey);
    return new BaseResponse<CardDetails[]>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
