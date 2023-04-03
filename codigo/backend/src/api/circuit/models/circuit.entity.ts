import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Race } from '../../race/models/race.entity';

@Index('Circuit_pkey', ['id'], { unique: true })
@Entity('Circuit', { schema: 'public' })
export class Circuit extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'local', nullable: true })
  local: string | null;

  @Column('numeric', { name: 'trackSize', nullable: true })
  trackSize: number | null;

  @Column('numeric', { name: 'safetyMargin', nullable: true })
  safetyMargin: number | null;

  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Race, (race) => race.circuit)
  races: Race[];
}
