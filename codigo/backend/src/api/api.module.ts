import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RaceModule } from './race/race.module';
import { DriverModule } from './driver/driver.module';
import { CircuitModule } from './circuit/circuit.module';
import { LapModule } from './lap/lap.module';
import { TeamModule } from './team/team.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [UserModule, RaceModule, DriverModule, CircuitModule, LapModule, TeamModule, CarModule],
})
export class ApiModule {}
