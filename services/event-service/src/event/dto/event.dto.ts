import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class EventDto {
  @ApiProperty({ example: 'El Rey León', description: 'Título del evento (obra, película, etc.)' })
  title: string;

  @ApiPropertyOptional({ example: 'Musical de Broadway', description: 'Descripción del evento' })
  description?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    description: 'ID del género asociado al evento',
  })
  genreId?: string;

  @ApiPropertyOptional({ example: 120, description: 'Duración en minutos' })
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'https://ejemplo.com/poster.jpg', description: 'URL de la imagen del evento' })
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'Obra', description: 'Tipo de evento (Obra, Película, Concierto, etc.)' })
  type?: string;

  @ApiPropertyOptional({ type: String, example: '2025-11-03' })
  releaseDate?: string;

  @ApiPropertyOptional({ example: 2, description: 'ID del estatus del evento' })
  statusId?: number;

  @ApiPropertyOptional({ type: String, example: '2025-10-01T00:00:00Z' })
  preSeasonStart?: string;

  @ApiPropertyOptional({ type: String, example: '2025-10-10T00:00:00Z' })
  preSeasonEnd?: string;

  @ApiPropertyOptional({ type: String, example: '2025-10-05T00:00:00Z' })
  preSaleStart?: string;

  @ApiPropertyOptional({ type: String, example: '2025-10-15T00:00:00Z' })
  preSaleEnd?: string;

  @ApiPropertyOptional({ type: Number, example: 5 })
  memberPrice?: number;

  @ApiPropertyOptional({ type: Number, example: 10 })
  nonMemberPrice?: number;

  @ApiPropertyOptional({
    example: '943dd862-799b-4d3a-8574-fee34c95214e',
    description: 'ID del club asociado al evento',
  })
  @IsOptional()
  @IsUUID()
  clubId?: string;
}
