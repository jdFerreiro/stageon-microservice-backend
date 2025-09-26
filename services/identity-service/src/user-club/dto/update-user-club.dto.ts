import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserClubDto {
  @ApiProperty({ description: 'Nuevo número de socio', required: false })
  @IsOptional()
  @IsString({ message: 'El número de socio debe ser un string' })
  memberNumber?: string;
}
