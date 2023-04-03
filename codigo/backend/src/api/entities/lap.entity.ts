import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Race } from '../race/models/race.entity';

@Index('Lap_pkey', ['id'], { unique: true })
@Entity('Lap', { schema: 'public' })
export class Lap {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'bestTime', nullable: true })
  bestTime: number | null;

  @Column('numeric', { name: 'averageTime', nullable: true })
  averageTime: number | null;

  @Column('numeric', { name: 'totalTime', nullable: true })
  totalTime: number | null;

  @ManyToOne(() => Race, (race) => race.laps)
  @JoinColumn([{ name: 'raceId', referencedColumnName: 'id' }])
  race: Race;
}
