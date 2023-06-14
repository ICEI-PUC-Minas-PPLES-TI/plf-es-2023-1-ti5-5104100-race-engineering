import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '../car.service';
import { Car } from '../models/car.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  carList,
  createCarMock,
  updateCarMock,
  updatedCarMock,
} from './car.mock';

describe('CarService', () => {
  let carService: CarService;
  let carRepository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useValue: {
            create: jest.fn().mockResolvedValue(carList[0]),
            save: jest.fn().mockResolvedValue(carList[0]),
            find: jest.fn().mockResolvedValue(carList),
            findOneOrFail: jest.fn().mockResolvedValue(carList[0]),
            softDelete: jest.fn().mockResolvedValue(undefined),
            merge: jest.fn().mockResolvedValue(updatedCarMock),
          },
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
    expect(carRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a car', async () => {
      const result = await carService.create(createCarMock);
      expect(carRepository.save).toHaveBeenCalledTimes(1);
      expect(carRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(carList[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result = await carService.findAll();
      expect(carRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(carList);
    });
  });

  describe('findOneOrFail', () => {
    it('should return a car', async () => {
      const result = await carService.findOneOrFail(1);
      expect(carRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(carList[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(carRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error('Car not found'));
      await expect(carService.findOneOrFail(2)).rejects.toThrowError(
        'Car not found',
      );
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      jest.spyOn(carRepository, 'save').mockResolvedValue(updatedCarMock);

      const result = await carService.update(1, updateCarMock);
      expect(carRepository.merge).toHaveBeenCalledTimes(1);
      expect(carRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedCarMock);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(carRepository, 'save')
        .mockRejectedValueOnce(new Error('Car not found'));
      await expect(carService.update(2, updateCarMock)).rejects.toThrowError(
        'Car not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove a car', async () => {
      const result = await carService.remove(1);
      expect(carRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(undefined);
    });
  });
});
