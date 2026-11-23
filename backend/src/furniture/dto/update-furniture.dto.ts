import { PartialType } from '@nestjs/mapped-types';
import { CreateFurnitureDto } from './create-furniture.dto.js';

export class UpdateFurnitureDto extends PartialType(CreateFurnitureDto) {}
