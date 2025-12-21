// Anuglar
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// App

@Component({
  selector: 'app-toolbar',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  readonly toolbarTitle = input.required<string>();
  readonly menuToggled = output<void>();

  protected onMenuToggle() {
    this.menuToggled.emit();
  }
}