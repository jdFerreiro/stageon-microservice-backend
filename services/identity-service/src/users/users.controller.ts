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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
      try {
        return await this.usersService.create(dto);
      } catch (error: any) {
        throw new Error('Failed to create user: ' + (error?.message || String(error)));
      }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
      try {
        return await this.usersService.findAll();
      } catch (error: any) {
        throw new Error('Failed to fetch users: ' + (error?.message || String(error)));
      }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
      try {
        return await this.usersService.findOne(id);
      } catch (error: any) {
        throw new Error('Failed to fetch user: ' + (error?.message || String(error)));
      }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
      try {
        return await this.usersService.update(id, dto);
      } catch (error: any) {
        throw new Error('Failed to update user: ' + (error?.message || String(error)));
      }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
      try {
        return await this.usersService.remove(id);
      } catch (error: any) {
        throw new Error('Failed to remove user: ' + (error?.message || String(error)));
      }
  }
}
