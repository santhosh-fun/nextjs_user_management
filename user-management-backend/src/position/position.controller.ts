import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PositionService } from './position.service';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() data: { title: string; description?: string }) {
    return this.positionService.create(data);
  }

  @Get()
  async findAll() {
    return this.positionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.positionService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: { title?: string; description?: string },
  ) {
    return this.positionService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.positionService.delete(Number(id));
  }
}
