// Angular
import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';


// Material
import { MatCard } from "@angular/material/card";
import { MatIconButton } from '@angular/material/button';

// App
import { CartService } from '../../../core/services/cart.service';
import { MatIcon } from "@angular/material/icon";
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-product',
  imports: [MatCard, MatIcon, CurrencyPipe, MatIconButton],
  templateUrl: './cart-product-card.html',
  styleUrl: './cart-product-card.scss',
})
export class CartProductCard {
  readonly product = input.required<CartItem>();
  protected readonly cartService = inject(CartService);

}
