import { IsOptional, IsString } from 'class-validator';
import { User } from '@/api/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNameDto {
  @ApiProperty({ type: 'string', example: 'John Doe' })
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export interface IRequest extends Request {
  user: User;
}
