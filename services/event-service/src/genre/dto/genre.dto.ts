import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenreDto {
  @ApiPropertyOptional({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab', description: 'ID único del género (UUID)' })
  id?: string;

  @ApiProperty({ example: 'Musical', description: 'Nombre del género' })
  name: string;

  @ApiPropertyOptional({ example: 'Obras musicales, teatro musical, etc.', description: 'Descripción del género' })
  description?: string;
}
