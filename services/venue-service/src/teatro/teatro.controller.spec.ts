import { Test, TestingModule } from '@nestjs/testing';
import { TeatroController } from './teatro.controller';
import { TeatroService } from './teatro.service';

describe('TeatroController', () => {
  let controller: TeatroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeatroController],
      providers: [TeatroService],
    }).compile();

    controller = module.get<TeatroController>(TeatroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
