import { Injectable } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './models/team.dto';
import { Team } from '@/api/team/models/team.entity';

@Injectable()
export class TeamService {
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.name = createTeamDto.name;
    team.category = createTeamDto.category;
    return await Team.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await Team.find({ relations: ['drivers', 'cars'] });
  }

  async findOne(id: number) {
    return await Team.findOne({
      where: { id },
      relations: ['drivers', 'cars'],
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
