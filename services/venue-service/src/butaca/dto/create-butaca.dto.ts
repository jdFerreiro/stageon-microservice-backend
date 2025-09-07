import { IsString, IsUUID, MaxLength, IsNumber } from 'class-validator';

export class CreateButacaDto {
  @IsUUID()
  sectorId: string;

  @IsString()
  @MaxLength(10)
  row: string;

  @IsString()
  @MaxLength(10)
  number: string;

  @IsNumber()
  statusId: number;
}
