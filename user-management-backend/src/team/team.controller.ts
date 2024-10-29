import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() data: { name: string; description?: string; organizationId: number }) {
    return this.teamService.create(data);
  }

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: { name?: string; description?: string }) {
    return this.teamService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.teamService.delete(id);
  }
}
