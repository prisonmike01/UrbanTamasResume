// Angular
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

// Material
import { MatTabsModule } from '@angular/material/tabs';

// App
import { HeroBanner } from '../../shared/components/hero-banner/hero-banner';
import { HeroService } from '../../core/services/hero.service';


@Component({
  imports: [MatTabsModule, HeroBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home {
  private readonly heroService = inject(HeroService);
  protected readonly heroTabs = toSignal(this.heroService.getHeroTabs(), { initialValue: [] });
  
  // Changed from model() to signal() to avoid Router Input Binding conflict
  protected readonly selectedIndex = signal<number>(0);
  
  readonly currentTab = computed(() => this.heroTabs()[this.selectedIndex()]);
}