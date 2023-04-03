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
  lastLoginAt: Date | null;

  @Column({ type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: 'now()' })
  updatedAt: Date;

  @OneToMany(() => Driver, (driver) => driver.user)
  drivers: Driver[];

  @OneToMany(() => Race, (race) => race.analyst)
  analystRaces: Race[];

  @OneToMany(() => Race, (race) => race.mechanic)
  mechanicRaces: Race[];
}
