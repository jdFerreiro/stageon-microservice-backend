import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReservationDto {
  @ApiPropertyOptional({ example: 'r1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID único de la reservación (UUID)' })
  id?: string;

  @ApiProperty({ example: 'f1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la función reservada' })
  functionId: string;

  @ApiProperty({ example: 's1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la butaca reservada' })
  seatId: string;

  @ApiProperty({ example: 'v1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID de la sala (venue)' })
  venueId: string;

  @ApiProperty({ example: 'u1a2b3c4-d5e6-7890-abcd-1234567890ab', description: 'ID del usuario que reserva' })
  userId: string;

  @ApiPropertyOptional({ example: '2025-09-29T12:00:00Z', description: 'Fecha y hora de la reservación' })
  reservedAt?: Date;

  @ApiPropertyOptional({ example: true, description: 'Indica si la reservación está pagada' })
  isPaid?: boolean;

  @ApiPropertyOptional({ example: 2, description: 'ID del estatus de la reservación' })
  statusId?: number;
}
