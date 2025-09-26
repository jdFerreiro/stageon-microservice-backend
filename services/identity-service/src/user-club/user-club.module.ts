import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserClub } from '../entities/userClub';
import { User } from '../entities/user';
import { Club } from '../entities/club';
import { UserClubService } from './user-club.service';
import { UserClubController } from './user-club.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserClub, User, Club]), JwtModule],
  controllers: [UserClubController],
  providers: [UserClubService],
  exports: [UserClubService],
})
export class UserClubModule {}
