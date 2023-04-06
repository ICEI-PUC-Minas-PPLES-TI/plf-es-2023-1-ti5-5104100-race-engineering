import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { Driver } from '../driver/models/driver.entity';

@Index('Team_pkey', ['id'], { unique: true })
@Entity('Team', { schema: 'public' })
export class Team {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'category', nullable: true })
  category: string | null;

  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Car, (car) => car.team)
  cars: Car[];

  @OneToMany(() => Driver, (driver) => driver.team)
  drivers: Driver[];;
}
