import { PartialType } from '@nestjs/mapped-types';
import { CreateSectorEstadoDto } from './create-sector-estado.dto';

export class UpdateSectorEstadoDto extends PartialType(CreateSectorEstadoDto) {}
