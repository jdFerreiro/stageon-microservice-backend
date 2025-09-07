import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSectorEstadoDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 50 caracteres' })
  name: string;
}
