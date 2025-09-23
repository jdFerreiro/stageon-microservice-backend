import { ApiProperty } from '@nestjs/swagger';
import { RoleResponseDto } from '../../roles/dto/role-response.dto';
import { UserTypeResponseDto } from '../../user-types/dto/user-type-response.dto';
import { ClubResponseDto } from '../../clubs/dto/club-response.dto';

export class UserResponseDto {
  @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty({ type: RoleResponseDto })
  role: RoleResponseDto;

  @ApiProperty({ type: UserTypeResponseDto })
  userType: UserTypeResponseDto;

  @ApiProperty({ type: [ClubResponseDto], required: false })
  clubs?: ClubResponseDto[];
}
