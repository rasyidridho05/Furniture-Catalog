import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFurnitureDto } from './dto/create-furniture.dto.js';
import { UpdateFurnitureDto } from './dto/update-furniture.dto.js';
import { Furniture } from './entities/furniture.entity.js';

const dataAwal: Furniture[] = [
  {
    id: 1,
    name: 'Sofa Nordic 3 Dudukan',
    category: 'Sofa',
    price: 4850000,
    desc: 'Sofa kain linen dengan rangka kayu jati dan kaki ramping gaya Skandinavia.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=70',
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Kursi Makan Rotan Alami',
    category: 'Chair',
    price: 725000,
    desc: 'Kursi makan anyaman rotan asli dengan sandaran melengkung yang nyaman.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=70',
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'Meja Kerja Minimalis 120 cm',
    category: 'Table',
    price: 1350000,
    desc: 'Meja kerja papan MDF finishing oak dengan laci samping dan kabel manajemen.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=70',
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Lemari Pakaian 2 Pintu Geser',
    category: 'Cupboard',
    price: 2900000,
    desc: 'Lemari pakaian pintu geser hemat ruang dengan cermin dan gantungan panjang.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=70',
    isAvailable: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: 'Rak Buku Industrial 5 Susun',
    category: 'Shelf',
    price: 1150000,
    desc: 'Rak buku rangka besi hitam dengan papan kayu, kuat untuk koleksi buku dan dekorasi.',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=70',
    isAvailable: true,
    createdAt: new Date(),
  },
];

@Injectable()
export class FurnitureService {
  private furniture: Furniture[] = [...dataAwal];
  private nextId = dataAwal.length + 1;

  create(dto: CreateFurnitureDto): Furniture {
    this.pastikanNamaUnik(dto.name);

    const item: Furniture = {
      id: this.nextId++,
      name: dto.name.trim(),
      category: dto.category,
      price: dto.price,
      desc: dto.desc?.trim() || 'Belum ada deskripsi.',
      image: dto.image?.trim() ?? '',
      isAvailable: dto.isAvailable ?? true,
      createdAt: new Date(),
    };
    this.furniture.unshift(item);
    return item;
  }

  findAll(): Furniture[] {
    return this.furniture;
  }

  findOne(id: number): Furniture {
    const item = this.furniture.find((f) => f.id === id);
    if (!item) {
      throw new NotFoundException(`Furniture dengan id ${id} tidak ditemukan`);
    }
    return item;
  }

  update(id: number, dto: UpdateFurnitureDto): Furniture {
    const item = this.findOne(id); 

    if (dto.name !== undefined) {
      this.pastikanNamaUnik(dto.name, id);
      item.name = dto.name.trim();
    }
    if (dto.category !== undefined) item.category = dto.category;
    if (dto.price !== undefined) item.price = dto.price;
    if (dto.desc !== undefined) item.desc = dto.desc.trim() || 'Belum ada deskripsi.';
    if (dto.image !== undefined) item.image = dto.image.trim();
    if (dto.isAvailable !== undefined) item.isAvailable = dto.isAvailable;

    return item;
  }

  remove(id: number): { message: string } {
    const item = this.findOne(id); 
    this.furniture = this.furniture.filter((f) => f.id !== id);
    return { message: `Furniture "${item.name}" berhasil dihapus` };
  }

  private pastikanNamaUnik(name: string, abaikanId?: number) {
    const kembar = this.furniture.some(
      (f) =>
        f.id !== abaikanId &&
        f.name.toLowerCase() === name.trim().toLowerCase(),
    );
    if (kembar) {
      throw new ConflictException(`Furniture dengan nama "${name}" sudah ada`);
    }
  }
}