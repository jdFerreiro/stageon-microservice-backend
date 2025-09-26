import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserTypesService } from './user-types.service';
import { UserTypeResponseDto } from './dto/user-type-response.dto';

@ApiTags('user-types')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear user type' })
  @ApiResponse({ status: 201, type: UserTypeResponseDto })
  create(@Body() data: CreateUserTypeDto): Promise<UserTypeResponseDto> {
    return this.userTypesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los user types' })
  @ApiResponse({ status: 200, type: [UserTypeResponseDto] })
  findAll(): Promise<UserTypeResponseDto[]> {
    return this.userTypesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un user type por ID' })
  @ApiResponse({ status: 200, type: UserTypeResponseDto })
  findOne(@Param('id') id: string): Promise<UserTypeResponseDto> {
    return this.userTypesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar user type' })
  @ApiResponse({ status: 200, type: UserTypeResponseDto })
  update(@Param('id') id: string, @Body() data: UpdateUserTypeDto): Promise<UserTypeResponseDto> {
    return this.userTypesService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar user type' })
  @ApiResponse({ status: 200, type: UserTypeResponseDto })
  remove(@Param('id') id: string): Promise<UserTypeResponseDto> {
    return this.userTypesService.remove(id);
  }
}
