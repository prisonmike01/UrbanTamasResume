// Angular
import { Component, inject, input } from '@angular/core';

// Material

// Apps
import { ProductFacade } from '../../../core/services/product.facade';
import { Product } from '../../models/product.model';
import { RelatedProductCard } from '../related-product-card/related-product-card';

@Component({
  selector: 'app-related-products',
  imports: [RelatedProductCard],
  templateUrl: './related-products.html',
  styleUrl: './related-products.scss',
})
export class RelatedProducts {
  protected readonly facade = inject(ProductFacade);
  readonly products = input.required<Product[]>();
}
