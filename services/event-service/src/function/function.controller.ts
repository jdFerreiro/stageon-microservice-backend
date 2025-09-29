import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FunctionService } from './function.service';
import { FunctionEntity } from '../entities/function.entity';
import { FunctionDto } from './dto/function.dto';

@ApiTags('Funciones')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('functions')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las funciones' })
  @ApiResponse({ status: 200, description: 'Lista de funciones', type: [FunctionDto] })
  findAll(): Promise<FunctionEntity[]> {
    return this.functionService.findAll();
  }

  @Get('/venue/:venueId')
  @ApiOperation({ summary: 'Obtener funciones por sala (venue)' })
  @ApiParam({ name: 'venueId', description: 'ID de la sala (venue)', example: 'v1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Lista de funciones para la sala', type: [FunctionDto] })
  findByVenue(@Param('venueId') venueId: string): Promise<FunctionEntity[]> {
    return this.functionService.findByVenue(venueId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una función por ID' })
  @ApiParam({ name: 'id', description: 'ID de la función', example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Función encontrada', type: FunctionDto })
  findOne(@Param('id') id: string): Promise<FunctionEntity | null> {
    return this.functionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva función' })
  @ApiBody({ type: FunctionDto })
  @ApiResponse({ status: 201, description: 'Función creada', type: FunctionDto })
  create(@Body() data: FunctionDto): Promise<FunctionEntity> {
    return this.functionService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una función existente' })
  @ApiParam({ name: 'id', description: 'ID de la función', example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiBody({ type: FunctionDto })
  @ApiResponse({ status: 200, description: 'Función actualizada', type: FunctionDto })
  update(@Param('id') id: string, @Body() data: FunctionDto): Promise<FunctionEntity | null> {
    return this.functionService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una función por ID' })
  @ApiParam({ name: 'id', description: 'ID de la función', example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 204, description: 'Función eliminada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.functionService.remove(id);
  }

  @Get('/statuses/all')
  @ApiOperation({ summary: 'Obtener todos los estatus de función' })
  @ApiResponse({ status: 200, description: 'Lista de estatus', type: [Object] })
  getStatuses() {
    return this.functionService.getStatuses();
  }
}
