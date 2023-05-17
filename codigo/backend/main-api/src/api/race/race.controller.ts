import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Inject,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RaceService } from './race.service';
import {
  CreateRaceDTO,
  RaceSearchParams,
  UpdateRaceDto,
} from './models/race.dto';
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

  @Post()
  @ApiOperation({ summary: 'Create a new race' })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: CreateRaceDTO })
  @ApiOkResponse({ description: 'The race was created successfully' })
  @ApiNotFoundResponse({ description: 'The driver or mechanic does not exist' })
  private create(@Body() createRaceDto: CreateRaceDTO): Promise<Race> {
    return this.raceService.createRace(createRaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'List races' })
  @UseGuards(JwtGuard)
  private findAll(
    @CurrentUser() user: User,
    @Query() searchParams: RaceSearchParams,
  ) {
    return this.raceService.findAllRaces(user, searchParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one race' })
  private findOne(@Param('id') id: string) {
    return this.raceService.findOneRace(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit one race' })
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.updateRace(+id, updateRaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove one race' })
  remove(@Param('id') id: string) {
    return this.raceService.removeRace(+id);
  }

  @Post(':id/set-main')
  @ApiOperation({ summary: 'Set a race as main-race (analyst only)' })
  @Roles(Role.Analyst)
  @UseGuards(JwtGuard, RoleGuard)
  private async setMain(@Param('id') id: string, @CurrentUser() user: User) {
    const race = await this.raceService.findOneRace(+id);
    return this.userService.setAnalystMainRace(race, user.id);
  }

  @Get('driver/:id')
  @ApiOperation({ summary: 'List races by driver' })
  findByDriver(@Param('id') id: string) {
    return this.raceService.findByDriver(+id);
  }
}
