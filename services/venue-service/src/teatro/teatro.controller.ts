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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiTags('teatro')
@UseGuards(AuthGuard('jwt'))
@Controller('teatro')
export class TeatroController {
  constructor(private readonly teatroService: TeatroService) {}

  @Post()
  create(@Body() createTeatroDto: CreateTeatroDto) {
    return this.teatroService.create(createTeatroDto);
  }

  @Get()
  findAll() {
    return this.teatroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teatroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeatroDto: UpdateTeatroDto) {
    return this.teatroService.update(id, updateTeatroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teatroService.remove(id);
  }
}
