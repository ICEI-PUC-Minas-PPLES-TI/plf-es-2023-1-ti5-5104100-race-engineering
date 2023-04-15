import { PartialType } from '@nestjs/mapped-types';

export class CreateLapDto {}

export class UpdateLapDto extends PartialType(CreateLapDto) {}
