import { PartialType } from '@nestjs/mapped-types';

export class CreateTeamDto {}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
