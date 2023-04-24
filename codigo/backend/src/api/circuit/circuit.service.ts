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

    return await circuit.save();
  }

  async findAll(): Promise<ListedCircuit[]> {
    const circuits = await Circuit.find();
    return circuits.map((circuit) => ({
      id: circuit.id,
      name: circuit.name,
      local: circuit.local,
    }));
  }

  async findOne(id: number): Promise<Circuit> {
    const circuit = await Circuit.findOne({ where: { id } });
    if (!circuit) throw new NotFoundException({ message: 'Circuit not found' });
    return circuit;
  }

  async update(id: number, body: UpdateCircuitDto): Promise<Circuit> {
    const circuit = await this.findOne(id);
    circuit.name = body.name || circuit.name;
    circuit.local = body.local || circuit.local;
    circuit.trackSize = body.trackSize || circuit.trackSize;
    circuit.safetyMargin = body.safetyMargin || circuit.safetyMargin;
    return await circuit.save();
  }

  async remove(id: number): Promise<Circuit> {
    const circuit = await this.findOne(id);
    return await circuit.softRemove();
  }
}
