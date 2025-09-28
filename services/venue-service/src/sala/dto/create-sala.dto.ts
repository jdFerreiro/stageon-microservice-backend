import { IsString, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaDto {
  @ApiProperty({ description: 'Nombre de la sala', maxLength: 500 })
  @IsString()
  @MaxLength(500)
  name: string;

  @ApiProperty({ description: 'ID del teatro al que pertenece la sala', type: 'string', format: 'uuid' })
  @IsUUID()
  teatroId: string;

  // Agrega aquí otros campos necesarios para la sala
}
