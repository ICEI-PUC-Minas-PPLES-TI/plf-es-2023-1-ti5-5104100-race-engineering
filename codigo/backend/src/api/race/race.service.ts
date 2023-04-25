import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateRaceDTO,
  SelectDriverDTO,
  UpdateRaceDto,
} from './models/race.dto';
import { UserService } from '@/api/user/user.service';
import { CircuitService } from '@/api/circuit/circuit.service';
import { DriverService } from '@/api/driver/driver.service';
import { Driver } from '@/api/driver/models/driver.entity';
import { Race } from '@/api/race/models/race.entity';
import { User, Role } from '@/api/user/models/user.entity';
import { TeamService } from '@/api/team/team.service';
import { Team } from '@/api/team/models/team.entity';

@Injectable()
export class RaceService {
  constructor(
    public readonly userService: UserService,
    public readonly circuitService: CircuitService,
    public readonly driverService: DriverService,
    public readonly teamService: TeamService,
  ) {}

  async createRace(createRaceDto: CreateRaceDTO) {
    const {
      startDate,
      endDate,
      totalLaps,
      circuitId,
      analystId,
      mechanics,
      drivers,
      teams,
    } = createRaceDto;

    const circuit = await this.circuitService.findOne(circuitId);

    const analyst = await this.userService.findOne(analystId);

    const foundMechanics = await this.findMechanics(mechanics);
    const foundDrivers = await this.findDrivers(drivers);
    const foundTeams = await this.findTeams(teams);

    const race = new Race();
    race.startDate = startDate;
    race.endDate = endDate;
    race.totalLaps = totalLaps;
    race.circuit = circuit;
    race.analyst = analyst;
    race.mechanics = foundMechanics;
    race.drivers = foundDrivers;
    race.teams = foundTeams;
    race.createdAt = new Date();
    race.updatedAt = new Date();

    return await race.save();
  }

  async findAllRaces(user: User): Promise<Race[]> {
    const foundUser = await this.userService.findOne(user.id);
    switch (user.role) {
      case Role.Driver:
        return await this.findByDriver(foundUser.driver.id);
      case Role.Mechanic:
        return await this.findByMechanic(foundUser.id);
      case Role.Analyst:
        return await this.findByAnalyst(foundUser.id);
      case Role.Admin:
        return await Race.find();
    }
  }

  async findOneDetailed(id: number) {
    const race = await Race.findOne({ where: { id } });
    if (!race) throw new NotFoundException({ message: 'Race not found' });
    return race;
  }

  private async findByDriver(id: number): Promise<Race[]> {
    const driver = await this.driverService.findOneDetailed(id);
    return driver.races;
  }

  private async findByMechanic(id: number): Promise<Race[]> {
    const mechanic = await this.userService.findOne(id);
    return mechanic.mechanicRaces;
  }

  private async findByAnalyst(id: number): Promise<Race[]> {
    const analyst = await this.userService.findOne(id);
    return analyst.analystRaces;
  }

  async updateRace(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.findOneDetailed(id);
    const {
      startDate,
      endDate,
      totalLaps,
      circuitId,
      analystId,
      mechanics,
      drivers,
    } = updateRaceDto;

    if (startDate) race.startDate = startDate;
    if (endDate) race.endDate = endDate;
    if (totalLaps) race.totalLaps = totalLaps;
    if (circuitId) race.circuit = await this.circuitService.findOne(circuitId);
    if (analystId) race.analyst = await this.userService.findOne(analystId);
    if (mechanics) race.mechanics = await this.findMechanics(mechanics);
    if (drivers) race.drivers = await this.findDrivers(drivers);
    race.updatedAt = new Date();

    return await race.save();
  }

  async removeRace(id: number) {
    const race = await this.findOneDetailed(id);
    return await race.softRemove();
  }

  private async findMechanics(mechanics: SelectDriverDTO[]): Promise<User[]> {
    const foundMechanics: User[] = [];
    for (let i = 0; i < mechanics.length; i++) {
      const foundMechanic = await this.userService.findOne(
        mechanics[i].id,
        Role.Mechanic,
      );
      foundMechanics.push(foundMechanic);
    }
    return foundMechanics;
  }

  private async findDrivers(drivers: SelectDriverDTO[]): Promise<Driver[]> {
    const foundDrivers: Driver[] = [];
    for (let i = 0; i < drivers.length; i++) {
      const foundDriver = await this.driverService.findOneDetailed(
        drivers[i].id,
      );
      foundDrivers.push(foundDriver);
    }
    return foundDrivers;
  }

  private async findTeams(teams: SelectDriverDTO[]): Promise<Team[]> {
    const foundTeams: Team[] = [];
    for (let i = 0; i < teams.length; i++) {
      const foundTeam = await this.teamService.findOne(teams[i].id);
      foundTeams.push(foundTeam);
    }
    return foundTeams;
  }
}
