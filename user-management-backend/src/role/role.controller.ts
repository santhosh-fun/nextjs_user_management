import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() roleData: { name: string; description?: string }): Promise<Role> {
    return this.roleService.createRole(roleData);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role> {
    return this.roleService.getRoleById(Number(id));
  }

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() roleData: { name?: string; description?: string }): Promise<Role> {
    return this.roleService.updateRole(Number(id), roleData);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<Role> {
    return this.roleService.deleteRole(Number(id));
  }
}
