// Anuglar
import { Component, input } from '@angular/core';

// Material

// App
import { HeroTab } from '../../models/hero.model';


@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
})
export class HeroBanner {
  readonly currentTab = input.required<HeroTab>();
}
