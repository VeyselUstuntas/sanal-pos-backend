import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/base/response/base.response';
import { UsersService } from './users.service';
import { UserViewModel } from './view-model/user.vm';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

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
}
