import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FurnitureService } from './furniture.service.js';
import { CreateFurnitureDto } from './dto/create-furniture.dto.js';
import { UpdateFurnitureDto } from './dto/update-furniture.dto.js';

@Controller('furniture')
export class FurnitureController {
  constructor(private readonly furnitureService: FurnitureService) {}

  @Post()
  create(@Body() dto: CreateFurnitureDto) {
    return this.furnitureService.create(dto);
  }

  @Get()
  findAll() {
    return this.furnitureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.furnitureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFurnitureDto,
  ) {
    return this.furnitureService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.furnitureService.remove(id);
  }
}