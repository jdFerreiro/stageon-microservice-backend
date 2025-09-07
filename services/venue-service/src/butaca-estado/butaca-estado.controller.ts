import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ButacaEstadoService } from './butaca-estado.service';
import { CreateButacaEstadoDto } from './dto/create-butaca-estado.dto';
import { UpdateButacaEstadoDto } from './dto/update-butaca-estado.dto';

@Controller('butaca-estado')
export class ButacaEstadoController {
  constructor(private readonly butacaEstadoService: ButacaEstadoService) {}

  @Post()
  create(@Body() createButacaEstadoDto: CreateButacaEstadoDto) {
    return this.butacaEstadoService.create(createButacaEstadoDto);
  }

  @Get()
  findAll() {
    return this.butacaEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.butacaEstadoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateButacaEstadoDto: UpdateButacaEstadoDto,
  ) {
    return this.butacaEstadoService.update(id, updateButacaEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.butacaEstadoService.remove(id);
  }
}
