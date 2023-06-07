import { Test, TestingModule } from '@nestjs/testing';
import { RandomCodeService } from './random-code.service';

describe('RandomCodeService', () => {
  let service: RandomCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomCodeService],
    }).compile();

    service = module.get<RandomCodeService>(RandomCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
