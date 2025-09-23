import { Module } from '@nestjs/common';
import { RoleController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), JwtModule],
  controllers: [RoleController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
