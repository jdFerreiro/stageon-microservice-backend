import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.usersService.create(dto);
    } catch (error: any) {
      const status = error?.status || 500;
      const message = error?.message || 'Error desconocido';
      throw new HttpException({
        statusCode: status,
        message,
        error: 'Failed to create user',
      }, status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    try {
      return await this.usersService.findAll();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch users: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      return await this.usersService.findOne(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to fetch user: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    try {
      return await this.usersService.update(id, dto);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to update user: ' + message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  async remove(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      return await this.usersService.remove(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to remove user: ' + message);
    }
  }
}
