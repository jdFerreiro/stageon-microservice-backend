import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

let loginMock: jest.Mock;
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    loginMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: loginMock,
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
});
