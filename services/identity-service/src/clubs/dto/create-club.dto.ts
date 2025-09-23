import { ApiProperty } from '@nestjs/swagger';

export class CreateClubDto {
  @ApiProperty({ example: 'Hermandad Gallega de Venezuela' })
  name: string;

  @ApiProperty({ example: 'Club social y deportivo de la comunidad gallega en Venezuela.', required: false })
  description?: string;

  @ApiProperty({ example: 'Av. Principal de Maripérez, Caracas, Venezuela', required: false })
  address?: string;

  @ApiProperty({ example: '+58 212-1234567', required: false })
  phone?: string;

  @ApiProperty({ example: 'logo_base64_string', required: false, description: 'Logo en base64' })
  logo?: string;

  @ApiProperty({ example: 'info@club.com', required: false })
  email?: string;
}
