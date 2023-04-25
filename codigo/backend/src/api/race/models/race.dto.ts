import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SelectDriverDTO {
  @IsNumber()
  id: number;
}

export class SelectMechanicDTO {
  @IsNumber()
  id: number;
}

export class SelectTeamDTO {
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
  @ApiPropertyOptional({ type: 'number', example: 1 })
  analystId?: number;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 1 })
  circuitId: number;

  @IsArray()
  @ApiProperty({ type: 'array', example: [{ id: 1 }, { id: 2 }] })
  mechanics: SelectMechanicDTO[];

  @IsArray()
  @ApiProperty({ type: 'array', example: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  drivers: SelectDriverDTO[];

  @IsArray()
  @ApiProperty({ type: 'array', example: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  teams: SelectTeamDTO[];
}

export class UpdateRaceDto extends PartialType(CreateRaceDTO) {}
