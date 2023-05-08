import { Injectable, NotFoundException } from '@nestjs/common';
import { EditDriverDTO } from './models/driver.dto';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class DriverService {
  async findAll() {
    const drivers = await Driver.find({ relations: ['user'] });
    return drivers.map((driver) => {
      return {
        id: driver.id,
        number: driver.number,
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

  async update(id: number, body: EditDriverDTO) {
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
    const driver = await Driver.findOne({ where: { id } });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }
}
