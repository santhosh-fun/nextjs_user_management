import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async updateRole(id: number, data: Prisma.RoleUpdateInput): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async deleteRole(id: number): Promise<Role> {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
