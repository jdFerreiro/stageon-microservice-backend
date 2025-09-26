import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ example: 'Hermandad Gallega de Venezuela' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del club es obligatorio' })
  name: string;

  @ApiProperty({ example: 'Club social y deportivo de la comunidad gallega en Venezuela.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Av. Principal de Maripérez, Caracas, Venezuela', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '+58 212-1234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'logo_base64_string', required: false, description: 'Logo en base64' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({ example: 'info@club.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;
}
