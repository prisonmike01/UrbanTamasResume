// Angular
import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

// App
import { ProductFacade } from '../../core/services/product.facade';
import { CartService } from '../../core/services/cart.service';
import { RelatedProducts } from '../../shared/components/related-products/related-products';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    RelatedProducts,
    MatProgressSpinner
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails {
  protected readonly facade = inject(ProductFacade);
  protected readonly cartService = inject(CartService);

  readonly id = input.required<string>();

  protected product = computed(() => {
    const products = this.facade.products();
    return products.find(p => p.id === Number(this.id()));
  });

  protected relatedProducts = computed(() => {
    const product = this.product();
    return product ? this.facade.getRelatedProducts(product) : [];
  });
}