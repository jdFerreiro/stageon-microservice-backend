import { Test, TestingModule } from '@nestjs/testing';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const mockClubsService = {
  findAll: jest.fn(() => [{ id: 1, name: 'Club Test' }]),
  findOne: jest.fn((id) => ({ id, name: 'Club Test' })),
  create: jest.fn((dto) => ({ id: 1, ...dto })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn((id) => ({ deleted: true })),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('ClubsController', () => {
  let controller: ClubsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubsController],
      providers: [
        { provide: ClubsService, useValue: mockClubsService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<ClubsController>(ClubsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all clubs', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'Club Test' }]);
  });

  it('should return one club', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', name: 'Club Test' });
  });

  it('should create a club', async () => {
    const dto = { name: 'New Club' };
    expect(await controller.create(dto)).toEqual({ id: 1, name: 'New Club' });
  });

  it('should update a club', async () => {
    const dto = { name: 'Updated Club' };
    expect(await controller.update('1', dto)).toEqual({ id: '1', name: 'Updated Club' });
  });

  it('should remove a club', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true });
  });
});
