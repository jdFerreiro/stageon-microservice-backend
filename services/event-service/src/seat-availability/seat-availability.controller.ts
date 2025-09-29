import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SeatAvailabilityService } from './seat-availability.service';
import { SeatAvailability } from '../entities/seat-availability.entity';
import { SeatAvailabilityDto } from './dto/seat-availability.dto';

@ApiTags('Disponibilidad de Butacas')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('seat-availability')
export class SeatAvailabilityController {
  constructor(private readonly seatAvailabilityService: SeatAvailabilityService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las disponibilidades de butacas' })
  @ApiResponse({ status: 200, description: 'Lista de disponibilidades', type: [SeatAvailabilityDto] })
  findAll(): Promise<SeatAvailability[]> {
    return this.seatAvailabilityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una disponibilidad de butaca por ID' })
  @ApiParam({ name: 'id', description: 'ID de la disponibilidad', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Disponibilidad encontrada', type: SeatAvailabilityDto })
  findOne(@Param('id') id: string): Promise<SeatAvailability | null> {
    return this.seatAvailabilityService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva disponibilidad de butaca' })
  @ApiBody({ type: SeatAvailabilityDto })
  @ApiResponse({ status: 201, description: 'Disponibilidad creada', type: SeatAvailabilityDto })
  create(@Body() data: SeatAvailabilityDto): Promise<SeatAvailability> {
    return this.seatAvailabilityService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una disponibilidad de butaca existente' })
  @ApiParam({ name: 'id', description: 'ID de la disponibilidad', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiBody({ type: SeatAvailabilityDto })
  @ApiResponse({ status: 200, description: 'Disponibilidad actualizada', type: SeatAvailabilityDto })
  update(@Param('id') id: string, @Body() data: SeatAvailabilityDto): Promise<SeatAvailability | null> {
    return this.seatAvailabilityService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una disponibilidad de butaca por ID' })
  @ApiParam({ name: 'id', description: 'ID de la disponibilidad', example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 204, description: 'Disponibilidad eliminada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.seatAvailabilityService.remove(id);
  }

  @Get('/statuses/all')
  @ApiOperation({ summary: 'Obtener todos los estatus de disponibilidad de butaca' })
  @ApiResponse({ status: 200, description: 'Lista de estatus', type: [Object] })
  getStatuses() {
    return this.seatAvailabilityService.getStatuses();
  }
}
