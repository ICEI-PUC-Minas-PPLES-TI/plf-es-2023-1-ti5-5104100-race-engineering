import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { UserService } from '@/api/user/user.service';
import { DriverService } from '@/api/driver/driver.service';
import { CircuitService } from '@/api/circuit/circuit.service';
import { TeamService } from '@/api/team/team.service';
import { ProxyService } from '@/api/notifications/proxy/proxy.service';

@Module({
  controllers: [RaceController],
  providers: [
    RaceService,
    UserService,
    DriverService,
    CircuitService,
    TeamService,
    ProxyService,
  ],
})
export class RaceModule {}
