import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { firstValueFrom } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock hero tabs', async () => {
    const tabs = await firstValueFrom(service.getHeroTabs());
    expect(tabs.length).toBeGreaterThan(0);
    expect(tabs[0].label).toBe('Welcome');
  });

  it('should have 3 mock tabs', async () => {
    const tabs = await firstValueFrom(service.getHeroTabs());
    expect(tabs.length).toBe(3);
  });
});
