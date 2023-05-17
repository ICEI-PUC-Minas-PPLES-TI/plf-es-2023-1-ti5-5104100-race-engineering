import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateRaceDTO,
  RaceSearchParams,
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
import { ProxyService } from '@/api/notifications/proxy/proxy.service';

@Injectable()
export class RaceService {
  constructor(
    public readonly userService: UserService,
    public readonly circuitService: CircuitService,
    public readonly driverService: DriverService,
    public readonly teamService: TeamService,
    public readonly proxyService: ProxyService,
  ) {}

  async createRace(createRaceDto: CreateRaceDTO) {
    const {
      name,
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

    for (const driver of foundDrivers) {
      this.notifyDriver(
        driver.user.name,
        driver.user.email,
        name,
        startDate,
        endDate,
        totalLaps,
      );
    }

    const race = new Race();
    race.name = name;
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

  async findAllRaces(
    user: User,
    searchParams: RaceSearchParams,
  ): Promise<Race[]> {
    const { search, sort, sortDirection, page, limit } = searchParams;
    const foundUser = await this.userService.findOneDetailed(user.id);

    switch (user.role) {
      case Role.Driver:
        return await this.findByDriver(foundUser.driver.id);
      case Role.Mechanic:
        return await this.findByMechanic(foundUser.id);
      case Role.Analyst:
        return await this.findByAnalyst(foundUser.id);
      case Role.Admin:
        const builder = await Race.createQueryBuilder('Race');
        if (search) {
          builder.where('LOWER(Race.name) LIKE :search', {
            search: `%${search.toLowerCase()}%`,
          });
        }
        if (sort && sortDirection) {
          const sortDb =
            sortDirection === 'asc'
              ? 'ASC'
              : sortDirection === 'desc'
              ? 'DESC'
              : null;
          if (sortDb) builder.orderBy(`Race.${sort}`, sortDb);
        }
        const perPage = limit || 10;
        builder.offset((page - 1) * perPage).limit(perPage);
        return await builder.getMany();
    }
  }

  async findOneRace(id: number) {
    const race = await Race.findOne({ where: { id } });
    if (!race) throw new NotFoundException({ message: 'Race not found' });
    return race;
  }

  async findByDriver(id: number): Promise<Race[]> {
    const driver = await this.driverService.findOneDetailed(id);
    return driver.races;
  }

  private async findByMechanic(id: number): Promise<Race[]> {
    const mechanic = await this.userService.findOneDetailed(id);
    return mechanic.mechanicRaces;
  }

  private async findByAnalyst(id: number): Promise<Race[]> {
    const analyst = await this.userService.findOneDetailed(id);
    return analyst.analystRaces;
  }

  async updateRace(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.findOneRace(id);
    const {
      name,
      startDate,
      endDate,
      totalLaps,
      circuitId,
      analystId,
      mechanics,
      drivers,
    } = updateRaceDto;

    if (name) race.name = name;
    if (startDate) race.startDate = startDate;
    if (endDate) race.endDate = endDate;
    if (totalLaps) race.totalLaps = totalLaps;
    if (circuitId) race.circuit = await this.circuitService.findOne(circuitId);
    if (analystId)
      race.analyst = await this.userService.findOneDetailed(analystId);
    if (mechanics) race.mechanics = await this.findMechanics(mechanics);
    if (drivers) race.drivers = await this.findDrivers(drivers);
    race.updatedAt = new Date();

    return await race.save();
  }

  async removeRace(id: number) {
    const race = await this.findOneRace(id);
    return await race.softRemove();
  }

  private async findMechanics(mechanics: SelectDriverDTO[]): Promise<User[]> {
    const foundMechanics: User[] = [];
    for (let i = 0; i < mechanics.length; i++) {
      const foundMechanic = await this.userService.findOne(mechanics[i].id);
      foundMechanics.push(foundMechanic);
    }
    return foundMechanics;
  }

  private async findDrivers(drivers: SelectDriverDTO[]): Promise<Driver[]> {
    const foundDrivers: Driver[] = [];
    for (let i = 0; i < drivers.length; i++) {
      const foundDriver = await this.driverService.findOne(drivers[i].id);
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

  private notifyDriver(
    driverName: string,
    driverEmail: string,
    name: string,
    startDate: Date,
    endDate: Date,
    totalLaps: number,
  ) {
    const startDateInstance = new Date(startDate);
    const endDateInstance = new Date(endDate);
    const date = startDateInstance.toLocaleString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const startTime = startDateInstance.toTimeString().slice(0, 5);
    const endTime = endDateInstance.toTimeString().slice(0, 5);

    this.proxyService.notificationMicroservice.emit('race-created', {
      driverName,
      driverEmail,
      raceName: name,
      raceDate: date,
      raceStartTime: startTime,
      raceEndTime: endTime,
      raceLaps: totalLaps,
    });
  }
}
