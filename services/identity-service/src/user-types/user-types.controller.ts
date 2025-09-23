import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserTypesService } from './user-types.service';

@ApiTags('user-types')
@ApiBearerAuth('jwt')
@Controller('user-types')
export class UserTypesController {
  constructor(private readonly userTypesService: UserTypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear user type' })
  @ApiResponse({ status: 201, description: 'User type creado.' })
  create(@Body() data: any) {
    return this.userTypesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los user types' })
  @ApiResponse({ status: 200, description: 'Lista de user types.' })
  findAll() {
    return this.userTypesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un user type por ID' })
  @ApiResponse({ status: 200, description: 'User type encontrado.' })
  findOne(@Param('id') id: string) {
    return this.userTypesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar user type' })
  @ApiResponse({ status: 200, description: 'User type actualizado.' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.userTypesService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar user type' })
  @ApiResponse({ status: 200, description: 'User type eliminado.' })
  remove(@Param('id') id: string) {
    return this.userTypesService.remove(id);
  }
}
