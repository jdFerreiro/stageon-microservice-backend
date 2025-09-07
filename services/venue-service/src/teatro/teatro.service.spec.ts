import { Test, TestingModule } from '@nestjs/testing';
import { TeatroService } from './teatro.service';

describe('TeatroService', () => {
  let service: TeatroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeatroService],
    }).compile();

    service = module.get<TeatroService>(TeatroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
