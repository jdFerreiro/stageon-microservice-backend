import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateTeatroDto {
  @ApiProperty({ description: 'Nombre del teatro', maxLength: 500 })
  @MaxLength(500)
  name: string;

  @ApiProperty({ description: 'Descripción del teatro', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Dirección del teatro' })
  address: string;

  @ApiProperty({ description: 'Ciudad del teatro', maxLength: 500 })
  @MaxLength(500)
  city: string;

  @ApiProperty({ description: 'País del teatro', maxLength: 250 })
  @MaxLength(250)
  country: string;

  @ApiProperty({ description: 'Nombre del contacto', maxLength: 450 })
  @MaxLength(450)
  contactName: string;

  @ApiProperty({ description: 'Email del contacto', required: false, maxLength: 500 })
  @IsOptional()
  @MaxLength(500)
  contactEmail?: string;

  @ApiProperty({ description: 'Teléfono del contacto', maxLength: 50 })
  @MaxLength(50)
  contactPhone: string;

  @ApiProperty({ description: 'Indica si el teatro está activo', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isactive?: boolean;

  @ApiProperty({ description: 'ID del club asociado', type: 'string', format: 'uuid' })
  @IsUUID()
  clubId: string;
}
