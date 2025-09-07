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
import { SectorEstadoService } from './sector-estado.service';
import { CreateSectorEstadoDto } from './dto/create-sector-estado.dto';
import { UpdateSectorEstadoDto } from './dto/update-sector-estado.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sector-estado')
export class SectorEstadoController {
  constructor(private readonly service: SectorEstadoService) {}

  @Post()
  create(@Body() createSectorEstadoDto: CreateSectorEstadoDto) {
    return this.service.create(createSectorEstadoDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSectorEstadoDto: UpdateSectorEstadoDto,
  ) {
    return this.service.update(id, updateSectorEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
