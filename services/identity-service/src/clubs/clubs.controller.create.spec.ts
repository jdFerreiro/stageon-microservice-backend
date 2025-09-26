import { Test, TestingModule } from '@nestjs/testing';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const mockClubsService = {
  create: jest.fn((dto) => ({ id: 1, ...dto })),
};

describe('ClubsController Integration', () => {
  let controller: ClubsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubsController],
      providers: [
        { provide: ClubsService, useValue: mockClubsService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ClubsController>(ClubsController);
  });

  it('should create a club with empty optional fields', async () => {
    const dto = {
      address: '',
      description: '',
      email: '',
      logo: '',
      name: 'PPrueba',
      phone: '',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });
});
