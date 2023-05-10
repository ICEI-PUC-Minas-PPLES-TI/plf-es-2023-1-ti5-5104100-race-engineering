import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Lap } from '@/api/lap/models/lap.entity';
import * as parse from 'postgres-interval';

export const LapFactory = setSeederFactory(Lap, () => {
  const lap = new Lap();
  lap.lapNumber = faker.datatype.number({ min: 1, max: 70 });
  const minutes = faker.datatype.number({ min: 1, max: 3 });
  const seconds = faker.datatype.number({ min: 1, max: 59 });
  const milliseconds = faker.datatype.number({ min: 100, max: 999 });
  console.log(`00:${minutes}:${seconds}.${milliseconds}`);
  lap.lapTime = parse(
    `00:0${minutes}:${seconds < 10 ? 0 : ''}${seconds}.${milliseconds}`,
  );
  return lap;
});
