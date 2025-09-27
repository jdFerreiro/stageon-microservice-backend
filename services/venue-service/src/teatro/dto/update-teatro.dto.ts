import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTeatroDto } from './create-teatro.dto';
import { IsOptional, IsString, MaxLength, IsUUID, IsBoolean } from 'class-validator';

export class UpdateTeatroDto extends PartialType(CreateTeatroDto) {
  @ApiProperty({ description: 'Nombre del teatro', maxLength: 500, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @ApiProperty({ description: 'Descripción del teatro', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Dirección del teatro', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Ciudad del teatro', maxLength: 500, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  city?: string;

  @ApiProperty({ description: 'País del teatro', maxLength: 250, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  country?: string;

  @ApiProperty({ description: 'Nombre del contacto', maxLength: 450, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(450)
  contactName?: string;

  @ApiProperty({ description: 'Email del contacto', maxLength: 500, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  contactEmail?: string;

  @ApiProperty({ description: 'Teléfono del contacto', maxLength: 50, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  contactPhone?: string;

  @ApiProperty({ description: 'Indica si el teatro está activo', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isactive?: boolean;

  @ApiProperty({ description: 'ID del club asociado', type: 'string', format: 'uuid', required: false })
  @IsOptional()
  @IsUUID()
  clubId?: string;
}
