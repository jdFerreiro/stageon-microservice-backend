import { PartialType } from '@nestjs/mapped-types';
import { CreateMapaSalaDto } from './create-mapasala.dto';

export class UpdateMapaSalaDto extends PartialType(CreateMapaSalaDto) {}
