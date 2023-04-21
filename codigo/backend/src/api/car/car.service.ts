import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from '@/api/car/models/car.dto';
import { Car } from '@/api/car/models/car.entity';

@Injectable()
export class CarService {
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = new Car();
    // car.name = createCarDto.name;
    car.totalFuel = createCarDto.totalFuel;
    car.currentFuel = createCarDto.currentFuel;
    return await Car.save(car);
  }

  async findAll(): Promise<Car[]> {
    return await Car.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await Car.findOne({ where: { id } });
    if (!car) throw new NotFoundException({ message: 'Car not found' });
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    // car.name = updateCarDto.name || car.name;
    car.totalFuel = updateCarDto.totalFuel || car.totalFuel;
    car.currentFuel = updateCarDto.currentFuel || car.currentFuel;
    return await Car.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return await Car.softRemove(car);
  }
}
