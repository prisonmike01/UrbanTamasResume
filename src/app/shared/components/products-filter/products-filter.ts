// Angular
import { Component, signal } from '@angular/core';

// Material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// App
import { FilterSection } from '../filter-section/filter-section';

@Component({
  selector: 'app-products-filter',
  imports: [FilterSection, MatCheckboxModule, MatSliderModule, MatSlideToggleModule],
  templateUrl: './products-filter.html',
  styleUrl: './products-filter.scss',
})
export class ProductsFilter {
  protected readonly step = 1;
  protected readonly maxRange = 25;
  protected readonly minPrice = signal(0);
  protected readonly maxPrice = signal(25);

  protected onMinPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.minPrice.set(Number(value));
  }

  protected onMaxPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.maxPrice.set(Number(value));
  }
}
