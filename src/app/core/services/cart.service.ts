// Angular
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// App
import { CartItem } from '../../shared/models/cart.model';
import { Product } from '../../shared/models/product.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/cart';

  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() => this.items().length);

  readonly totalCount = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));

  readonly totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  readonly isCartEmpty = computed(() => this.count() === 0);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    this.http.get<CartItem[]>(this.apiUrl, { withCredentials: true }).subscribe({
      next: (items) => this.items.set(items),
      error: (err) => console.error('Failed to load cart', err)
    });
  }

  addItem(product: Product): void {

    this.http.post<CartItem[]>(this.apiUrl, { productId: product.id, quantity: 1 }, { withCredentials: true })
      .subscribe({
        next: (updatedCart) => {
          this.items.set(updatedCart);
          this.notificationService.showSuccess("added to cart", 'View Cart', () => {
            this.router.navigate(['/cart']);
          });
        },
        error: (err) => {
          console.error('Failed to add item to cart', err);
          this.notificationService.showError('Failed to add item to cart');
        }
      });
  }

  removeFromCart(productId: number): void {
    this.http.delete<CartItem[]>(`${this.apiUrl}/${productId}`, { withCredentials: true })
      .subscribe({
        next: (updatedCart) => this.items.set(updatedCart),
        error: (err) => this.notificationService.showError('Failed to remove item')
      });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.http.patch<CartItem[]>(`${this.apiUrl}/${productId}`, { quantity }, { withCredentials: true })
      .subscribe({
        next: (updatedCart) => this.items.set(updatedCart),
        error: (err) => this.notificationService.showError('Failed to update quantity')
      });
  }

  clearCart(): void {
    this.http.delete<CartItem[]>(this.apiUrl, { withCredentials: true })
      .subscribe({
        next: (updatedCart) => this.items.set(updatedCart),
        error: (err) => this.notificationService.showError('Failed to clear cart')
      });
  }
}
