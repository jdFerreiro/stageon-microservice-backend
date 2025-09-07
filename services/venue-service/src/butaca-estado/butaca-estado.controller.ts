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
import { ButacaEstadoService } from './butaca-estado.service';
import { CreateButacaEstadoDto } from './dto/create-butaca-estado.dto';
import { UpdateButacaEstadoDto } from './dto/update-butaca-estado.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('butaca-estado')
export class ButacaEstadoController {
  constructor(private readonly service: ButacaEstadoService) {}

  @Post()
  create(@Body() createButacaEstadoDto: CreateButacaEstadoDto) {
    return this.service.create(createButacaEstadoDto);
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
    @Body() updateButacaEstadoDto: UpdateButacaEstadoDto,
  ) {
    return this.service.update(id, updateButacaEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
