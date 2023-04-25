import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { DriverService } from '@/api/driver/driver.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, DriverService],
})
export class TeamModule {}
