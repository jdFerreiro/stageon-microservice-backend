import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateButacaDto {
  @IsUUID()
  @IsOptional()
  sectorId?: string;

  @IsString()
  @MaxLength(10)
  row: string;

  @IsString()
  @MaxLength(10)
  number: string;

  @IsUUID()
  statusId?: number;

  @IsBoolean()
  @IsOptional()
  isAccessible?: boolean;
}
