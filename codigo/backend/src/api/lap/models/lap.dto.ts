import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLapDto {
  @IsNumber()
  @ApiPropertyOptional({ example: 10 })
  lapNumber?: number;

  @IsNumber()
  @ApiPropertyOptional({ example: 12 })
  driverId?: number;

  @IsString()
  @ApiPropertyOptional({ example: '00:01:20.345' })
  lapTime?: string;
}

export class UpdateLapDto extends PartialType(CreateLapDto) {}
