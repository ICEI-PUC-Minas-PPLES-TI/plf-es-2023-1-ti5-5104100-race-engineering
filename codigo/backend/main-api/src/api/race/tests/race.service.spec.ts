import { Test, TestingModule } from '@nestjs/testing';
import { RaceService } from '../race.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Race } from '../models/race.entity';
import { raceListMock, searchParamsMock, updatedRaceMock } from './race.mock';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import {
  adminListMock,
  analystsListMock,
  mechanicsListMock,
  userDriverListMock,
} from '../../user/tests/user.mock';
import { circuitListMock } from '../../circuit/tests/circuit.mock';
import { CircuitService } from '../../circuit/circuit.service';
import { DriverService } from '../../driver/driver.service';
import { driverListMock } from '../../driver/tests/driver.mock';
import { TeamService } from '../../team/team.service';
import { ProxyService } from '../../../notifications/proxy/proxy.service';

describe('RaceService', () => {
  let raceService: RaceService;
  let raceRepository: Repository<Race>;
  let userService: UserService;
  let circuitService: CircuitService;
  let driverService: DriverService;
  let teamService: TeamService;
  let proxyService: ProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RaceService,
        {
          provide: getRepositoryToken(Race),
          useValue: {
            create: jest.fn().mockResolvedValue(raceListMock[0]),
            save: jest.fn().mockResolvedValue(raceListMock[0]),
            find: jest.fn().mockResolvedValue(raceListMock),
            findOneOrFail: jest.fn().mockResolvedValue(raceListMock[0]),
            softDelete: jest.fn().mockResolvedValue(undefined),
            merge: jest.fn().mockResolvedValue(updatedRaceMock),
          },
        },
        UserService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockRejectedValue(mechanicsListMock[0]),
            findOneDetailed: jest.fn().mockResolvedValue(mechanicsListMock[0]),
          },
        },
        CircuitService,
        {
          provide: CircuitService,
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(circuitListMock[0]),
          },
        },
        DriverService,
        {
          provide: DriverService,
          useValue: {
            findOneDetailed: jest.fn().mockResolvedValue(driverListMock[0]),
            findOneOrFail: jest.fn().mockResolvedValue(driverListMock[0]),
          },
        },
        TeamService,
        {
          provide: TeamService,
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(driverListMock[0]),
          },
        },
        ProxyService,
        {
          provide: ProxyService,
          useValue: {
            notificationMicroservice: jest.fn(),
          },
        },
      ],
    }).compile();

    raceService = module.get<RaceService>(RaceService);
    raceRepository = module.get<Repository<Race>>(getRepositoryToken(Race));
    userService = module.get<UserService>(UserService);
    circuitService = module.get<CircuitService>(CircuitService);
    driverService = module.get<DriverService>(DriverService);
    teamService = module.get<TeamService>(TeamService);
    proxyService = module.get<ProxyService>(ProxyService);
  });

  it('should be defined', () => {
    expect(raceService).toBeDefined();
    expect(raceRepository).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a race', async () => {
  //     jest
  //       .spyOn(userService, 'findOne')
  //       .mockResolvedValueOnce(analystsListMock[0]);
  //
  //     const race = await raceService.create(createRaceMock);
  //     expect(circuitService.findOneOrFail).toHaveBeenCalled();
  //     expect(userService.findOne).toHaveBeenCalled();
  //     expect(raceService.findMechanics).toHaveBeenCalled();
  //     expect(raceService.findDrivers).toHaveBeenCalled();
  //     expect(raceService.findTeams).toHaveBeenCalled();
  //     expect(raceRepository.save).toHaveBeenCalled();
  //   });
  // });

  describe('findAll', () => {
    it('should return all races related to Driver', async () => {
      const races = raceService.findAll(
        userDriverListMock[0],
        searchParamsMock,
      );
      expect(races).resolves.toEqual(raceListMock);
    });

    it('should return all races related to Mechanic', async () => {
      const races = raceService.findAll(mechanicsListMock[0], searchParamsMock);
      expect(races).resolves.toEqual(raceListMock);
    });

    it('should return all races related to Analyst', async () => {
      const races = raceService.findAll(analystsListMock[0], searchParamsMock);
      expect(races).resolves.toEqual(raceListMock);
    });

    it('should return all races to Admin', async () => {
      const races = raceService.findAll(adminListMock[0], searchParamsMock);
      expect(races).resolves.toEqual(raceListMock);
    });
  });

  describe('findOneOrFail', () => {
    it('should return a race', async () => {
      const result = await raceService.findOneOrFail(1);
      expect(raceRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(raceListMock[0]);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(raceRepository, 'findOneOrFail')
        .mockRejectedValue(new Error('Race not found'));

      await expect(raceService.findOneOrFail(2)).rejects.toThrowError(
        'Race not found',
      );
    });
  });
});
