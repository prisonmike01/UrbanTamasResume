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

  login(email: string, password: string): boolean {
    // Mock authentication logic
    if (email && password && password.length >= 6) {
      const user: User = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        token: 'mock-jwt-token-123456'
      };

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