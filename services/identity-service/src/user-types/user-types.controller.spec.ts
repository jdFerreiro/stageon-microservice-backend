import { Test, TestingModule } from '@nestjs/testing';
import { UserTypesController } from './user-types.controller';
import { UserTypesService } from './user-types.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Mock service
const mockUserTypesService = {
  findAll: jest.fn(() => [{ id: 1, name: 'Admin' }]),
  findOne: jest.fn((id) => ({ id, name: 'Admin' })),
  create: jest.fn((dto) => ({ id: 1, ...dto })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn((id) => ({ deleted: true })),
};

const mockJwtAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('UserTypesController', () => {
  let controller: UserTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTypesController],
      providers: [
        { provide: UserTypesService, useValue: mockUserTypesService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<UserTypesController>(UserTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all user types', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'Admin' }]);
  });

  it('should return one user type', async () => {
    expect(await controller.findOne('1')).toEqual({ id: '1', name: 'Admin' });
  });

  it('should create a user type', async () => {
    const dto = { name: 'User' };
    expect(await controller.create(dto)).toEqual({ id: 1, name: 'User' });
  });

  it('should update a user type', async () => {
    const dto = { name: 'Updated' };
    expect(await controller.update('1', dto)).toEqual({ id: '1', name: 'Updated' });
  });

  it('should remove a user type', async () => {
    expect(await controller.remove('1')).toEqual({ deleted: true });
  });
});
