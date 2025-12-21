// Anuglar
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// App
import { Toolbar } from './layout/toolbar/toolbar';
import { Footer } from "./layout/footer/footer";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, Toolbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Simple Shop');
}