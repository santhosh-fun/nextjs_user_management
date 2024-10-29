import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Position } from '@prisma/client';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; description?: string }): Promise<Position> {
    return this.prisma.position.create({ data });
  }

  async findAll(): Promise<Position[]> {
    return this.prisma.position.findMany();
  }

  async findOne(id: number): Promise<Position | null> {
    return this.prisma.position.findUnique({ where: { id } });
  }

  async update(id: number, data: { title?: string; description?: string }): Promise<Position> {
    return this.prisma.position.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Position> {
    return this.prisma.position.delete({ where: { id } });
  }
}
