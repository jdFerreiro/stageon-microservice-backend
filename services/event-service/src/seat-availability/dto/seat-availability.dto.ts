import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SeatAvailabilityDto {
  @ApiPropertyOptional({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab', description: 'ID único de la disponibilidad de butaca (UUID)' })
  id?: string;

  @ApiProperty({ example: 's1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la butaca (seat)' })
  seatId: string;

  @ApiPropertyOptional({ example: 'b1a2c3d4-e5f6-7890-abcd-1234567890ab', description: 'ID del evento (opcional)' })
  eventId?: string;

  @ApiPropertyOptional({ example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la función (opcional)' })
  functionId?: string;

  @ApiProperty({ example: 2, description: 'ID del estatus de la butaca (1: disponible, 2: bloqueada, etc.)' })
  statusId: number;

  @ApiPropertyOptional({ example: 'Butaca bloqueada por mantenimiento', description: 'Motivo de la restricción o bloqueo' })
  reason?: string;
}
