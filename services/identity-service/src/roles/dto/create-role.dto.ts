import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ required: true, description: 'Nombre del rol' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres',
  })
  name: string;
}
