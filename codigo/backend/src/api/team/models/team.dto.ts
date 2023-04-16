import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  category: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
