import { ApiProperty } from '@nestjs/swagger';

export class UserClubResponseDto {
  @ApiProperty({ description: 'ID de la relación', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
  userId: string;

  @ApiProperty({ description: 'ID del club', format: 'uuid' })
  clubId: string;

  @ApiProperty({ description: 'Número de socio', required: false, nullable: true })
  memberNumber: string | null;
}
