import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateDriverDto, UpdateDriverDto } from './models/driver.dto';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class DriverService {
  async create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findAll() {
    return await Driver.find();
  }

  public async findOne(id: number) {
    const driver = await Driver.findOne({ where: { id } });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  async remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
