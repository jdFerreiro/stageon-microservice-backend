import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateButacaEstadoDto {
  @ApiProperty({ description: 'Nombre del estado de la butaca', minLength: 3, maxLength: 50 })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;
}
