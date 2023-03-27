import { getEnvPath } from '@/common/helper/env.helper';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

const envFilePath: string = getEnvPath(`${__dirname}../../../common/envs`);
const data: any = dotenv.parse(fs.readFileSync(envFilePath));

export const config: DataSourceOptions = {
  type: 'postgres',
  host: data.DATABASE_HOST,
  port: data.DATABASE_PORT,
  database: data.DATABASE_NAME,
  username: data.DATABASE_USER,
  password: data.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/shared/typeorm/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
  synchronize: false,
};

export default new DataSource(config);
