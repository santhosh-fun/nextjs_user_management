// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: number;
    organizationId: number;
  }): Promise<User> {
    const { email, password, firstName, lastName, roleId, organizationId } =
      data;

    return this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        role: {
          connect: { id: Number(roleId) }, // Connects user to the specified role by ID
        },
        organization: {
          connect: { id: Number(organizationId) }, // Connects user to the specified organization by ID
        },
      },
    });
  }

  async getUsers(): Promise<User[]> {
    // New method to fetch all users
    return this.prisma.user.findMany(); // Use Prisma to fetch all users
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true, department: true, team: true, position: true },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async assignRole(userId: number, roleId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: { connect: { id: roleId } } },
    });
  }

  async assignPosition(userId: number, positionId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { position: { connect: { id: positionId } } },
    });
  }

  async assignDepartment(userId: number, departmentId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { department: { connect: { id: departmentId } } },
    });
  }

  async assignTeam(userId: number, teamId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { team: { connect: { id: teamId } } },
    });
  }
}
