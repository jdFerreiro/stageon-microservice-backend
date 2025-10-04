import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Musical', description: 'Nombre único del género' })
  name: string;

  @ApiProperty({ example: 'Obras musicales, teatro musical, etc.', description: 'Descripción del género', required: false })
  description?: string;
}
