import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { GenreService } from './genre.service';
import { Genre } from '../entities/genre.entity';
import { GenreDto } from './dto/genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@ApiTags('Géneros')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los géneros' })
  @ApiResponse({ status: 200, description: 'Lista de géneros', type: [GenreDto] })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por ID' })
  @ApiParam({ name: 'id', description: 'ID del género', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Género encontrado', type: GenreDto })
  findOne(@Param('id') id: string): Promise<Genre | null> {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo género' })
  @ApiBody({ type: CreateGenreDto })
  @ApiResponse({ status: 201, description: 'Género creado', type: GenreDto })
  create(@Body() data: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un género existente' })
  @ApiParam({ name: 'id', description: 'ID del género', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({ status: 200, description: 'Género actualizado', type: GenreDto })
  update(@Param('id') id: string, @Body() data: UpdateGenreDto): Promise<Genre | null> {
    return this.genreService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un género por ID' })
  @ApiParam({ name: 'id', description: 'ID del género', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 204, description: 'Género eliminado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.genreService.remove(id);
  }
}
