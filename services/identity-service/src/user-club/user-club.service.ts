import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClub } from '../entities/userClub';
import { User } from '../entities/user';
import { Club } from '../entities/club';
import { UserClubResponseDto } from './dto/user-club-response.dto';

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

  async addUserToClub(userId: string, clubId: string, memberNumber?: string): Promise<UserClubResponseDto> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    const club = await this.clubRepository.findOneByOrFail({ id: clubId });
    const userClub = this.userClubRepository.create({ user, club, memberNumber });
    const saved = await this.userClubRepository.save(userClub);
    return this.toResponseDto(saved);
  }

  async updateMemberNumber(id: string, memberNumber?: string): Promise<UserClubResponseDto> {
    const userClub = await this.userClubRepository.findOne({ where: { id }, relations: ['user', 'club'] });
    if (!userClub) {
      throw new Error('Relación usuario-club no encontrada');
    }
  userClub.memberNumber = typeof memberNumber === 'string' ? memberNumber : null;
    const saved = await this.userClubRepository.save(userClub);
    return this.toResponseDto(saved);
  }

  async removeUserFromClub(userId: string, clubId: string): Promise<void> {
    await this.userClubRepository.delete({ user: { id: userId }, club: { id: clubId } });
  }

  async getClubsForUser(userId: string): Promise<UserClubResponseDto[]> {
    const rels = await this.userClubRepository.find({ where: { user: { id: userId } }, relations: ['club'] });
    return rels.map(this.toResponseDto);
  }

  async getUsersForClub(clubId: string): Promise<UserClubResponseDto[]> {
    const rels = await this.userClubRepository.find({ where: { club: { id: clubId } }, relations: ['user'] });
    return rels.map(this.toResponseDto);
  }

  private toResponseDto(entity: UserClub): UserClubResponseDto {
    return {
      id: entity.id,
      userId: entity.user?.id,
      clubId: entity.club?.id,
      memberNumber: entity.memberNumber ?? null,
    };
  }
}
