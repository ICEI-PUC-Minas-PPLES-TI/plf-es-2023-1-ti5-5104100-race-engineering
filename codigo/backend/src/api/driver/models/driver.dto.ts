import { PartialType } from '@nestjs/mapped-types';

export class CreateDriverDto {}

export class UpdateDriverDto extends PartialType(CreateDriverDto) {}
