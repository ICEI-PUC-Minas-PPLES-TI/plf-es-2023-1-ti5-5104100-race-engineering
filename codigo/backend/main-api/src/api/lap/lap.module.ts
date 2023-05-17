import { Module } from '@nestjs/common';
import { LapService } from './lap.service';
import { LapController } from './lap.controller';
import { RaceService } from '@/api/race/race.service';
import { DriverService } from '@/api/driver/driver.service';
import { UserService } from '@/api/user/user.service';
import { CircuitService } from '@/api/circuit/circuit.service';
import { TeamService } from '@/api/team/team.service';
import { ProxyService } from '@/api/notifications/proxy/proxy.service';

@Module({
  imports: [],
  controllers: [LapController],
  providers: [
    LapService,
    RaceService,
    DriverService,
    UserService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class LapModule {}
