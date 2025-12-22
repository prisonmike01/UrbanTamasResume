export const PRODUCT_TYPES = ['christmas', 'sweet', 'summer', 'dessert', 'bakery-goods'] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export interface ProductFilter {
  onlyFavorites: boolean;
  priceRange: { min: number; max: number };
  types: ProductType[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  favourite: boolean;
  description: string;
  imageUrl: string;
  types: ProductType[];
}

