import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { UsersService } from './users.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { CreateUserAndCardInput } from './input-model/user.im';
import { UserCreateViewModel, UserViewModel } from './view-model/user.vm';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('get-all-user')
  @ApiOperation({ summary: 'Get All User' })
  @ApiResponse({ type: [UserViewModel] })
  async getAllUser(): Promise<BaseResponse<UserViewModel[]>> {
    const result: UserViewModel[] = await this.userService.getAllUser();
    const userList: UserViewModel[] = [];
    result.forEach((user) => {
      userList.push({
        id: user.id,
        email: user.email,
        cardUserKey: user.cardUserKey,
        identityNumber: user.identityNumber,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
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
  @ApiResponse({ type: UserCreateViewModel })
  async createUserAndCard(
    @Query('providerName') providerName: string,
    @Body() userAndCardData: CreateUserAndCardInput,
  ): Promise<BaseResponse<UserCreateViewModel>> {
    const result = await this.userService.createUserAndAddCard(
      providerName,
      userAndCardData,
    );
    return new BaseResponse<UserCreateViewModel>({
      data: result,
      message: ResponseMessages.SUCCESS,
      success: true,
    });
  }
}
