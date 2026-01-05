// Angular
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of, timeout } from 'rxjs';

// App
import { ProductFacade } from '../services/product.facade';
import { Product } from '../../shared/models/product.model';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productFacade = inject(ProductFacade);
  const router = inject(Router);

  return productFacade.loadProducts().pipe(
    timeout(3000),
    catchError((error) => {
      console.error('Products Resolver failed:', error);
      router.navigate(['/not-found']);
      return of([]);
    })
  );
};
