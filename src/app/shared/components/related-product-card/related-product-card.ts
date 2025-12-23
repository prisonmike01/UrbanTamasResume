// Angular
import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

// Material
import { MatCardModule } from "@angular/material/card";
import { MatChipSet, MatChip } from "@angular/material/chips";
import { MatRippleModule } from '@angular/material/core';

// App
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-related-product-card',
  imports: [MatChipSet, MatCardModule, NgOptimizedImage, MatChip, RouterLink, MatRippleModule],
  templateUrl: './related-product-card.html',
  styleUrl: './related-product-card.scss',
})
export class RelatedProductCard {
  readonly product = input.required<Product>();
}
