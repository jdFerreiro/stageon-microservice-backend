import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RemoveUserClubDto {
  @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'ID del club', format: 'uuid' })
  @IsUUID()
  clubId: string;
}
