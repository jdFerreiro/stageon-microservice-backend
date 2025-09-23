import { ApiProperty } from '@nestjs/swagger';

export class UserTypeResponseDto {
  @ApiProperty({ description: 'ID del tipo de usuario', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nombre del tipo de usuario' })
  name: string;
}
