import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { RaceService } from './race.service';
import { CreateRaceDTO, UpdateRaceDto } from './models/race.dto';
import { UserService } from '@/api/user/user.service';
import { Race } from '@/api/race/models/race.entity';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('races')
@ApiTags('Races')
export class RaceController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(RaceService)
  private readonly raceService: RaceService;

  @Post()
  @ApiBody({ type: CreateRaceDTO })
  @ApiOkResponse({ description: 'The race was created successfully' })
  @ApiNotFoundResponse({ description: 'The driver or mechanic does not exist' })
  @UseInterceptors(ClassSerializerInterceptor)
  private create(@Body() createRaceDto: CreateRaceDTO): Promise<Race> {
    return this.raceService.createRace(createRaceDto);
  }

  @Get()
  findAll() {
    return this.raceService.findAllRaces();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOneRace(+id);
  }

  @Get('driver/:id')
  public async findByDriver(@Query('id') id: number): Promise<Race[]> {
    return this.raceService.findByDriver(id);
  }

  @Get('mechanic/:id')
  public async findByMechanic(@Query('id') id: number): Promise<Race[]> {
    return this.raceService.findByMechanic(id);
  }

  @Get('analyst/:id')
  public async findByAnalyst(@Query('id') id: number): Promise<Race[]> {
    return this.raceService.findByAnalyst(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.updateRace(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.removeRace(+id);
  }
}
