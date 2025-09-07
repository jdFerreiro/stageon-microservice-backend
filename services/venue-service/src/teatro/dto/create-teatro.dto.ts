import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateTeatroDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'El nombre no puede exceder los 500 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres' })
  address: string;

  @IsString()
  @MinLength(3, { message: 'La ciudad debe tener al menos 3 caracteres' })
  @MaxLength(500, {
    message: 'La ciudad no puede exceder los 500 caracteres',
  })
  city: string;

  @IsString()
  @MinLength(3, { message: 'El país debe tener al menos 3 caracteres' })
  @MaxLength(250, {
    message: 'El país no puede exceder los 250 caracteres',
  })
  country: string;

  @IsString()
  @MinLength(3, {
    message: 'El nombre de contacto debe tener al menos 3 caracteres',
  })
  @MaxLength(450, {
    message: 'El nombre de contacto no puede exceder los 450 caracteres',
  })
  contactName: string;

  @IsString()
  @IsEmail({}, { message: 'El correo electrónico del contacto no es válido' })
  @MaxLength(500, {
    message:
      'El correo electrónico del contacto no puede exceder los 500 caracteres',
  })
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @MinLength(7, { message: 'El teléfono debe tener al menos 7 caracteres' })
  @MaxLength(50, { message: 'El teléfono no puede exceder los 50 caracteres' })
  contactPhone: string;

  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @IsArray()
  @IsOptional()
  salas?: any[];
}
