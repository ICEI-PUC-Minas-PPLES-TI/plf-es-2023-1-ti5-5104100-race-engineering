import { Injectable, NotFoundException } from '@nestjs/common';
import { EditDriverDTO } from './models/driver.dto';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class DriverService {
  async findAll() {
    return await Driver.find();
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
    return await Driver.save(driver);
  }

  async remove(id: number) {
    const driver = await this.findOne(id);
    await Driver.softRemove(driver);
  }

  async findOne(id: number) {
    const driver = await Driver.findOne({ where: { id } });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }
}
