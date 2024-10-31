// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body()
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      roleId: number; // ID for the user's role
      organizationId: number; // ID for the user's organization
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.getUserById(Number(id));
  }

  @Get() // New endpoint to get all users
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getUsers(); // Fetch all users
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email?: string; password?: string },
  ): Promise<UserModel> {
    return this.userService.updateUser(Number(id), userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser(Number(id));
  }

  @Put(':userId/role/:roleId')
  async assignRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<UserModel> {
    return this.userService.assignRole(Number(userId), Number(roleId));
  }

  @Put(':userId/position/:positionId')
  async assignPosition(
    @Param('userId') userId: string,
    @Param('positionId') positionId: string,
  ): Promise<UserModel> {
    return this.userService.assignPosition(Number(userId), Number(positionId));
  }

  @Put(':userId/department/:departmentId')
  async assignDepartment(
    @Param('userId') userId: string,
    @Param('departmentId') departmentId: string,
  ): Promise<UserModel> {
    return this.userService.assignDepartment(
      Number(userId),
      Number(departmentId),
    );
  }

  @Put(':userId/team/:teamId')
  async assignTeam(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
  ): Promise<UserModel> {
    return this.userService.assignTeam(Number(userId), Number(teamId));
  }
}
