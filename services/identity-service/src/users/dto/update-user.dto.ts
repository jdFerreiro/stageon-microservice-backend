import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, description: 'Indica si el usuario está activo' })
  @IsOptional()
  @IsBoolean({ message: 'El campo isActive debe ser booleano' })
  isActive?: boolean;

  @ApiProperty({ required: false, description: 'ID del rol asociado al usuario' })
  @IsOptional()
  @IsUUID('4', { message: 'El roleId debe ser un UUID válido' })
  roleId?: string;

  @ApiProperty({ required: false, description: 'ID del tipo de usuario asociado' })
  @IsOptional()
  @IsUUID('4', { message: 'El userTypeId debe ser un UUID válido' })
  userTypeId?: string;
}
