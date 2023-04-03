import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

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

  @ManyToOne(() => User, (user) => user.mechanicRaces)
  @JoinColumn([{ name: 'mechanicId', referencedColumnName: 'id' }])
  mechanic: User;

  @ManyToMany(() => Driver, (driver) => driver.races)
  drivers: Driver[];
}
