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
import { ButacaService } from './butaca.service';
import { CreateButacaDto } from './dto/create-butaca.dto';
import { UpdateButacaDto } from './dto/update-butaca.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('butaca')
@UseGuards(AuthGuard('jwt'))
@Controller('butaca')
export class ButacaController {
  constructor(private readonly butacaService: ButacaService) {}

  @Post()
  create(@Body() createButacaDto: CreateButacaDto) {
    return this.butacaService.create(createButacaDto);
  }

  @Get()
  findAll() {
    return this.butacaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.butacaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateButacaDto: UpdateButacaDto) {
    return this.butacaService.update(id, updateButacaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.butacaService.remove(id);
  }
}
