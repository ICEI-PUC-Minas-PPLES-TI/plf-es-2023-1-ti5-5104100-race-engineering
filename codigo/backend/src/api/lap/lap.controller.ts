import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { LapService } from './lap.service';
import { CreateLapDto, UpdateLapDto } from './models/lap.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('races/:raceId/laps')
@ApiTags('Laps')
export class LapController {
  @Inject(LapService)
  private readonly lapService: LapService;

  @Post()
  createLap(
    @Param('raceId') raceId: string,
    @Body() createLapDto: CreateLapDto,
  ) {
    return this.lapService.createLap(+raceId, createLapDto);
  }

  @Get()
  findByRace(@Param('raceId') raceId: string) {
    return this.lapService.findByRaceId(+raceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lapService.findOneDetailed(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLapDto: UpdateLapDto) {
    return this.lapService.update(+id, updateLapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lapService.remove(+id);
  }
}
