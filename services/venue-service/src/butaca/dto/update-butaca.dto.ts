import { PartialType } from '@nestjs/mapped-types';
import { CreateButacaDto } from './create-butaca.dto';

export class UpdateButacaDto extends PartialType(CreateButacaDto) {}
