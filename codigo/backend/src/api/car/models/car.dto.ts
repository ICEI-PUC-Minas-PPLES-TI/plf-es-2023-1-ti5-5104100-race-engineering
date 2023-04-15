import { PartialType } from '@nestjs/mapped-types';

export class CreateCarDto {}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
