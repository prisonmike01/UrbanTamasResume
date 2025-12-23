// Angular
import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

// App
import { ProductFacade } from '../../core/services/product.facade';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,  
    RouterLink,
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export default class ProductDetails {
  protected readonly facade = inject(ProductFacade);

  readonly id = input.required<string>();
  
  protected product = computed(() => {
    const products = this.facade.products();
    return products.find(p => p.id === Number(this.id()));
  });

  protected toggleFavorite(id: number) {
    this.facade.toggleFavorite(id);
  }
}