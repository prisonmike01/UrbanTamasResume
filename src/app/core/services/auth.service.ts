import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  
  // State
  readonly currentUser = signal<User | null>(this.loadUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {}

  async login(email: string, password: string) {
    // Mock authentication logic
    if (email && password && password.length >= 6) {
      const user: User = {
        id: 1,
        email: email,
        name: email.split('@')[0], // Default name from email if not provided
        token: 'mock-jwt-token-123456'
      };

      this.currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    // Mock registration logic
    if (name && email && password && password.length >= 6) {
      const user: User = {
        id: Math.floor(Math.random() * 1000), // random ID
        name: name,
        email: email,
        token: 'mock-jwt-token-' + Date.now()
      };

      // In a real app, we would send a POST request to the API
      // For this mock, we'll just log them in immediately
      this.currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private loadUser(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}
