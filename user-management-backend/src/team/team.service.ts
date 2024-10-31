import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    organizationId: number;
  }): Promise<Team> {
    return this.prisma.team.create({ data });
  }

  async findAll(): Promise<Team[]> {
    return this.prisma.team.findMany();
  }

  async findOne(id: number): Promise<Team | null> {
    return this.prisma.team.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: { name?: string; description?: string },
  ): Promise<Team> {
    console.log('updateupdate', id, data);
    return this.prisma.team.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Team> {
    return this.prisma.team.delete({ where: { id } });
  }
}
