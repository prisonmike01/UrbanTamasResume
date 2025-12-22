// Angular
import { Component, output, signal } from '@angular/core';

// Material
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

// App
import { FilterSection } from '../filter-section/filter-section';
import { PRODUCT_TYPES, ProductFilter, ProductType } from '../../models/product.model';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-products-filter',
  imports: [FilterSection, MatCheckboxModule, MatSliderModule, MatSlideToggleModule, MatDividerModule, MatAnchor, MatButtonModule],
  templateUrl: './products-filter.html',
  styleUrl: './products-filter.scss',
})
export class ProductsFilter {
  public readonly filterChange = output<ProductFilter>();

  protected readonly productTypes = PRODUCT_TYPES;

  protected readonly step = 3;
  protected readonly maxRange = 24;
  protected readonly minPrice = signal(0);
  protected readonly maxPrice = signal(24);
  protected readonly onlyFavorites = signal(false);
  protected readonly selectedTypes = signal<ProductType[]>([]);

  protected onMinPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.minPrice.set(Number(value));
    this.emitFilterChange();
  }

  protected onMaxPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.maxPrice.set(Number(value));
    this.emitFilterChange();
  }

  protected onFavoriteChange(event: MatSlideToggleChange): void {
    this.onlyFavorites.set(event.checked);
    this.emitFilterChange();
  }

  protected onTypeChange(type: ProductType, event: MatCheckboxChange): void {
    this.selectedTypes.update((types) => {
      if (event.checked) {
        return [...types, type];
      } else {
        return types.filter((t) => t !== type);
      }
    });
    this.emitFilterChange();
  }

  // emitelünk egy ProductFilter objectet, amit az app-products komponens fogad
  private emitFilterChange(): void {
    this.filterChange.emit({
      onlyFavorites: this.onlyFavorites(),
      priceRange: { min: this.minPrice(), max: this.maxPrice() },
      types: this.selectedTypes(),
    });
  }

  protected emitClearFilter(): void {
    // Reset signals to defaults
    this.minPrice.set(0);
    this.maxPrice.set(24);
    this.onlyFavorites.set(false);
    this.selectedTypes.set([]);

    this.emitFilterChange();
  }
}
