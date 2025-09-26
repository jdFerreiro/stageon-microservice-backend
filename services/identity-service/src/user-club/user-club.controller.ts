import { Controller, Post, Delete, Param, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserClubService } from './user-club.service';
import { CreateUserClubDto } from './dto/create-user-club.dto';
import { RemoveUserClubDto } from './dto/remove-user-club.dto';
import { UserClubResponseDto } from './dto/user-club-response.dto';

@ApiTags('user-club')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('user-club')
export class UserClubController {
  constructor(private readonly userClubService: UserClubService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar usuario a club' })
  @ApiBody({ type: CreateUserClubDto })
  @ApiResponse({ status: 201, description: 'Relación creada', type: UserClubResponseDto })
  async addUserToClub(@Body() dto: CreateUserClubDto): Promise<UserClubResponseDto> {
    return this.userClubService.addUserToClub(dto.userId, dto.clubId, dto.memberNumber);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar relación usuario-club' })
  @ApiBody({ type: RemoveUserClubDto })
  @ApiResponse({ status: 200, description: 'Relación eliminada' })
  async removeUserFromClub(@Body() dto: RemoveUserClubDto) {
    await this.userClubService.removeUserFromClub(dto.userId, dto.clubId);
    return { message: 'Relación eliminada' };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener clubes de un usuario' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({ status: 200, description: 'Lista de relaciones usuario-club', type: [UserClubResponseDto] })
  async getClubsForUser(@Param('userId') userId: string): Promise<UserClubResponseDto[]> {
    return this.userClubService.getClubsForUser(userId);
  }

  @Get('club/:clubId')
  @ApiOperation({ summary: 'Obtener usuarios de un club' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiResponse({ status: 200, description: 'Lista de relaciones usuario-club', type: [UserClubResponseDto] })
  async getUsersForClub(@Param('clubId') clubId: string): Promise<UserClubResponseDto[]> {
    return this.userClubService.getUsersForClub(clubId);
  }
}
