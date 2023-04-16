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
import { Team } from '@/api/team/models/team.entity';
import { Exclude } from 'class-transformer';

@Index('Car_pkey', ['id'], { unique: true })
@Entity('Car', { schema: 'public' })
export class Car {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { name: 'totalFuel', nullable: true })
  totalFuel: number | null;

  @Column('numeric', { name: 'currentFuel', nullable: true })
  currentFuel: number | null;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @Exclude()
  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @ManyToOne(() => Team, (team) => team.cars)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;
}
