
import { PartialType } from '@nestjs/mapped-types';
import { CreateTeatroDto } from './create-teatro.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeatroDto extends PartialType(CreateTeatroDto) {
	// Los decoradores de Swagger ya están heredados de CreateTeatroDto
}
