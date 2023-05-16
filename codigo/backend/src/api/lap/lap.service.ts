import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateLapDto,
  LapSearchParams,
  SendTimerDto,
  UpdateLapDto,
} from './models/lap.dto';
import { Lap } from '@/api/lap/models/lap.entity';
import { RaceService } from '@/api/race/race.service';
import { DriverService } from '@/api/driver/driver.service';
import * as parse from 'postgres-interval';

@Injectable()
export class LapService {
  constructor(
    private readonly raceService: RaceService,
    private readonly driverService: DriverService,
  ) {}

  async createLap(id: number, createLapDto: CreateLapDto) {
    const {
      lapNumber,
      driverId,
      lapTime,
      remainingGas,
      tyreType,
      isAdditional,
    } = createLapDto;
    const race = await this.raceService.findOneRace(id);
    let driver;
    if (driverId) driver = await this.driverService.findOne(driverId);

    const lap = new Lap();
    lap.lapNumber = lapNumber;
    if (lapTime) lap.lapTime = parse(lapTime);
    if (driver) lap.driver = driver;
    if (remainingGas) lap.remainingGas = remainingGas;
    if (tyreType) lap.tyreType = tyreType;
    if (isAdditional) lap.isAdditional = isAdditional;
    lap.race = race;
    lap.createdAt = new Date();
    lap.updatedAt = new Date();

    return await lap.save();
  }

  async findAll(page: number) {
    const builder = await Lap.createQueryBuilder('Lap');
    const pg = page ? page : 1;
    const perPage = 10;
    builder.offset((pg - 1) * perPage).limit(perPage);
    return await builder.getMany();
  }

  async findByRaceId(id: number) {
    const race = await this.raceService.findOneRace(id);
    return await Lap.find({
      where: {
        race: { id: race.id },
      },
    });
  }

  async findByDriverId(id: number) {
    const driver = await this.driverService.findOneDetailed(id);
    return await Lap.find({
      where: {
        driver: { id: driver.id },
      },
      relations: ['race'],
    });
  }

  async findByDriverIdAndRaceId(driverId: number, raceId: number) {
    const driver = await this.driverService.findOneDetailed(driverId);
    const race = await this.raceService.findOneRace(raceId);
    return await Lap.find({
      where: {
        driver: { id: driver.id },
        race: { id: race.id },
      },
    });
  }

  async findOne(id: number) {
    const lap = await Lap.findOne({ where: { id } });
    if (!lap) throw new NotFoundException(`Lap #${id} not found`);
    return lap;
  }

  async findOneDetailed(id: number) {
    const lap = await Lap.findOne({
      where: { id },
      relations: ['driver', 'race'],
    });
    if (!lap) throw new NotFoundException(`Lap #${id} not found`);
    return lap;
  }

  async update(id: number, updateLapDto: UpdateLapDto) {
    const {
      lapTime,
      lapNumber,
      driverId,
      remainingGas,
      tyreType,
      isAdditional,
    } = updateLapDto;
    const lap = await this.findOne(id);
    if (lapTime) lap.lapTime = parse(lapTime);
    if (lapNumber) lap.lapNumber = lapNumber;
    if (driverId) lap.driver = await this.driverService.findOne(driverId);
    if (remainingGas) lap.remainingGas = remainingGas;
    if (tyreType) lap.tyreType = tyreType;
    if (isAdditional) lap.isAdditional = isAdditional;

    return await lap.save();
  }

  async sendTimer(id: number, sendTimerDto: SendTimerDto) {
    const { lapTime } = sendTimerDto;
    const lap = await this.findOne(id);
    if (lapTime) lap.lapTime = parse(lapTime);
    return await lap.save();
  }

  async remove(id: number) {
    const lap = await this.findOne(id);
    return await lap.softRemove();
  }
}
