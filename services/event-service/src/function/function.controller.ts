import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FunctionService } from './function.service';
import { FunctionEntity } from '../entities/function.entity';

@Controller('functions')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Get()
  findAll(): Promise<FunctionEntity[]> {
    return this.functionService.findAll();
  }

  @Get('/venue/:venueId')
  findByVenue(@Param('venueId') venueId: string): Promise<FunctionEntity[]> {
    return this.functionService.findByVenue(venueId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FunctionEntity | null> {
    return this.functionService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<FunctionEntity>): Promise<FunctionEntity> {
    return this.functionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<FunctionEntity>): Promise<FunctionEntity | null> {
    return this.functionService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.functionService.remove(id);
  }

  @Get('/statuses/all')
  getStatuses() {
    return this.functionService.getStatuses();
  }
}
