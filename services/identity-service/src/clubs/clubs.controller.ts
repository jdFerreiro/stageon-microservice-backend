import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { ClubResponseDto } from './dto/club-response.dto';

@ApiTags('clubs')
@ApiBearerAuth('jwt')
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear club' })
  @ApiResponse({ status: 201, type: ClubResponseDto })
  create(@Body() data: CreateClubDto): Promise<ClubResponseDto> {
    return this.clubsService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos los clubes' })
  @ApiResponse({ status: 200, type: [ClubResponseDto] })
  findAll(): Promise<ClubResponseDto[]> {
    return this.clubsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un club por ID' })
  @ApiResponse({ status: 200, type: ClubResponseDto })
  findOne(@Param('id') id: string): Promise<ClubResponseDto> {
    return this.clubsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar club' })
  @ApiResponse({ status: 200, type: ClubResponseDto })
  update(@Param('id') id: string, @Body() data: UpdateClubDto): Promise<ClubResponseDto> {
    return this.clubsService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar club' })
  @ApiResponse({ status: 200, type: ClubResponseDto })
  remove(@Param('id') id: string): Promise<ClubResponseDto> {
    return this.clubsService.remove(id);
  }
}
