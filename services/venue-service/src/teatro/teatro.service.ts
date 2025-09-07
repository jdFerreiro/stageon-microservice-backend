import { Injectable } from '@nestjs/common';
import { CreateTeatroDto } from './dto/create-teatro.dto';
import { UpdateTeatroDto } from './dto/update-teatro.dto';

@Injectable()
export class TeatroService {
  create(createTeatroDto: CreateTeatroDto) {
    return 'This action adds a new teatro';
  }

  findAll() {
    return `This action returns all teatro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teatro`;
  }

  update(id: number, updateTeatroDto: UpdateTeatroDto) {
    return `This action updates a #${id} teatro`;
  }

  remove(id: number) {
    return `This action removes a #${id} teatro`;
  }
}
