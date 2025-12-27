// Anuglar
import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// App
import { Toolbar } from './layout/toolbar/toolbar';
import { Footer } from "./layout/footer/footer";
import { LoadingService } from './core/services/loading.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule,
    Toolbar, 
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Simple Shop');
  protected readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      if (event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError) {
        this.loadingService.hide();
      }
    });
  }
}