import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { productsResolver } from './core/resolvers/products.resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'products',
    title: 'Products',
    resolve: { products: productsResolver },
    loadComponent: () => import('./pages/products/products')
  },
  {
    path: 'products/:id',
    title: 'Product Details',
    resolve: { products: productsResolver },
    loadComponent: () => import('./pages/product-details/product-details')
  },
  {
    path: 'cart',
    title: 'Cart',
    loadComponent: () => import('./pages/cart/cart')
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login')
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./pages/register/register')
  },
  {
    path: 'checkout-success',
    title: 'Order Confirmed',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/checkout-success/checkout-success')
  },
  { 
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./pages/not-found/not-found')
  }

];
