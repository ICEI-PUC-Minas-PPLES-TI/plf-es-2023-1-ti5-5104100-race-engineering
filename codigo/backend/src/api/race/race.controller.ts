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
} from '@nestjs/common';
import { RaceService } from './race.service';
import { CreateRaceDTO, UpdateRaceDto } from './models/race.dto';
import { UserService } from '@/api/user/user.service';
import { Race } from '@/api/race/models/race.entity';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('race')
export class RaceController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(RaceService)
  private readonly raceService: RaceService;

  @Post()
  @ApiBody({ type: CreateRaceDTO })
  @ApiOkResponse({ description: 'The race was created successfully' })
  @UseInterceptors(ClassSerializerInterceptor)
  private create(@Body() createRaceDto: CreateRaceDTO): Promise<Race | never> {
    return this.raceService.create(createRaceDto);
  }

  @Get()
  findAll() {
    return this.raceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id);
  }
}
