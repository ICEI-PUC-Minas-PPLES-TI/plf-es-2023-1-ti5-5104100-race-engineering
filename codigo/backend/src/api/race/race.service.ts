import { Injectable } from '@nestjs/common';
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

@Injectable()
export class RaceService {
  constructor(
    public readonly userService: UserService,
    public readonly circuitService: CircuitService,
    public readonly driverService: DriverService,
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
    } = createRaceDto;

    const circuit = await this.circuitService.findOne(circuitId);

    const analyst = await this.userService.findOne(analystId, Role.Analyst);

    const foundMechanics = await this.findMechanics(mechanics);
    const foundDrivers = await this.findDrivers(drivers);

    const race = new Race();
    race.startDate = startDate;
    race.endDate = endDate;
    race.totalLaps = totalLaps;
    race.circuit = circuit;
    race.analyst = analyst;
    race.mechanics = foundMechanics;
    race.drivers = foundDrivers;

    return await Race.save(race);
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

  async findOneRace(id: number) {
    return await Race.findOne({ where: { id } });
  }

  private async findByDriver(id: number): Promise<Race[]> {
    const driver = await this.driverService.findOne(id);
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

  updateRace(id: number, updateRaceDto: UpdateRaceDto) {
    return `This action updates a #${id} race`;
  }

  removeRace(id: number) {
    return `This action removes a #${id} race`;
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
      const foundDriver = await this.driverService.findOne(drivers[i].id);
      foundDrivers.push(foundDriver);
    }
    return foundDrivers;
  }
}
