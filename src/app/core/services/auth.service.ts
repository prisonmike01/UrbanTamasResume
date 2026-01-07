import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { lastValueFrom, of } from 'rxjs';
import { User } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  
  // State
  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    this.checkSession();
  }

  // Check if session is still active on page reload
  private checkSession() {
    this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true }).subscribe({
      next: (user) => this.currentUser.set(user),
      error: () => this.currentUser.set(null)
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const user = await lastValueFrom(
        this.http.post<User>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
      );
      this.currentUser.set(user);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const user = await lastValueFrom(
        this.http.post<User>(`${this.apiUrl}/register`, { name, email, password }, { withCredentials: true })
      );
      this.currentUser.set(user);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Logout failed', err)
    });
  }
}
