import { Team } from '@/api/team/models/team.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const TeamsFactory = setSeederFactory(Team, () => {
  const team = new Team();
  team.name = faker.helpers.arrayElement(['Marthe', 'Red bull']);
  team.category = faker.helpers.arrayElement(['GT3', 'GT4', 'TCR']);
  return team;
});
