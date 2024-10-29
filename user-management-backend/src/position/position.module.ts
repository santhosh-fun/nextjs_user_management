import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';

@Module({
  providers: [PositionService],
  controllers: [PositionController]
})
export class PositionModule {}
