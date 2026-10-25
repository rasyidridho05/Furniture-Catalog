export type CategoryFurniture =
  | 'Sofa'
  | 'Chair'
  | 'Table'
  | 'Cupboard'
  | 'Bed'
  | 'Shelf';

export interface Furniture {
  id: number;
  name: string;
  category: CategoryFurniture;
  price: number;
  desc: string;
  image: string;
}

export const ListCategory: CategoryFurniture[] = [
  'Sofa',
  'Chair',
  'Table',
  'Cupboard',
  'Bed',
  'Shelf',
];