import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  MaxLength,
  MinLength,
  IsUUID,
} from 'class-validator';

export class CreateSalaDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'El nombre no puede exceder los 250 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @IsArray()
  @IsOptional()
  sectores?: any[];

  @IsString()
  @IsUUID()
  teatroId: string;
}
