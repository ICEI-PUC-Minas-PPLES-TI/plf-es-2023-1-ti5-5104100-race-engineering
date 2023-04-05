import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Race } from '../../race/models/race.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('Circuit_pkey', ['id'], { unique: true })
@Entity('Circuit', { schema: 'public' })
export class Circuit extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @ApiProperty({ type: 'number', example: 1 })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  @ApiProperty({ type: 'string', example: 'Circuit of the Americas' })
  name: string | null;

  @Column('text', { name: 'local', nullable: true })
  @ApiProperty({ type: 'string', example: 'Austin, Texas' })
  local: string | null;

  @Column('numeric', { name: 'trackSize', nullable: true })
  @ApiProperty({ type: 'number', example: 5.513 })
  trackSize: number | null;

  @Column('numeric', { name: 'safetyMargin', nullable: true })
  @ApiProperty({ type: 'number', example: 0.5 })
  safetyMargin: number | null;

  @Column('timestamp with time zone', { name: 'createdAt', nullable: true })
  @ApiProperty({ type: 'string', example: '2021-05-01T00:00:00.000Z' })
  createdAt: Date | null;

  @Column('timestamp with time zone', { name: 'updatedAt', nullable: true })
  @ApiProperty({ type: 'string', example: '2021-05-01T00:00:00.000Z' })
  updatedAt: Date | null;

  @OneToMany(() => Race, (race) => race.circuit)
  races: Race[];
}
