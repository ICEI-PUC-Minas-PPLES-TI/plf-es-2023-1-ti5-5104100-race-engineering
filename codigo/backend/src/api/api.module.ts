import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RaceModule } from './race/race.module';
import { DriverModule } from './driver/driver.module';
import { CircuitModule } from './circuit/circuit.module';

@Module({
  imports: [UserModule, RaceModule, DriverModule, CircuitModule],
})
export class ApiModule {}
