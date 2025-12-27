// Angular
import { Component, inject, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// Material
import { MatCardModule } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatButton } from '@angular/material/button';

// App
import { CartService } from '../../../core/services/cart.service';


@Component({
  selector: 'app-cart-summary',
  imports: [MatCardModule, MatDivider, CurrencyPipe, MatButton],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss',
})
export class CartSummary {
  protected readonly cartService = inject(CartService);
  readonly proceedToCheckout = output<void>();
  readonly clearCart = output<void>();

  protected onProceedToCheckout(): void { 
    this.proceedToCheckout.emit();
  }

  protected onClearCart(): void { 
    this.clearCart.emit();
  }
}
