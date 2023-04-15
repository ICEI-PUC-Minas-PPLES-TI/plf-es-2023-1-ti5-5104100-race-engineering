import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCircuitDto,
  ListedCircuit,
  UpdateCircuitDto,
} from './models/circuit.dto';
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

  async findAll(): Promise<ListedCircuit[]> {
    const circuits = await Circuit.find();
    return circuits.map((circuit) => ({
      id: circuit.id,
      name: circuit.name,
      local: circuit.local,
    }));
  }

  async findOne(id: number) {
    const circuit = await Circuit.findOne({ where: { id } });
    if (!circuit) throw new NotFoundException({ message: 'Circuit not found' });
    return circuit;
  }

  async update(id: number, updateCircuitDto: UpdateCircuitDto) {
    return `This action updates a #${id} circuit`;
  }

  async remove(id: number) {
    return `This action removes a #${id} circuit`;
  }
}
