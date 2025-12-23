import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./pages/products/products').then(m => m.Products)
  },
  {
    path: 'products/:id',
    title: 'Product Details',
    loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails)
  },
  {
    path: 'cart',
    title: 'Cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  { 
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) 
  }

];
