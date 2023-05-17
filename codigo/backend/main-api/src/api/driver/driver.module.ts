import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { LapService } from '@/api/lap/lap.service';
import { RaceService } from '@/api/race/race.service';
import { UserService } from '@/api/user/user.service';
import { CircuitService } from '@/api/circuit/circuit.service';
import { TeamService } from '@/api/team/team.service';
import { ProxyService } from '@/api/notifications/proxy/proxy.service';

@Module({
  controllers: [DriverController],
  providers: [
    DriverService,
    LapService,
    RaceService,
    UserService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class DriverModule {}
