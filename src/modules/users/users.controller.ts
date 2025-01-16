import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { UsersService } from './users.service';
import { UserViewModel } from './view-model/user.vm';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CreateUserAndCardViewModel } from '../cards/view-model/card-and-user-create.vm';
import { CreateUserAndCardInput } from '../cards/input-model/card-and-user-create.im';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get All User' })
  async getAllUser(): Promise<BaseResponse<UserViewModel[]>> {
    const result: UserViewModel[] = await this.userService.getAllUser();
    const userList: UserViewModel[] = [];
    result.forEach((user) => {
      userList.push({
        id: user.id,
        email: user.email,
        cardUserKey: user.cardUserKey,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    });
    return new BaseResponse<UserViewModel[]>({
      data: userList,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }

  @Post('user-and-card-generate')
  @ApiOperation({ summary: "Create user and user's card" })
  @ApiQuery({
    name: 'providerName',
    description: 'Provider name',
    required: true,
    enum: ['iyzico'],
  })
  async createUserAndCard(
    @Query('providerName') providerName: string,
    @Body() userAndCardData: CreateUserAndCardInput,
  ): Promise<BaseResponse<CreateUserAndCardViewModel>> {
    const result = await this.userService.createUserAndAddCard(
      providerName,
      userAndCardData,
    );
    return new BaseResponse<CreateUserAndCardViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
