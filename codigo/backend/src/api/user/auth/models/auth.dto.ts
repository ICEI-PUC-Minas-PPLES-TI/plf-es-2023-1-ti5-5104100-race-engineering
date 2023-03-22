import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
