import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventDto {
  @ApiPropertyOptional({ example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab', description: 'ID único del evento (UUID)' })
  id?: string;

  @ApiProperty({ example: 'El Rey León', description: 'Título del evento (obra, película, etc.)' })
  title: string;

  @ApiPropertyOptional({ example: 'Musical de Broadway', description: 'Descripción del evento' })
  description?: string;

  @ApiPropertyOptional({ example: 'Musical', description: 'Género del evento' })
  genre?: string;

  @ApiPropertyOptional({ example: 120, description: 'Duración en minutos' })
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'https://ejemplo.com/poster.jpg', description: 'URL de la imagen del evento' })
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'iVBORw0KGgoAAAANSUhEUgAA...', description: 'Imagen del póster en formato base64' })
  posterImage?: string;

  @ApiPropertyOptional({ example: 'Obra', description: 'Tipo de evento (Obra, Película, Concierto, etc.)' })
  type?: string;

  @ApiPropertyOptional({ example: '2025-10-01', description: 'Fecha de estreno' })
  releaseDate?: Date;

  @ApiPropertyOptional({ example: 2, description: 'ID del estatus del evento' })
  statusId?: number;

  @ApiPropertyOptional({ example: '2025-09-01T00:00:00Z', description: 'Inicio de pre-temporada' })
  preSeasonStart?: Date;

  @ApiPropertyOptional({ example: '2025-09-15T00:00:00Z', description: 'Fin de pre-temporada' })
  preSeasonEnd?: Date;

  @ApiPropertyOptional({ example: '2025-09-16T00:00:00Z', description: 'Inicio de pre-venta' })
  preSaleStart?: Date;

  @ApiPropertyOptional({ example: '2025-09-30T00:00:00Z', description: 'Fin de pre-venta' })
  preSaleEnd?: Date;
}
