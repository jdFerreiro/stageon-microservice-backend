import { Injectable } from '@nestjs/common';
import { CreateButacaEstadoDto } from './dto/create-butaca-estado.dto';
import { UpdateButacaEstadoDto } from './dto/update-butaca-estado.dto';

@Injectable()
export class ButacaEstadoService {
  create(_createButacaEstadoDto: CreateButacaEstadoDto) {
    return 'This action adds a new butaca-estado';
  }

  findAll() {
    return 'This action returns all butaca-estado';
  }

  findOne(id: string) {
    return `This action returns a #${id} butaca-estado`;
  }

  update(id: string, _updateButacaEstadoDto: UpdateButacaEstadoDto) {
    return `This action updates a #${id} butaca-estado`;
  }

  remove(id: string) {
    return `This action removes a #${id} butaca-estado`;
  }
}
