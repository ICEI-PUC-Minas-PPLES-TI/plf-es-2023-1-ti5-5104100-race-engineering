import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lap } from '../../entities/lap.entity';
import { User } from '../../user/models/user.entity';
import { Circuit } from '../../circuit/models/circuit.entity';
import { Driver } from '../../driver/models/driver.entity';

@Index('Race_pkey', ['id'], { unique: true })
@Entity('Race', { schema: 'public' })
export class Race extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp with time zone', { name: 'startDate' })
  startDate: Date;

  @Column('timestamp with time zone', { name: 'endDate' })
  endDate: Date;

  @Column('integer', { name: 'totalLaps', nullable: true })
  totalLaps: number | null;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @OneToMany(() => Lap, (lap) => lap.race)
  laps: Lap[];

  @ManyToOne(() => User, (user) => user.analystRaces)
  @JoinColumn([{ name: 'analystId', referencedColumnName: 'id' }])
  analyst: User;

  @ManyToOne(() => Circuit, (circuit) => circuit.races)
  @JoinColumn([{ name: 'circuitId', referencedColumnName: 'id' }])
  circuit: Circuit;

  @ManyToOne(() => Driver, (driver) => driver.firstPlaceRaces)
  @JoinColumn([{ name: 'firstPlaceId', referencedColumnName: 'id' }])
  firstPlace: Driver;

  @ManyToMany(() => User, (user) => user.mechanicRaces)
  mechanics: User[];

  @ManyToMany(() => Driver, (driver) => driver.races)
  drivers: Driver[];
}
