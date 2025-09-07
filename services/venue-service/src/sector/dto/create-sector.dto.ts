import {
  IsString,
  IsOptional,
  IsArray,
  MaxLength,
  MinLength,
  IsUUID,
  IsNumber,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateSectorDto {
  @IsUUID()
  salaId: string;

  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La capacidad no puede estar vacía' })
  capacity: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número válido' },
  )
  @Min(0.01, { message: 'El precio debe ser al menos 0.01' })
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'El descuento debe ser al menos 0' })
  discount?: number;

  @IsNumber()
  statusId: number;

  @IsArray()
  @IsOptional()
  butacas?: any[];
}
