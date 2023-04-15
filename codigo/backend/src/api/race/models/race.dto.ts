import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectDriverDTO {
  @IsNumber()
  id: number;
}

export class SelectMechanicDTO {
  @IsNumber()
  id: number;
}

export class CreateRaceDTO {
  @IsDateString()
  @ApiProperty({ type: 'string', example: '2023-04-03T08:00:00.000Z' })
  startDate: Date;

  @IsDateString()
  @ApiProperty({ type: 'string', example: '2023-04-03T08:00:00.000Z' })
  endDate: Date;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 50 })
  totalLaps: number;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 1 })
  analystId: number;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 1 })
  circuitId: number;

  @IsArray()
  @ApiProperty({ type: 'array', example: [1, 2] })
  mechanics: SelectMechanicDTO[];

  @IsArray()
  @ApiProperty({ type: 'array', example: [1, 2, 3] })
  drivers: SelectDriverDTO[];
}

export class UpdateRaceDto extends PartialType(CreateRaceDTO) {}
