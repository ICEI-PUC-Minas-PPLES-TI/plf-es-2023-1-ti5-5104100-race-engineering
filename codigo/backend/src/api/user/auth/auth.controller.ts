import {
  Body,
  Controller,
  Inject,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from '@/api/user/models/user.entity';
import { RegisterDto, LoginDto } from './models/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IRequest } from '@/api/user/models/user.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthResponse } from '@/api/user/auth/models/auth.interface';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    type: User,
    description: 'The user was registered successfully',
  })
  @ApiConflictResponse({ description: 'Conflict: The email is already in use' })
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthResponse })
  @ApiNotFoundResponse({ description: 'Invalid email or password' })
  private login(@Body() body: LoginDto): Promise<AuthResponse | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: AuthResponse })
  private refresh(@Req() { user }: IRequest): Promise<AuthResponse | never> {
    return this.service.refresh(<User>user);
  }
}
