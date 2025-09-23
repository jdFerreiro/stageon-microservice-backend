import { ApiProperty } from '@nestjs/swagger';

export class ClubResponseDto {
  @ApiProperty({ description: 'ID del club', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nombre del club' })
  name: string;

  @ApiProperty({ description: 'Descripción', required: false })
  description?: string;

  @ApiProperty({ description: 'Dirección', required: false })
  address?: string;

  @ApiProperty({ description: 'Teléfono', required: false })
  phone?: string;

  @ApiProperty({ description: 'Logo en base64', required: false })
  logo?: string;

  @ApiProperty({ description: 'Email', required: false })
  email?: string;
}
