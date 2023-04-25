import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLapDto, UpdateLapDto } from './models/lap.dto';
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
    const { lapNumber, driverId, lapTime } = createLapDto;
    const race = await this.raceService.findOneDetailed(id);
    let driver;
    if (driverId) driver = await this.driverService.findOne(driverId);
    console.log(lapNumber);
    const lap = new Lap();
    lap.lapNumber = lapNumber;
    if (lapTime) lap.lapTime = parse(lapTime);
    if (driver) lap.driver = driver;
    lap.race = race;
    lap.createdAt = new Date();
    lap.updatedAt = new Date();

    return await lap.save();
  }

  async findAll() {
    return await Lap.find();
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
    const { lapTime, lapNumber, driverId } = updateLapDto;
    const lap = await this.findOne(id);
    if (lapTime) lap.lapTime = parse(lapTime);
    if (lapNumber) lap.lapNumber = lapNumber;
    if (driverId) {
      lap.driver = await this.driverService.findOne(driverId);
    }
    return await lap.save();
  }

  async remove(id: number) {
    const lap = await this.findOne(id);
    return await lap.softRemove();
  }

  async findByRaceId(id: number) {
    const race = await this.raceService.findOneDetailed(id);
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
    });
  }

  async findByDriverIdAndRaceId(driverId: number, raceId: number) {
    const driver = await this.driverService.findOneDetailed(driverId);
    const race = await this.raceService.findOneDetailed(raceId);
    return await Lap.find({
      where: {
        driver: { id: driver.id },
        race: { id: race.id },
      },
    });
  }
}
