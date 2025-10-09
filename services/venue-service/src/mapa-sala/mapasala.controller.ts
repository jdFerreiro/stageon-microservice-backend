 import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MapaSalaService } from './mapasala.service';
import { CreateMapaSalaDto } from './dto/create-mapasala.dto';
import { UpdateMapaSalaDto } from './dto/update-mapasala.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('Mapa de la sala')
@UseGuards(AuthGuard('jwt'))
@Controller('mapasala')
export class MapaSalaController {
  constructor(private readonly mapasalaService: MapaSalaService) {}


  @Post()
  create(@Body() createMapaSalaDto: CreateMapaSalaDto) {
    return this.mapasalaService.create(createMapaSalaDto);
  }

  @Get()
  findAll() {
    return this.mapasalaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mapasalaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMapaSalaDto: UpdateMapaSalaDto,
  ) {
    return this.mapasalaService.update(id, updateMapaSalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapasalaService.remove(id);
  }

  @Get('sala/:salaId')
  findBySala(@Param('salaId') salaId: string) {
    return this.mapasalaService.findBySala(salaId);
  }
}
