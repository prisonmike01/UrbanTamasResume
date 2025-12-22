// Angular
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

// Material
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

// App
import { ProductService } from '../../core/services/product.service';
import { ProductCard, } from '../../shared/components/product-card/product-card';
import { ProductsFilter } from '../../shared/components/products-filter/products-filter';
import { ProductFilter } from '../../shared/models/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductCard, ProductsFilter, MatPaginatorModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  protected readonly products = toSignal(this.productService.getProducts(), { initialValue: [] });
  protected readonly title = toSignal(this.route.title);

  protected readonly filter = signal<ProductFilter>({
    onlyFavorites: false,
    priceRange: { min: 0, max: 1000 },
    types: []
  });

  protected readonly filteredProducts = computed(() => {
    const products = this.products();
    const filter = this.filter();

    return products.filter(product => {
      const matchesFavorite = !filter.onlyFavorites || product.favourite;
      const matchesPrice = product.price >= filter.priceRange.min && product.price <= filter.priceRange.max;
      const matchesType = filter.types.length === 0 || product.types.some(type => filter.types.includes(type));

      return matchesFavorite && matchesPrice && matchesType;
    });
  });

  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(4);
  protected readonly paginatorLength = computed(() => this.filteredProducts().length);

  protected readonly pagedProducts = computed(() => {
    const products = this.filteredProducts();
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return products.slice(startIndex, endIndex);
  });

  protected onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  // az app-products-filter output event bindingje
  protected onFilterChange(filter: ProductFilter) {
    this.filter.set(filter);
    this.pageIndex.set(0); // Reset to first page on filter change
  }
}
