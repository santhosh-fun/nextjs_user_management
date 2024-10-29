import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; description?: string }): Promise<Organization> {
    return this.prisma.organization.create({ data });
  }

  async findAll(): Promise<Organization[]> {
    return this.prisma.organization.findMany();
  }

  async findOne(id: number): Promise<Organization | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; description?: string }): Promise<Organization> {
    return this.prisma.organization.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Organization> {
    return this.prisma.organization.delete({ where: { id } });
  }
}
