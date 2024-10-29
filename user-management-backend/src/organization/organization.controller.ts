import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(@Body() data: { name: string; description?: string }) {
    return this.organizationService.create(data);
  }

  @Get()
  async findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.organizationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: { name?: string; description?: string }) {
    return this.organizationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.organizationService.delete(id);
  }
}
