// Angular
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { first } from 'rxjs';

// Material
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

// App
import { CartService } from '../../core/services/cart.service';
import { CartProductCard } from '../../shared/components/cart-product-card/cart-product-card';
import { CartSummary } from '../../shared/components/cart-summary/cart-summary';
import { NotificationService } from '../../core/services/notification.service';

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
  protected readonly notificationService = inject(NotificationService);
  protected readonly router = inject(Router);

  onClearCart(): void {
    this.notificationService.confirm('Confirm Clear cart', 'Are you sure you want to clear the cart?')
      .pipe(first())
      .subscribe(confirmed => {
        if (confirmed) {
          this.cartService.clearCart();
          this.notificationService.showSuccess('Cart cleared successfully.');
        }
        else {
          this.notificationService.showError('Cart was not cleared.');
        }
      });
  }

  onCheckout(): void {
    this.notificationService.confirm('Confirm Checkout', 'Are you sure you want to proceed with the checkout?')
      .pipe(first())
      .subscribe(confirmed => {
        if (confirmed) {
          this.cartService.clearCart();
          this.router.navigate(['/checkout-success']);
        }
        else {
          this.notificationService.showError(
            'Checkout cancelled.',
            'Retry',
            () => this.onCheckout()
          );
        }
      });
  }
}