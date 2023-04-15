import { Module } from '@nestjs/common';
import { LapService } from './lap.service';
import { LapController } from './lap.controller';

@Module({
  controllers: [LapController],
  providers: [LapService],
})
export class LapModule {}
