import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from '@prisma/client';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async createDepartment(
    @Body() departmentData: { name: string; description?: string; organizationId: number }
  ): Promise<Department> {
    return this.departmentService.createDepartment(departmentData);
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: string): Promise<Department> {
    return this.departmentService.getDepartmentById(Number(id));
  }

  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getAllDepartments();
  }

  @Put(':id')
  async updateDepartment(
    @Param('id') id: string,
    @Body() departmentData: { name?: string; description?: string },
  ): Promise<Department> {
    return this.departmentService.updateDepartment(Number(id), departmentData);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: string): Promise<Department> {
    return this.departmentService.deleteDepartment(Number(id));
  }
}
