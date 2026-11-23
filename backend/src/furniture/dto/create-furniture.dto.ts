import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export const CategoryFurniture = [
  'Sofa',
  'Chair',
  'Table',
  'Cupboard',
  'Bed',
  'Shelf',
] as const;

export class CreateFurnitureDto {
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  @MinLength(3, { message: 'Nama minimal 3 karakter' })
  @MaxLength(100, { message: 'Nama maksimal 100 karakter' })
  name: string;

  @IsIn(CategoryFurniture, {
    message: `Kategori harus salah satu dari: ${CategoryFurniture.join(', ')}`,
  })
  category: string;

  @IsNumber({}, { message: 'Harga harus berupa angka' })
  @IsPositive({ message: 'Harga harus lebih dari 0' })
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Deskripsi maksimal 500 karakter' })
  desc?: string;

  @IsOptional()
  @ValidateIf((o: CreateFurnitureDto) => o.image !== '')
  @IsUrl({}, { message: 'Image harus berupa URL yang valid' })
  image?: string;

  @IsOptional()
  @IsBoolean({ message: 'isAvailable harus true atau false' })
  isAvailable?: boolean;
}