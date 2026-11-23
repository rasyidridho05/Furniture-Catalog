# Katalog Furniture

Aplikasi fullstack sederhana untuk mengelola katalog furniture. Pengguna dapat melihat daftar furniture, menambah, mengubah, dan menghapus data. Frontend dibangun dengan React + Vite + TypeScript + Tailwind CSS, dan backend dengan NestJS (struktur MVC) yang menyimpan data sementara di memori (array).

## Struktur Proyek

```
Catalog/
├── fe/        # Frontend (React + Vite + TypeScript + Tailwind CSS)
├── backend/   # Backend (NestJS)
└── docs/screenshots/
```

## Data Utama: Furniture

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | number | ID otomatis |
| `name` | string | Nama furniture (3–100 karakter, harus unik) |
| `category` | string | Salah satu dari: Sofa, Chair, Table, Cupboard, Bed, Shelf |
| `price` | number | Harga dalam Rupiah (> 0) |
| `desc` | string | Deskripsi (opsional, maks. 500 karakter) |
| `image` | string | URL gambar (opsional) |
| `isAvailable` | boolean | Status ketersediaan (default `true`) |
| `createdAt` | Date | Waktu data dibuat |

## Endpoint API

Base URL: `http://localhost:3000/furniture`

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/furniture` | Ambil semua furniture |
| GET | `/furniture/:id` | Ambil satu furniture |
| POST | `/furniture` | Tambah furniture baru |
| PATCH | `/furniture/:id` | Ubah sebagian data furniture |
| DELETE | `/furniture/:id` | Hapus furniture |

### Validasi (class-validator + ValidationPipe global)

- `name`: `@IsString`, `@IsNotEmpty`, `@MinLength(3)`, `@MaxLength(100)`
- `category`: `@IsIn([...])`
- `price`: `@IsNumber`, `@IsPositive`
- `desc`, `image`, `isAvailable`: `@IsOptional` dengan aturan masing-masing (`@MaxLength`, `@IsUrl`, `@IsBoolean`)
- `UpdateFurnitureDto` memakai `PartialType` sehingga semua field menjadi opsional

### Penanganan Error

| Status | Exception | Kondisi |
|---|---|---|
| 404 | `NotFoundException` | Furniture dengan id tersebut tidak ditemukan |
| 409 | `ConflictException` | Nama furniture sudah dipakai |
| 400 | `BadRequestException` (ValidationPipe / ParseIntPipe) | Data tidak valid atau id bukan angka |

## Cara Menjalankan

### Backend
```bash
cd backend
npm install
npm run start:dev   # http://localhost:3000
```