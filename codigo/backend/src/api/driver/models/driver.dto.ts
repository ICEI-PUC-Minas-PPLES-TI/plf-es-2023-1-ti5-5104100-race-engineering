import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditDriverDTO {
  @IsBoolean()
  @ApiProperty({ example: true })
  isActive: boolean;

  @IsString()
  @ApiProperty({ example: 'Brazilian' })
  nationality: string;
}

export class UpdateDriverDto extends PartialType(EditDriverDTO) {}
