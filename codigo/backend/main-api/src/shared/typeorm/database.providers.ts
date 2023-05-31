import { getEnvPath } from '@/common/helper/env.helper';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { CarFactory } from './seeding/factories/car.factory';
import { CircuitFactory } from './seeding/factories/circuit.factory';
import { DriversFactory } from './seeding/factories/driver.factory';
import { LapFactory } from './seeding/factories/lap.factory';
import { RaceFactory } from './seeding/factories/race.factory';
import { TeamsFactory } from './seeding/factories/team.factory';
import { UserFactory } from './seeding/factories/user.factory';
import { MainSeeder } from './seeding/seeders/main.seeder';

const envFilePath: string = getEnvPath(`${__dirname}../../../common/envs`);
const data: any = dotenv.parse(fs.readFileSync(envFilePath));

export const config: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: data.DATABASE_HOST,
  port: data.DATABASE_PORT,
  database: data.DATABASE_NAME,
  username: data.DATABASE_USER,
  password: data.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.{ts,js}'],
  logger: 'file',
  synchronize: false,
  factories: [
    CarFactory,
    CircuitFactory,
    DriversFactory,
    LapFactory,
    RaceFactory,
    TeamsFactory,
    UserFactory,
  ],
  seeds: [MainSeeder],
};

export default new DataSource(config);
