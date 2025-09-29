import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FunctionDto {
  @ApiPropertyOptional({ example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID único de la función (UUID)' })
  id?: string;

  @ApiProperty({ example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab', description: 'ID del evento asociado' })
  eventId: string;

  @ApiProperty({ example: 'v1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la sala (venue)' })
  venueId: string;

  @ApiProperty({ example: '2025-10-01T20:00:00Z', description: 'Fecha y hora de inicio de la función' })
  startTime: Date;

  @ApiProperty({ example: '2025-10-01T22:00:00Z', description: 'Fecha y hora de fin de la función' })
  endTime: Date;

  @ApiPropertyOptional({ example: 'Español', description: 'Idioma de la función' })
  language?: string;

  @ApiPropertyOptional({ example: '3D', description: 'Formato de la función (2D, 3D, subtitulada, etc.)' })
  format?: string;

  @ApiPropertyOptional({ example: 2, description: 'ID del estatus de la función' })
  statusId?: number;

  @ApiPropertyOptional({ example: '2025-09-16T00:00:00Z', description: 'Inicio de pre-venta para la función' })
  preSaleStart?: Date;

  @ApiPropertyOptional({ example: '2025-09-30T00:00:00Z', description: 'Fin de pre-venta para la función' })
  preSaleEnd?: Date;
}
