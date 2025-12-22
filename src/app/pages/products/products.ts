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

  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(4);
  protected readonly paginatorLength = computed(() => this.products().length);

  protected readonly pagedProducts = computed(() => {
    const products = this.products();
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return products.slice(startIndex, endIndex);
  });

  protected onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
