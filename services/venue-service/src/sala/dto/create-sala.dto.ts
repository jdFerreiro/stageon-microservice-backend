import { IsString, IsOptional, IsBoolean, IsArray, MaxLength, MinLength, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSalaDto {
  @ApiProperty({ description: 'Nombre de la sala', minLength: 3, maxLength: 250 })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(250, { message: 'El nombre no puede exceder los 250 caracteres' })
  name: string;

  @ApiPropertyOptional({ description: 'Descripción de la sala' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Indica si la sala está activa', default: true })
  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @ApiPropertyOptional({ description: 'Sectores asociados a la sala', type: [Object] })
  @IsArray()
  @IsOptional()
  sectores?: any[];

  @ApiProperty({ description: 'ID del teatro', format: 'uuid' })
  @IsString()
  @IsUUID()
  teatroId: string;
}
