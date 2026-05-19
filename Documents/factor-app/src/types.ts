// src/types.ts
export interface ProductVariant {
  wattage: string;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  variants?: ProductVariant[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string | null;
  products: Product[];
}

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'catalog'
  | 'detail'
  | 'ar'
  | 'favorites'
  | 'account';

export type NavTab = 'home' | 'catalog' | 'ar' | 'favorites' | 'account';
