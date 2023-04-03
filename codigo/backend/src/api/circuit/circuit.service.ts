import { Injectable } from '@nestjs/common';
import { CreateCircuitDto, UpdateCircuitDto } from './models/circuit.dto';
import { Circuit } from '@/api/circuit/models/circuit.entity';

@Injectable()
export class CircuitService {
  async create(createCircuitDto: CreateCircuitDto) {
    const { name, local, trackSize, safetyMargin } = createCircuitDto;

    const circuit = new Circuit();
    circuit.name = name;
    circuit.local = local;
    circuit.trackSize = trackSize;
    circuit.safetyMargin = safetyMargin;
    circuit.createdAt = new Date();
    circuit.updatedAt = new Date();

    return await Circuit.save(circuit);
  }

  async findAll() {
    return `This action returns all circuit`;
  }

  async findOne(id: number) {
    return await Circuit.findOne({ where: { id } });
  }

  async update(id: number, updateCircuitDto: UpdateCircuitDto) {
    return `This action updates a #${id} circuit`;
  }

  async remove(id: number) {
    return `This action removes a #${id} circuit`;
  }
}
