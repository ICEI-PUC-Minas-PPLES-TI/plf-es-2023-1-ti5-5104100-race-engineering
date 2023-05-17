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
import { IRequest, ListedUser, UpdateNameDto } from './models/user.dto';
import { Role, User } from './models/user.entity';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from '@/api/user/auth/decorators/role.decorator';
import { JwtGuard } from '@/api/user/auth/guards/auth.guard';
import { RoleGuard } from '@/api/user/auth/guards/role.guard';
import { CurrentUser } from '@/api/user/auth/decorators/user.decorator';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @UseGuards(JwtGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get the current user profile' })
  @ApiResponse({ type: User, description: 'Successful operation' })
  async getMe(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Put('profile/edit')
  @ApiOperation({ summary: 'Edit the current user profile' })
  @ApiBody({ type: UpdateNameDto })
  @ApiOkResponse({ description: 'The user name was updated successfully' })
  @UseInterceptors(ClassSerializerInterceptor)
  private updateUser(
    @Body() body: UpdateNameDto,
    @Req() req: IRequest,
  ): Promise<User> {
    return this.service.updateUser(body, req);
  }

  @Get('mechanics')
  @ApiOperation({ summary: 'List all Mechanics' })
  @Roles(Role.Admin, Role.Mechanic)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiResponse({ type: [ListedUser], description: 'Successful operation' })
  async listMechanics(): Promise<ListedUser[]> {
    return await this.service.listMechanics();
  }

  @Get('analysts')
  @ApiOperation({ summary: 'List all Analysts' })
  @Roles(Role.Admin, Role.Analyst)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiResponse({ type: [ListedUser], description: 'Successful operation' })
  async listAnalysts(): Promise<ListedUser[]> {
    return await this.service.listAnalysts();
  }
}