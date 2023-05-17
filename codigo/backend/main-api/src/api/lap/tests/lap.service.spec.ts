import { Test, TestingModule } from '@nestjs/testing';
import { LapService } from '../lap.service';

describe('LapService', () => {
  let service: LapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LapService],
    }).compile();

    service = module.get<LapService>(LapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
