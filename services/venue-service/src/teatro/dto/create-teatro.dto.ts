
import { IsString, IsOptional, IsBoolean, IsArray, MaxLength, MinLength, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeatroDto {

  @ApiProperty({ description: 'Nombre del teatro', minLength: 3, maxLength: 500 })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'El nombre no puede exceder los 500 caracteres' })
  name: string;

  @ApiPropertyOptional({ description: 'Descripción del teatro' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Dirección del teatro', minLength: 3 })
  @IsString()
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
  address: string;

  @ApiProperty({ description: 'Ciudad del teatro', minLength: 3, maxLength: 500 })
  @IsString()
  @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
  @MaxLength(500, {
    message: 'La ciudad no puede exceder los 500 caracteres',
  })
  city: string;

  @ApiProperty({ description: 'País del teatro', minLength: 3, maxLength: 250 })
  @IsString()
  @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
  @MaxLength(250, {
    message: 'El país no puede exceder los 250 caracteres',
  })
  country: string;

  @ApiProperty({ description: 'Nombre de contacto', minLength: 3, maxLength: 450 })
  @IsString()
  @MinLength(3, {
    message: 'El nombre de contacto debe tener al menos 3 caracteres',
  })
  @MaxLength(450, {
    message: 'El nombre de contacto no puede exceder los 450 caracteres',
  })
  contactName: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de contacto', maxLength: 500 })
  @IsString()
  @IsEmail({}, { message: 'El correo electrónico del contacto no es válido' })
  @MaxLength(500, {
    message:
      'El correo electrónico del contacto no puede exceder los 500 caracteres',
  })
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ description: 'Teléfono de contacto', minLength: 7, maxLength: 50 })
  @IsString()
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  @MaxLength(50, { message: 'El teléfono no puede exceder los 50 caracteres' })
  contactPhone: string;

  @ApiPropertyOptional({ description: 'Indica si el teatro está activo', default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @ApiPropertyOptional({ description: 'Salas asociadas al teatro', type: [Object] })
  @IsArray()
  @IsOptional()
  salas?: any[];
}
