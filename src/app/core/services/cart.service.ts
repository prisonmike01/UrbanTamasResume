// Angular
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  
  readonly items = signal<CartItem[]>(this.loadCart());

  readonly count = computed(() => this.items().length);

  readonly totalCount = computed(() => this.items().reduce((acc, item) => acc + item.quantity, 0));

  readonly totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.items()));
    });
  }

  addItem(product: Product): void {
    const isNewItem = this.addToCart(product);
    const message = isNewItem ? `${product.name} added to cart!` : `${product.name} quantity updated!`;

    this.notificationService.showSuccess(message, 'View Cart', () => {
      this.router.navigate(['/cart']);
    });
  }

  private addToCart(product: Product): boolean {
    const existingItem = this.items().find(item => item.product.id === product.id);

    this.items.update(items => {
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });

    return !existingItem;
  }


  removeFromCart(productId: number): void {
    this.items.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.items.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.items.set([]);
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
