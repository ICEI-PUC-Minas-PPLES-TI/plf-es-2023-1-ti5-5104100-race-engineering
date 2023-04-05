import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCircuitDto {
  @IsString()
  @ApiProperty({ type: 'string', example: 'Circuit of the Americas' })
  name: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'Austin, Texas' })
  local: string;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 5.5 })
  trackSize: number;

  @IsNumber()
  @ApiProperty({ type: 'number', example: 5 })
  safetyMargin: number;
}

export class UpdateCircuitDto extends PartialType(CreateCircuitDto) {}
