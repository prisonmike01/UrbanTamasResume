// Angular
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [ MatIconModule],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss'
})
export default class CheckoutSuccess implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  protected secondsLeft = signal(5);
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.secondsLeft.update(val => val - 1);
      
      if (this.secondsLeft() === 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}