import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';
import { Event } from '../entities/event.entity';
import { EventDto } from './dto/event.dto';

@ApiTags('Eventos')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los eventos' })
  @ApiResponse({ status: 200, description: 'Lista de eventos', type: [Event] })
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento por ID' })
  @ApiParam({ name: 'id', description: 'ID del evento', example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 200, description: 'Evento encontrado', type: Event })
  findOne(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiBody({ type: EventDto })
  @ApiResponse({ status: 201, description: 'Evento creado', type: Event })
  async create(@Body() data: EventDto) {
    console.log(data); // Debe mostrar el objeto recibido
    return this.eventService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un evento existente' })
  @ApiParam({ name: 'id', description: 'ID del evento', example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiBody({ type: EventDto })
  @ApiResponse({ status: 200, description: 'Evento actualizado', type: Event })
  update(@Param('id') id: string, @Body() data: EventDto): Promise<Event | null> {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento por ID' })
  @ApiParam({ name: 'id', description: 'ID del evento', example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab' })
  @ApiResponse({ status: 204, description: 'Evento eliminado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.eventService.remove(id);
  }

  @Get('/statuses/all')
  @ApiOperation({ summary: 'Obtener todos los estatus de evento' })
  @ApiResponse({ status: 200, description: 'Lista de estatus', type: [Object] })
  getStatuses() {
    return this.eventService.getStatuses();
  }

    @Get('/club/:clubId')
    @ApiOperation({ summary: 'Obtener eventos por club' })
    @ApiParam({ name: 'clubId', description: 'ID del club', example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab' })
    @ApiResponse({ status: 200, description: 'Lista de eventos del club', type: [Event] })
    findByClub(@Param('clubId') clubId: string): Promise<Event[]> {
      return this.eventService.findByClub(clubId);
    }
}
