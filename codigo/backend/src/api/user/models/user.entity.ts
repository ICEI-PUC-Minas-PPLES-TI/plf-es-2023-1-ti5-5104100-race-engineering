import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Driver } from '@/api/driver/models/driver.entity';
import { Race } from '@/api/race/models/race.entity';

export enum UserType {
  Driver = 'DRIVER',
  Admin = 'ADMIN',
  Mechanic = 'MECHANIC',
  Analyst = 'ANALYST',
}

@Index('User_pkey', ['id'], { unique: true })
@Entity('User', { schema: 'public' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ type: 'string', example: 'John Doe' })
  name: string | null;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ type: 'string', example: 'DRIVER', enum: UserType })
  userType!: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty({ type: 'string', example: '2021-01-01T00:00:00.000Z' })
  lastLoginAt: Date | null;

  @Column({ type: 'timestamp', default: 'now()' })
  @ApiProperty({ type: 'string', example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: 'now()' })
  @ApiProperty({ type: 'string', example: '2021-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @OneToMany(() => Driver, (driver) => driver.user)
  drivers: Driver[];

  @OneToMany(() => Race, (race) => race.analyst)
  analystRaces: Race[];

  @OneToMany(() => Race, (race) => race.mechanic)
  mechanicRaces: Race[];
}
