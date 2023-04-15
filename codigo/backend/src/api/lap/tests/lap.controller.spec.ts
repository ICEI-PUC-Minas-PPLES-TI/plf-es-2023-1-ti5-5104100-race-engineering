import { Test, TestingModule } from '@nestjs/testing';
import { LapController } from '../lap.controller';
import { LapService } from '../lap.service';

describe('LapController', () => {
  let controller: LapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LapController],
      providers: [LapService],
    }).compile();

    controller = module.get<LapController>(LapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
