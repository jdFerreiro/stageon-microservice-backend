import { Test, TestingModule } from '@nestjs/testing';
import { UserClubController } from './user-club.controller';
import { UserClubService } from './user-club.service';

const mockUserClubService = {
  addUserToClub: jest.fn((userId, clubId, memberNumber) => ({ id: 1, userId, clubId, memberNumber })),
  removeUserFromClub: jest.fn((userId, clubId) => undefined),
  getClubsForUser: jest.fn((userId) => [{ id: 1, userId, clubId: '1', memberNumber: '123' }]),
  getUsersForClub: jest.fn((clubId) => [{ id: 1, userId: '1', clubId, memberNumber: '123' }]),
};

describe('UserClubController', () => {
  let controller: UserClubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserClubController],
      providers: [
        { provide: UserClubService, useValue: mockUserClubService },
      ],
    }).compile();

    controller = module.get<UserClubController>(UserClubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a user to a club', async () => {
    const dto = { userId: '2', clubId: '3', memberNumber: '123' };
    expect(await controller.addUserToClub(dto)).toEqual({ id: 1, userId: '2', clubId: '3', memberNumber: '123' });
  });

  it('should remove a user from a club', async () => {
    const dto = { userId: '2', clubId: '3' };
    expect(await controller.removeUserFromClub(dto)).toEqual({ message: 'Relación eliminada' });
  });

  it('should get clubs for a user', async () => {
    expect(await controller.getClubsForUser('2')).toEqual([{ id: 1, userId: '2', clubId: '1', memberNumber: '123' }]);
  });

  it('should get users for a club', async () => {
    expect(await controller.getUsersForClub('3')).toEqual([{ id: 1, userId: '1', clubId: '3', memberNumber: '123' }]);
  });
});
