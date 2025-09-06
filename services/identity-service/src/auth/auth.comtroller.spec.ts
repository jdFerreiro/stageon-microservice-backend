import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

let loginMock: jest.Mock;
let registerMock: jest.Mock;
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    loginMock = jest.fn();
    registerMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: loginMock,
            register: registerMock,
            getProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('debería devolver un token al hacer login', async () => {
      const mockResult = {
        access_token: 'jwt-token',
        user: { id: 1, name: 'David' },
      };
      loginMock.mockResolvedValue(mockResult);

      const dto: LoginDto = { email: 'test@mail.com', password: '123456' };
      const result = await controller.login(dto);

      expect(result).toEqual(mockResult);
      expect(loginMock).toHaveBeenCalledWith(dto);
    });
  });

  describe('register', () => {
    it('debería crear un usuario nuevo', async () => {
      const mockResult = {
        access_token: 'jwt-token',
      };
      registerMock.mockResolvedValue(mockResult);

      const dto: RegisterDto = {
        email: 'test@mail.com',
        password: '123456',
        firstName: 'David',
        lastName: 'Smith',
      };
      const result = await controller.register(dto);

      expect(result).toEqual(mockResult);
      expect(registerMock).toHaveBeenCalledWith(dto);
    });
  });
});
