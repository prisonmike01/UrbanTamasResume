// Anuglar
import { Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatTooltip } from '@angular/material/tooltip';

// App
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-toolbar',
  imports: [RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatBadge, 
    MatTooltip],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  protected readonly cartService = inject(CartService);

  readonly toolbarTitle = input.required<string>();
  readonly menuToggled = output<void>();

  protected onMenuToggle() {
    this.menuToggled.emit();
  }
}