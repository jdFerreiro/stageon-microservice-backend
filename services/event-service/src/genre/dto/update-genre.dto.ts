import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGenreDto {
  @ApiPropertyOptional({ example: 'Musical', description: 'Nombre único del género' })
  name?: string;

  @ApiPropertyOptional({ example: 'Obras musicales, teatro musical, etc.', description: 'Descripción del género' })
  description?: string;
}
