import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClub } from '../entities/userClub';
import { User } from '../entities/user';
import { Club } from '../entities/club';
import { UserClubService } from './user-club.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserClub, User, Club])],
  providers: [UserClubService],
  exports: [UserClubService],
})
export class UserClubModule {}
