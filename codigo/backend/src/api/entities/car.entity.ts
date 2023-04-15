import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @ManyToOne(() => Team, (team) => team.cars)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;
}
