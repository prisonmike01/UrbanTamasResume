import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../core/services/product.service';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private readonly productService = inject(ProductService);
  protected readonly products = toSignal(this.productService.getProducts());
}
