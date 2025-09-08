import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ required: false, description: 'Indica si el rol está activo' })
  @IsOptional()
  @IsBoolean({ message: 'El campo isActive debe ser booleano' })
  isActive?: boolean;
}
