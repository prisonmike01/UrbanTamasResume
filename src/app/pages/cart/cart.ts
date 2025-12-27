// Angular
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Material
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

// App
import { CartService } from '../../core/services/cart.service';
import { CartProductCard } from '../../shared/components/cart-product-card/cart-product-card';
import { CartSummary } from '../../shared/components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    MatButton,
    MatIcon,
    CartProductCard,
    CartSummary
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export default class Cart {
  protected readonly cartService = inject(CartService);
}
