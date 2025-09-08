import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, description: 'Email del usuario' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email: string;

  @ApiProperty({ required: true, description: 'Contraseña del usuario' }) 
  @IsString() 
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres',
  })
  password: string;
}
