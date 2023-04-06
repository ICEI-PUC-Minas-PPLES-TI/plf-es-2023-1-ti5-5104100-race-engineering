import { Injectable } from '@nestjs/common';
import { CreateDriverDto, UpdateDriverDto } from './models/driver.dto';
import { Driver } from '@/api/driver/models/driver.entity';

@Injectable()
export class DriverService {
  // TODO: Implement the service

  async create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  async findAll() {
    return `This action returns all driver`;
  }

  async findOne(id: number) {
    return await Driver.findOne({ where: { id } });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  async remove(id: number) {
    return `This action removes a #${id} driver`;;
  }
}
