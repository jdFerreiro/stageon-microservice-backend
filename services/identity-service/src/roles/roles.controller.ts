import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@ApiBearerAuth('jwt')
@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    try {
      return await this.service.create(dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to create role: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch roles: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch role: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    try {
      return await this.service.update(id, dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to update role: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.service.remove(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to remove role: ' + message);
    }
  }
}
