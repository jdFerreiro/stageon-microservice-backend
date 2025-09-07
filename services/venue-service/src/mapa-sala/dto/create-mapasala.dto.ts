import { IsString, IsJSON, IsNumber, Min } from 'class-validator';

export class CreateMapaSalaDto {
  @IsString()
  salaId: string;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsJSON({ message: 'El formato del mapa debe ser un JSON válido' })
  mapData: any; // Coordenadas JSON/SVG de las butacas

  @IsNumber()
  @Min(1, { message: 'La versión debe ser al menos 1' })
  version: number;
}
