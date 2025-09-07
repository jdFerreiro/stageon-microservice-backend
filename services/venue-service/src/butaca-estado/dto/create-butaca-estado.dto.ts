import { IsString } from 'class-validator';

export class CreateButacaEstadoDto {
  @IsString()
  name: string;
}
