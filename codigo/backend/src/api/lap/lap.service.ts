import { Injectable } from '@nestjs/common';
import { CreateLapDto, UpdateLapDto } from './models/lap.dto';

@Injectable()
export class LapService {
  create(createLapDto: CreateLapDto) {
    return 'This action adds a new lap';
  }

  findAll() {
    return `This action returns all lap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lap`;
  }

  update(id: number, updateLapDto: UpdateLapDto) {
    return `This action updates a #${id} lap`;
  }

  remove(id: number) {
    return `This action removes a #${id} lap`;
  }
}
