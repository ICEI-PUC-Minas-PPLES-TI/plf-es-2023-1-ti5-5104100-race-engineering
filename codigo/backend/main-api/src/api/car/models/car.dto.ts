import { PartialType } from '@nestjs/mapped-types';

export class CreateCarDto {
  name?: string;
  totalFuel?: number;
  currentFuel?: number;
}

export class UpdateCarDto extends PartialType(CreateCarDto) {}
