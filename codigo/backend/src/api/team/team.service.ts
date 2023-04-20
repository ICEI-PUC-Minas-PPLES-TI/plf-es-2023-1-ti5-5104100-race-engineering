import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './models/team.dto';
import { Team } from '@/api/team/models/team.entity';
import { DriverService } from '@/api/driver/driver.service';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class TeamService {
  constructor(public readonly driverService: DriverService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.name = createTeamDto.name;
    team.category = createTeamDto.category;
    team.createdAt = new Date();
    team.updatedAt = new Date();
    return await Team.save(team);
  }

  async findAll(): Promise<Team[]> {
    return await Team.find({ relations: ['drivers', 'cars'] });
  }

  async findOne(id: number) {
    const team = await Team.findOne({ where: { id } });
    if (!team) throw new NotFoundException({ message: 'Team not found' });
    return team;
  }

  async findOneDetailed(id: number): Promise<Team> {
    const team = await Team.findOne({
      where: { id },
      relations: ['drivers', 'cars'],
    });
    if (!team) throw new NotFoundException({ message: 'Team not found' });
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOneDetailed(id);
    team.name = updateTeamDto.name || team.name;
    team.category = updateTeamDto.category || team.category;
    return await Team.save(team);
  }

  async remove(id: number) {
    const team = await this.findOneDetailed(id);
    await Team.softRemove(team);
  }

  async addDriver(teamId: string, driverId: string): Promise<Team> {
    const team = await this.findOneDetailed(+teamId);
    const driver = await this.driverService.findOneDetailed(+driverId);
    team.drivers.push(driver);
    return await Team.save(team);
  }
}
