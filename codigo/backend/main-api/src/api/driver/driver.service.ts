import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDriverDTO } from './models/driver.dto';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class DriverService {
  async findAll(page?: number) {
    if (!page) page = 1;
    const drivers = await Driver.createQueryBuilder('Driver')
      .where({ isActive: true })
      .offset((page - 1) * 10)
      .limit(10)
      .innerJoinAndSelect('Driver.user', 'User')
      .getMany();
    return drivers.map((driver) => {
      return {
        id: driver.id,
        number: driver.number,
        isActive: driver.isActive,
        name: driver.user.name,
        email: driver.user.email,
      };
    });
  }

  async findByTeamId(id: number) {
    const drivers = await Driver.find({
      where: { team: { id } },
      relations: ['user'],
    });
    return drivers.map((driver) => {
      return {
        id: driver.id,
        number: driver.number,
        isActive: driver.isActive,
        name: driver.user.name,
        email: driver.user.email,
      };
    });
  }

  public async findOneDetailed(id: number) {
    const driver = await Driver.findOne({
      where: { id },
      relations: ['team', 'user', 'firstPlaceRaces', 'races'],
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(id: number, body: UpdateDriverDTO) {
    const driver = await this.findOne(id);
    driver.number = body.number || driver.number;
    driver.isActive = body.isActive || driver.isActive;
    driver.nationality = body.nationality || driver.nationality;
    return await driver.save();
  }

  async remove(id: number) {
    const driver = await this.findOne(id);
    await driver.softRemove();
  }

  async findOne(id: number) {
    const driver = await Driver.findOne({ where: { id }, relations: ['user'] });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }
}
