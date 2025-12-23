// Anuglar
import { Component, input, output } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatIcon } from "@angular/material/icon";

// App
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgOptimizedImage, MatCardModule, MatButtonModule, MatChipSet, MatChip, MatIcon, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly toggleFavorite = output<number>();

  protected onToggleFavoruite() {
    this.toggleFavorite.emit(this.product().id);
  }
}