import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClub } from '../entities/userClub';
import { User } from '../entities/user';
import { Club } from '../entities/club';

@Injectable()
export class UserClubService {
  constructor(
    @InjectRepository(UserClub)
    private readonly userClubRepository: Repository<UserClub>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async addUserToClub(userId: string, clubId: string, memberNumber?: string): Promise<UserClub> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    const club = await this.clubRepository.findOneByOrFail({ id: clubId });
    const userClub = this.userClubRepository.create({ user, club, memberNumber });
    return this.userClubRepository.save(userClub);
  }

  async removeUserFromClub(userId: string, clubId: string): Promise<void> {
    await this.userClubRepository.delete({ user: { id: userId }, club: { id: clubId } });
  }

  async getClubsForUser(userId: string): Promise<UserClub[]> {
    return this.userClubRepository.find({ where: { user: { id: userId } }, relations: ['club'] });
  }

  async getUsersForClub(clubId: string): Promise<UserClub[]> {
    return this.userClubRepository.find({ where: { club: { id: clubId } }, relations: ['user'] });
  }
}
