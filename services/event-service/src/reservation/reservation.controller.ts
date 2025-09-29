import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReservationService } from './reservation.service';
import { Reservation } from '../entities/reservation.entity';
import { ReservationDto } from './dto/reservation.dto';

@ApiTags('Reservaciones')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservaciones' })
  @ApiResponse({ status: 200, description: 'Lista de reservaciones', type: [ReservationDto] })
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reservación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reservación', example: 'r1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Reservación encontrada', type: ReservationDto })
  findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reservación' })
  @ApiBody({ type: ReservationDto })
  @ApiResponse({ status: 201, description: 'Reservación creada', type: ReservationDto })
  create(@Body() data: ReservationDto): Promise<Reservation> {
    return this.reservationService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reservación existente' })
  @ApiParam({ name: 'id', description: 'ID de la reservación', example: 'r1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiBody({ type: ReservationDto })
  @ApiResponse({ status: 200, description: 'Reservación actualizada', type: ReservationDto })
  update(@Param('id') id: string, @Body() data: ReservationDto): Promise<Reservation | null> {
    return this.reservationService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reservación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reservación', example: 'r1a2b3c4-d5e6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 204, description: 'Reservación eliminada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.reservationService.remove(id);
  }

  @Get('/statuses/all')
  @ApiOperation({ summary: 'Obtener todos los estatus de reservación' })
  @ApiResponse({ status: 200, description: 'Lista de estatus', type: [Object] })
  getStatuses() {
    return this.reservationService.getStatuses();
  }
}
