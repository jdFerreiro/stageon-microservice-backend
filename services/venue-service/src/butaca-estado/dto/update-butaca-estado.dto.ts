import { PartialType } from '@nestjs/mapped-types';
import { CreateButacaEstadoDto } from './create-butaca-estado.dto';

export class UpdateButacaEstadoDto extends PartialType(CreateButacaEstadoDto) {}
