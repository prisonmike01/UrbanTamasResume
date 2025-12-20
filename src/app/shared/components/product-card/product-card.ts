import { Component, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, MatCardModule, MatButtonModule, MatChipSet, MatChip, MatIcon],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  readonly product = input.required<Product>();
}