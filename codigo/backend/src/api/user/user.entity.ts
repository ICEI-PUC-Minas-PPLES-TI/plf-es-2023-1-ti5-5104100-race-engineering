import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ type: 'string', example: 'john@email.com' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ type: 'string', example: 'John Doe' })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  @Column({ type: 'timestamp', default: 'now()' })
  public createdAt: Date;

  @Column({ type: 'timestamp', default: 'now()' })
  public updatedAt: Date;
}
