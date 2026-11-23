import { Module } from '@nestjs/common';
import { FurnitureService } from './furniture.service.js';
import { FurnitureController } from './furniture.controller.js';

@Module({
  controllers: [FurnitureController],
  providers: [FurnitureService],
})
export class FurnitureModule {}
