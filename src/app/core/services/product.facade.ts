// Angular
import { Injectable, inject, signal, computed } from '@angular/core';
import { map, of, tap } from 'rxjs';

// App
import { ProductService } from './product.service';
import { Product, ProductFilter, ProductType } from '../../shared/models/product.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  private readonly productService = inject(ProductService);
  private readonly notificationService = inject(NotificationService);

  // State
  readonly products = signal<Product[]>([]);
  readonly filter = signal<ProductFilter>({
    onlyFavorites: false,
    priceRange: { min: 0, max: 24 },
    types: []
  });
  readonly searchQuery = signal<string>('');
  readonly pageIndex = signal(0);
  readonly pageSize = signal(6);

  constructor() {}

  // Data Loading
  loadProducts() {
    // If we already have products, don't fetch again (simple cache strategy)
    if (this.products().length > 0) {
      return of(this.products());
    }

    return this.productService.getProducts().pipe(
      tap(products => this.products.set(products))
    );
  }

  // Computed Selectors
  readonly filteredProducts = computed(() => {
    const products = this.products();
    const filter = this.filter();
    const query = this.searchQuery().toLowerCase();

    return products.filter(product => {
      const matchesFavorite = !filter.onlyFavorites || product.favourite;
      const matchesPrice = product.price >= filter.priceRange.min && product.price <= filter.priceRange.max;
      const matchesType = filter.types.length === 0 || product.types.some((type: ProductType) => filter.types.includes(type));
      const matchesSearch = !query || product.name.toLowerCase().includes(query);

      return matchesFavorite && matchesPrice && matchesType && matchesSearch;
    });
  });

  readonly paginatorLength = computed(() => this.filteredProducts().length);

  readonly pagedProducts = computed(() => {
    const products = this.filteredProducts();
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return products.slice(startIndex, endIndex);
  });

  readonly suggestedProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const allProducts = this.products();
    if (!query) return [];

    return allProducts
      .filter(p => p.name.toLowerCase().includes(query))
      .map(p => p.name)
      .slice(0, 5);
  });

  // Products page Actions
  updateFilter(filter: ProductFilter) {
    this.filter.set(filter);
    this.pageIndex.set(0);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.pageIndex.set(0);
  }

  setPage(pageIndex: number, pageSize: number) {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
  }

  toggleFavorite(productId: number) {
    this.products.update(products =>
      products.map(p =>
        p.id === productId ? { ...p, favourite: !p.favourite } : p
      )
    );

    const product = this.getProductById(productId);
    const message = `${product?.name} ${(product?.favourite ? 'added to favorites' : 'removed from favorites')}`;

    this.notificationService.showSuccess(message);
  }

  getRelatedProducts(product: Product): Product[] {
    if (!product || !product.types) return [];

    return this.products()
      .filter(p => 
        p.id !== product.id && 
        p.types.some(type => product.types.includes(type))
      );
  }

  private getProductById(productId: number) {
    return this.products().find(p => p.id === productId);
  }
}
