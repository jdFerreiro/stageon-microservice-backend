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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('jwt')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/role')
  async addRole(@Param('id') id: string, @Body('role') role: string) {
    try {
      return await this.usersService.addRole(id, role);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to assign role: ' + message);
    }
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.usersService.create(dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to create user: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch users: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch user: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to update user: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to remove user: ' + message);
    }
  }
}
