import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@/api/user/user.entity';

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'John Doe' })
  public readonly name: string;

  @Trim()
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'password' })
  public readonly password: string;

  @IsString()
  @IsEnum(UserType)
  @ApiProperty({ type: 'string', example: 'DRIVER', enum: UserType })
  public readonly userType: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ type: 'string', example: 'password' })
  public readonly password: string;
}
