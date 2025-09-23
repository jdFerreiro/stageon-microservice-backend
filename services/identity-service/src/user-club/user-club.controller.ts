import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserClubService } from './user-club.service';
import { CreateUserClubDto } from './dto/create-user-club.dto';
import { RemoveUserClubDto } from './dto/remove-user-club.dto';

@ApiTags('UserClub')
@Controller('user-club')
export class UserClubController {
  constructor(private readonly userClubService: UserClubService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar usuario a club' })
  @ApiBody({ type: CreateUserClubDto })
  @ApiResponse({ status: 201, description: 'Relación creada' })
  async addUserToClub(@Body() dto: CreateUserClubDto) {
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
  @ApiResponse({ status: 200, description: 'Lista de relaciones usuario-club' })
  async getClubsForUser(@Param('userId') userId: string) {
    return this.userClubService.getClubsForUser(userId);
  }

  @Get('club/:clubId')
  @ApiOperation({ summary: 'Obtener usuarios de un club' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiResponse({ status: 200, description: 'Lista de relaciones usuario-club' })
  async getUsersForClub(@Param('clubId') clubId: string) {
    return this.userClubService.getUsersForClub(clubId);
  }
}
