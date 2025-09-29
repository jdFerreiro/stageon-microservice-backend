import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sala } from '../entities/sala.entity';
import { Repository, Not } from 'typeorm';

@Injectable()
export class SalaService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto) {
    const normalizedName = createSalaDto.name.trim().toLowerCase();
    const existingSala = await this.salaRepo.findOne({
      where: { name: normalizedName },
    });
    if (existingSala) {
      throw new ConflictException(
        `Sala con nombre ${createSalaDto.name} ya existe`,
      );
    }
    const sala = this.salaRepo.create({
      ...createSalaDto,
      name: normalizedName,
      teatro: { id: createSalaDto.teatroId },
    });
    const savedSala = await this.salaRepo.save(sala);
    // Devuelve la sala con los datos del teatro asociado
    return this.salaRepo.findOne({
      where: { id: savedSala.id },
      relations: ['teatro'],
    });
  }

  async findAll() {
    return this.salaRepo.find({ relations: ['teatro'] });
  }

  async findOne(id: string) {
    const sala = await this.salaRepo.findOne({
      where: { id },
      relations: ['teatro'],
    });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }
    return sala;
  }

  async update(id: string, updateSalaDto: UpdateSalaDto) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }

    if (updateSalaDto.name) {
      const normalizedName = updateSalaDto.name.trim().toLowerCase();
      const existingSala = await this.salaRepo.findOne({
        where: {
          name: normalizedName,
          id: Not(id), // Excluye el registro actual
        },
      });
      if (existingSala) {
        throw new ConflictException(
          `Sala con nombre ${updateSalaDto.name} ya existe`,
        );
      }
      updateSalaDto.name = normalizedName;
    }

    this.salaRepo.merge(sala, updateSalaDto);
    return this.salaRepo.save(sala);
  }

  async remove(id: string) {
    const sala = await this.salaRepo.findOneBy({ id });
    if (!sala) {
      throw new NotFoundException(`Sala con id ${id} no encontrado`);
    }
    return await this.salaRepo.remove(sala);
  }

  async findByTeatro(teatroId: string) {
    return this.salaRepo.find({
      where: { teatro: { id: teatroId } },
      relations: ['teatro'],
    });
  }
}
