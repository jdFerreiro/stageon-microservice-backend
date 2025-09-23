import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';

@ApiTags('clubs')
@ApiBearerAuth('jwt')
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear club' })
  @ApiResponse({ status: 201, description: 'Club creado.' })
  create(@Body() data: any) {
    return this.clubsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los clubes' })
  @ApiResponse({ status: 200, description: 'Lista de clubes.' })
  findAll() {
    return this.clubsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un club por ID' })
  @ApiResponse({ status: 200, description: 'Club encontrado.' })
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar club' })
  @ApiResponse({ status: 200, description: 'Club actualizado.' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.clubsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar club' })
  @ApiResponse({ status: 200, description: 'Club eliminado.' })
  remove(@Param('id') id: string) {
    return this.clubsService.remove(id);
  }
}
