import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Index('Car_pkey', ['id'], { unique: true })
@Entity('Car', { schema: 'public' })
export class Car {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'totalFuel', nullable: true })
  totalFuel: number | null;

  @Column('numeric', { name: 'currentFuel', nullable: true })
  currentFuel: number | null;

  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Team, (team) => team.cars)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;
}
