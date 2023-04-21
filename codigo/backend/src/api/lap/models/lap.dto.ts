import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLapDto {}

export class UpdateLapDto extends PartialType(CreateLapDto) {
  @ApiPropertyOptional({ example: 59.43 })
  bestTime?: number;

  @IsNumber()
  @ApiPropertyOptional({ example: 68.32 })
  averageTime?: number;

  @IsNumber()
  @ApiPropertyOptional({ example: 68.32 })
  totalTime: number;
}
