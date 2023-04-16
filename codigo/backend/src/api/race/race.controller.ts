import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RaceService } from './race.service';
import { CreateRaceDTO, UpdateRaceDto } from './models/race.dto';
import { UserService } from '@/api/user/user.service';
import { Race } from '@/api/race/models/race.entity';
import { JwtGuard } from '@/api/user/auth/guards/auth.guard';
import { RoleGuard } from '@/api/user/auth/guards/role.guard';
import { Roles } from '@/api/user/auth/decorators/role.decorator';
import { Role, User } from '@/api/user/models/user.entity';
import { CurrentUser } from '@/api/user/auth/decorators/user.decorator';

@Controller('races')
@ApiTags('Races')
export class RaceController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(RaceService)
  private readonly raceService: RaceService;

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  @ApiBody({ type: CreateRaceDTO })
  @ApiOkResponse({ description: 'The race was created successfully' })
  @ApiNotFoundResponse({ description: 'The driver or mechanic does not exist' })
  @UseInterceptors(ClassSerializerInterceptor)
  private create(@Body() createRaceDto: CreateRaceDTO): Promise<Race> {
    return this.raceService.createRace(createRaceDto);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.raceService.findOneRace(+id);
  }

  @Get()
  @UseGuards(JwtGuard)
  private findAll(@CurrentUser() user: User) {
    return this.raceService.findAllRaces(user);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.updateRace(+id, updateRaceDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.raceService.removeRace(+id);
  }
}
