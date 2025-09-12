import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      email: 'test@mail.com',
      password: '12345678',
      firstName: 'Test',
      lastName: 'User',
      roleId: 'role-id',
    };
    (service.create as jest.Mock).mockResolvedValue({ id: '1', ...dto });
    expect(await controller.create(dto)).toEqual({ id: '1', ...dto });
  });

  it('should return all users', async () => {
    const users = [{ id: '1', email: 'test@mail.com' }];
    (service.findAll as jest.Mock).mockResolvedValue(users);
    expect(await controller.findAll()).toEqual(users);
  });

  it('should return one user', async () => {
    const user = { id: '1', email: 'test@mail.com' };
    (service.findOne as jest.Mock).mockResolvedValue(user);
    expect(await controller.findOne('1')).toEqual(user);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { email: 'updated@mail.com' };
    const updated = { id: '1', ...dto };
    (service.update as jest.Mock).mockResolvedValue(updated);
    expect(await controller.update('1', dto)).toEqual(updated);
  });

  it('should remove a user', async () => {
    const removed = { id: '1', email: 'test@mail.com' };
    (service.remove as jest.Mock).mockResolvedValue(removed);
    expect(await controller.remove('1')).toEqual(removed);
  });
});
