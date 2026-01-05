// Angular
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// App
import { PaginatedResult, Product, ProductFilter } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/products';

  getProducts(page: number, pageSize: number, query?: string, filter?: ProductFilter): Observable<PaginatedResult<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (query) {
      params = params.set('name', query);
    }

    if (filter) {
      if (filter.onlyFavorites) {
        params = params.set('favorite', 'true');
      }
      // Simple serialization for price range and types
      params = params.set('minPrice', filter.priceRange.min.toString())
                     .set('maxPrice', filter.priceRange.max.toString());
      
      filter.types.forEach(type => {
        params = params.append('types', type);
      });
    }

    return this.http.get<PaginatedResult<Product>>(this.apiUrl, { params });
  }

  toggleFavorite(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}/favorite`, {});
  }
}
