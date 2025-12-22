export type ProductType = 'christmas' | 'sweet' | 'summer' | 'dessert' | 'bakery-goods';

export interface Product {
  id: number;
  name: string;
  price: number;
  favourite: boolean;
  description: string;
  imageUrl: string;
  types: ProductType[];
}

