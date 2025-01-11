import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { CardInput } from './input-model/card.im';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CardViewModel } from './view-model/card.vm';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all test cards' })
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
  @ApiOperation({ summary: 'Card Generate' })
  async generateCard(
    @Body() cardInput: CardInput,
  ): Promise<BaseResponse<CardViewModel[]>> {
    const card = await this.cardService.generateCard(cardInput);
    return new BaseResponse<CardViewModel[]>({
      data: card,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
