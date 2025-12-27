import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./pages/products/products')
  },
  {
    path: 'products/:id',
    title: 'Product Details',
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
    loadComponent: () => import('./pages/checkout-success/checkout-success')
  },
  { 
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./pages/not-found/not-found')
  }

];
