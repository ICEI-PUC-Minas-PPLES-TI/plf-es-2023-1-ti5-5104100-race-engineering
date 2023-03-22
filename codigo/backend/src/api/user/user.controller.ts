import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { IRequest, UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Put('name')
  @ApiBody({ type: UpdateNameDto })
  @ApiOkResponse({ description: 'The user name was updated successfully' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(
    @Body() body: UpdateNameDto,
    @Req() req: IRequest,
  ): Promise<User> {
    return this.service.updateName(body, req);
  }
}
