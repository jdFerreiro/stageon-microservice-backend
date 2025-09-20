import { IsString, IsUUID, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateButacaDto {
  @ApiProperty({ description: 'ID del sector', format: 'uuid' })
  @IsUUID()
  sectorId: string;

  @ApiProperty({ description: 'Fila de la butaca', maxLength: 10 })
  @IsString()
  @MaxLength(10)
  row: string;

  @ApiProperty({ description: 'Número de la butaca', maxLength: 10 })
  @IsString()
  @MaxLength(10)
  number: string;

  @ApiProperty({ description: 'ID del estado de la butaca' })
  @IsNumber()
  statusId: number;
}
