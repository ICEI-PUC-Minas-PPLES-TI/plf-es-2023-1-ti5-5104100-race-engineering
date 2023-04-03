import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRaceDTO, UpdateRaceDto } from './models/race.dto';
import { UserService } from '@/api/user/user.service';
import { CircuitService } from '@/api/circuit/circuit.service';
import { DriverService } from '@/api/driver/driver.service';
import { Driver } from '@/api/driver/models/driver.entity';
import { Race } from '@/api/race/models/race.entity';

@Injectable()
export class RaceService {
  constructor(
    public readonly userService: UserService,
    public readonly circuitService: CircuitService,
    public readonly driverService: DriverService,
  ) {}

  async create(createRaceDto: CreateRaceDTO) {
    const {
      startDate,
      endDate,
      totalLaps,
      analystId,
      mechanicId,
      circuitId,
      drivers,
    } = createRaceDto;

    const analyst = await this.userService.findOne(analystId);
    if (!analyst) throw new BadRequestException('Analyst not found');

    const mechanic = await this.userService.findOne(mechanicId);
    if (!mechanic) throw new BadRequestException('Mechanic not found');

    const circuit = await this.circuitService.findOne(circuitId);
    if (!circuit) throw new BadRequestException('Circuit not found');

    const foundDrivers: Driver[] = [];
    for (let i = 0; i < drivers.length; i++) {
      const foundDriver = await this.driverService.findOne(drivers[i].id);
      if (!foundDriver)
        throw new BadRequestException(`Driver Id: ${drivers[i].id} not found`);
      foundDrivers.push(foundDriver);
    }

    const race = new Race();
    race.startDate = startDate;
    race.endDate = endDate;
    race.totalLaps = totalLaps;
    race.analyst = analyst;
    race.mechanic = mechanic;
    race.drivers = foundDrivers;
    race.createdAt = new Date();
    race.updatedAt = new Date();

    return await Race.save(race);
  }

  findAll() {
    return `This action returns all race`;
  }

  findOne(id: number) {
    return `This action returns a #${id} race`;
  }

  update(id: number, updateRaceDto: UpdateRaceDto) {
    return `This action updates a #${id} race`;
  }

  remove(id: number) {
    return `This action removes a #${id} race`;
  }
}
