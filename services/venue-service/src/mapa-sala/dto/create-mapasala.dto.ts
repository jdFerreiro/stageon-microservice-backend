import { IsString, IsJSON, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMapaSalaDto {
  @ApiProperty({ description: 'ID de la sala' })
  @IsString()
  salaId: string;

  @ApiProperty({ description: 'URL de la imagen del mapa' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: 'Datos del mapa en formato string base64', type: 'string', example: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==' })
  @IsString()
  mapData: string; // Mapa en formato base64

  @ApiProperty({ description: 'Versión del mapa', minimum: 1 })
  @IsNumber()
  @Min(1, { message: 'La versión debe ser al menos 1' })
  version: number;
}
