import { Component, computed, inject, model, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { HeroBanner } from '../../shared/components/hero-banner/hero-banner';
import { HeroService } from '../../core/services/hero.service';


@Component({
  imports: [MatTabsModule, HeroBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private readonly heroService = inject(HeroService);
  protected readonly heroTabs = toSignal(this.heroService.getHeroTabs(), { initialValue: [] });
  
  protected readonly selectedIndex = model<number>(0);
  readonly currentTab = computed(() => this.heroTabs()[this.selectedIndex()]);


}
