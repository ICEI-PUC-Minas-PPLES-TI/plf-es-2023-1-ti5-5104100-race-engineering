import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { UserService } from '@/api/user/user.service';
import { DriverService } from '@/api/driver/driver.service';
import { CircuitService } from '@/api/circuit/circuit.service';

@Module({
  controllers: [RaceController],
  providers: [RaceService, UserService, DriverService, CircuitService],
})
export class RaceModule {}
