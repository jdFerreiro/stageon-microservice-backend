import { PartialType } from '@nestjs/mapped-types';
import { CreateTeatroDto } from './create-teatro.dto';

export class UpdateTeatroDto extends PartialType(CreateTeatroDto) {}
