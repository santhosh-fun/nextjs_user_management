import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async createDepartment(data: { name: string; description?: string; organizationId: number }): Promise<Department> {
    const { name, description, organizationId } = data;

    // Building the correct structure for Prisma
    return this.prisma.department.create({
      data: {
        name,
        description,
        organization: {
          connect: { id: organizationId }, // Connects department to the specified organization by ID
        },
      },
    });
  }

  async getDepartmentById(id: number): Promise<Department | null> {
    return this.prisma.department.findUnique({ where: { id } });
  }

  async getAllDepartments(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  async updateDepartment(id: number, data: Prisma.DepartmentUpdateInput): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async deleteDepartment(id: number): Promise<Department> {
    return this.prisma.department.delete({
      where: { id },
    });
  }
}
