import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../entities/team.entity';
import { User } from '../../user/models/user.entity';
import { Race } from '../../race/models/race.entity';

@Index('Driver_pkey', ['id'], { unique: true })
@Entity('Driver', { schema: 'public' })
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'isActive', nullable: true })
  isActive: boolean | null;

  @Column('text', { name: 'nationality', nullable: true })
  nationality: string | null;

  @Column('numeric', { name: 'bestLapTime', nullable: true })
  bestLapTime: number | null;

  @Column('numeric', { name: 'bestRaceTime', nullable: true })
  bestRaceTime: number | null;

  @Column('numeric', { name: 'totalRaceTime', nullable: true })
  totalRaceTime: number | null;

  @Column('numeric', { name: 'totalRaceKm', nullable: true })
  totalRaceKm: number | null;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' })
  createdAt: Date | null;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', default: null })
  deletedAt: Date | null;

  @ManyToOne(() => Team, (team) => team.drivers)
  @JoinColumn([{ name: 'teamId', referencedColumnName: 'id' }])
  team: Team;

  @ManyToOne(() => User, (user) => user.drivers)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Race, (race) => race.firstPlace)
  firstPlaceRaces: Race[];

  @ManyToMany(() => Race, (race) => race.drivers)
  @JoinTable({
    name: 'Race_Driver',
    joinColumns: [{ name: 'driverId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'raceId', referencedColumnName: 'id' }],
    schema: 'public',
  })
  races: Race[];
}
