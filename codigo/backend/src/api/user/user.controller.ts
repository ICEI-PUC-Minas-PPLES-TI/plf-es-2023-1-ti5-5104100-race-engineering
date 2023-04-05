import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { IRequest, ListedUser, UpdateNameDto } from './models/user.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
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

  @Get('drivers')
  @ApiResponse({ type: [ListedUser], description: 'Successful operation' })
  async listDrivers(): Promise<ListedUser[]> {
    return this.service.listDrivers();
  }

  @Get('mechanics')
  @ApiResponse({ type: [ListedUser], description: 'Successful operation' })
  async listMechanics(): Promise<ListedUser[]> {
    return await this.service.listMechanics();
  }

  @Get('analysts')
  @ApiResponse({ type: [ListedUser], description: 'Successful operation' })
  async listAnalysts(): Promise<ListedUser[]> {
    return await this.service.listAnalysts();
  }
}
