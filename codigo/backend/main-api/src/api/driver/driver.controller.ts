import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDTO } from './models/driver.dto';
import { ApiTags } from '@nestjs/swagger';
import { LapService } from '@/api/lap/lap.service';

@Controller('drivers')
@ApiTags('Drivers')
export class DriverController {
  @Inject(DriverService)
  private readonly driverService: DriverService;
  @Inject(LapService)
  private readonly lapService: LapService;

  @Get()
  findAll(@Query('page') page?: string) {
    return this.driverService.findAll(parseInt(page));
  }

  @Get('teams/:teamId')
  findByTeam(@Param('teamId') teamId: string) {
    return this.driverService.findByTeamId(+teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOneDetailed(+id);
  }

  @Get(':id/races')
  listDriverRaces(@Param('id') id: string) {
    return this.driverService.listDriverRaces(+id);
  }

  @Get(':id/laps')
  listDriverLaps(@Param('id') id: string) {
    return this.lapService.findByDriverId(+id);
  }

  @Get(':id/races/:raceId/laps')
  listLapsByRace(@Param('id') id: string, @Param('raceId') raceId: string) {
    return this.lapService.findByDriverIdAndRaceId(+id, +raceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDTO) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
