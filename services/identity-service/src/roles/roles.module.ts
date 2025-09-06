import { Module } from '@nestjs/common';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RolesModule {}
