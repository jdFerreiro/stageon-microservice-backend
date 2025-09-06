import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtService } from '@nestjs/jwt';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(), // mockea los métodos que uses en el guard
          },
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a role', async () => {
    const dto: CreateRoleDto = { name: 'Admin' };
    (service.create as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    expect(await controller.create(dto)).toEqual({ id: '1', ...dto });
  });

  it('should return all roles', async () => {
    const roles = [{ id: '1', name: 'Admin' }];
    (service.findAll as jest.Mock).mockResolvedValue(roles);
    expect(await controller.findAll()).toEqual(roles);
  });

  it('should return one role', async () => {
    const role = { id: '1', name: 'Admin' };
    (service.findOne as jest.Mock).mockResolvedValue(role);
    expect(await controller.findOne('1')).toEqual(role);
  });

  it('should update a role', async () => {
    const dto: UpdateRoleDto = { name: 'User' };
    const updated = { id: '1', ...dto };
    (service.update as jest.Mock).mockResolvedValue(updated);
    expect(await controller.update('1', dto)).toEqual(updated);
  });

  it('should remove a role', async () => {
    const removed = { id: '1', name: 'Admin' };
    (service.remove as jest.Mock).mockResolvedValue(removed);
    expect(await controller.remove('1')).toEqual(removed);
  });
});
