import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export enum UserType {
  Driver = 'DRIVER',
  Admin = 'ADMIN',
  Mechanic = 'MECHANIC',
  Analyst = 'ANALYST',
}

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ type: 'string', example: 'John Doe' })
  public name: string | null;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ type: 'string', example: 'DRIVER', enum: UserType })
  public userType!: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @Column({ type: 'timestamp', default: 'now()' })
  public createdAt: Date;

  @Column({ type: 'timestamp', default: 'now()' })
  public updatedAt: Date;
}
