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
import { TeatroService } from './teatro.service';
import { CreateTeatroDto } from './dto/create-teatro.dto';
import { UpdateTeatroDto } from './dto/update-teatro.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('Teatros')
@UseGuards(AuthGuard('jwt'))
@Controller('teatro')
export class TeatroController {
  constructor(private readonly teatroService: TeatroService) {}

  @Post()
  @ApiBody({ type: CreateTeatroDto })
  @ApiResponse({ status: 201, description: 'Teatro creado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createTeatroDto: CreateTeatroDto) {
    return this.teatroService.create(createTeatroDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de teatros.' })
  findAll() {
    return this.teatroService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID del teatro' })
  @ApiResponse({ status: 200, description: 'Teatro encontrado.' })
  @ApiResponse({ status: 404, description: 'Teatro no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.teatroService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID del teatro' })
  @ApiBody({ type: UpdateTeatroDto })
  @ApiResponse({ status: 200, description: 'Teatro actualizado correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Teatro no encontrado.' })
  update(@Param('id') id: string, @Body() updateTeatroDto: UpdateTeatroDto) {
    return this.teatroService.update(id, updateTeatroDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID del teatro' })
  @ApiResponse({ status: 200, description: 'Teatro eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Teatro no encontrado.' })
  remove(@Param('id') id: string) {
    return this.teatroService.remove(id);
  }
}
