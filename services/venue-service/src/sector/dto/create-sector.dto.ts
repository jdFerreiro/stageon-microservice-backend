import { IsString, IsOptional, IsArray, MaxLength, MinLength, IsUUID, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectorDto {
  @ApiProperty({ description: 'ID de la sala', format: 'uuid' })
  @IsUUID()
  salaId: string;

  @ApiProperty({ description: 'Nombre del sector', minLength: 3, maxLength: 50 })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;

  @ApiPropertyOptional({ description: 'Descripción del sector' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Capacidad del sector' })
  @IsNumber()
  @IsNotEmpty({ message: 'La capacidad no puede estar vacía' })
  capacity: number;

  @ApiProperty({ description: 'Precio del sector', type: 'number', minimum: 0.01 })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número válido' },
  )
  @Min(0.01, { message: 'El precio debe ser al menos 0.01' })
  price: number;

  @ApiPropertyOptional({ description: 'Descuento del sector', minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'El descuento debe ser al menos 0' })
  discount?: number;

  @ApiProperty({ description: 'ID del estado del sector' })
  @IsNumber()
  statusId: number;

  @ApiPropertyOptional({ description: 'Butacas asociadas al sector', type: [Object] })
  @IsArray()
  @IsOptional()
  butacas?: any[];
}
