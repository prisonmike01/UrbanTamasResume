// Angular
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

// App
import { ProductFacade } from '../services/product.facade';
import { Product } from '../../shared/models/product.model';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productFacade = inject(ProductFacade);
  return productFacade.loadProducts();
};
