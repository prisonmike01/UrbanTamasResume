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
  readonly totalItems = signal<number>(0);
  readonly filter = signal<ProductFilter>({
    onlyFavorites: false,
    priceRange: { min: 0, max: 24 },
    types: []
  });
  readonly searchQuery = signal<string>('');
  readonly pageIndex = signal(0);
  readonly pageSize = signal(4);

  constructor() { }

  // Data Loading
  loadProducts() {
    return this.productService.getProducts(
      this.pageIndex(),
      this.pageSize(),
      this.searchQuery(),
      this.filter()
    ).pipe(
      tap(result => {
        this.products.set(result.items);
        this.totalItems.set(result.total);
      })
    );
  }

  // Computed Selectors
  readonly paginatorLength = computed(() => this.totalItems());

  readonly pagedProducts = computed(() => this.products());

  readonly suggestedProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const currentProducts = this.products();
    if (!query) return [];

    return currentProducts
      .filter(p => p.name.toLowerCase().includes(query))
      .map(p => p.name)
      .slice(0, 5);
  });

  // Products page Actions
  updateFilter(filter: ProductFilter) {
    this.filter.set(filter);
    this.pageIndex.set(0);
    this.loadProducts().subscribe();
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.pageIndex.set(0);
    this.loadProducts().subscribe();
  }

  setPage(pageIndex: number, pageSize: number) {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
    this.loadProducts().subscribe();
  }

  toggleFavorite(productId: number) {
    // send update to server
    this.productService.toggleFavorite(productId).subscribe({
      next: (updatedProduct) => {
        this.products.update(products =>
          products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );

        const message = `${updatedProduct.name} ${(updatedProduct.favourite ? 'added to favorites' : 'removed from favorites')}`;
        this.notificationService.showSuccess(message);
      },
      error: (err) => {
        console.error('Failed to toggle favorite', err);      
        this.notificationService.showError('Failed to update favorite status');
      }
    });
  }

  getRelatedProducts(product: Product): Product[] {
    // Note: In a real app, this should probably be a server call too
    // For now, it will only find related products within the current page
    if (!product || !product.types) return [];

    return this.products()
      .filter(p =>
        p.id !== product.id &&
        p.types.some(type => product.types.includes(type))
      );
  }
}
