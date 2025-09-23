import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString } from 'class-validator';

export class CreateUserClubDto {
  @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID del club', format: 'uuid' })
  @IsUUID()
  clubId: string;

  @ApiProperty({ description: 'Número de socio', required: false })
  @IsOptional()
  @IsString()
  memberNumber?: string;
}
