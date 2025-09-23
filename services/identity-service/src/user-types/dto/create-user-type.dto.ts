import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTypeDto {
  @ApiProperty({ example: 'socio' })
  name: string;
}
