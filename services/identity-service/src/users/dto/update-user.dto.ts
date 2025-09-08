import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, description: 'Indica si el usuario está activo' })
  @IsOptional()
  @IsBoolean({ message: 'El campo isActive debe ser booleano' })
  isActive?: boolean;
}
