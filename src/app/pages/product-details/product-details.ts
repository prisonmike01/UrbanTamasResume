// Angular
import { Component, computed, inject, input } from '@angular/core';

// Material


//App
import { ProductFacade } from '../../core/services/product.facade';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  protected readonly facade = inject(ProductFacade);

  // withComponentInputBinding assign
  readonly id = input.required<string>();
  
  protected product = computed(() => {
    const products = this.facade.products();
    return products.find(p => p.id === Number(this.id()));
  });
  
  

}
