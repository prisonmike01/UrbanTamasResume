// Angular
import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { form, Field, submit, required, email, minLength } from '@angular/forms/signals';
import { toSignal } from '@angular/core/rxjs-interop';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// App
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Field
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notificationService = inject(NotificationService);

  protected readonly title = toSignal(this.route.title);

  protected readonly loginForm = form(
    signal({
      email: '',
      password: ''
    }),
    form => {
      required(form.email, { message: 'Email is required' });
      email(form.email, { message: 'Email is not valid' });

      required(form.password, { message: 'Password is required' });
      minLength(form.password, 6, {
        message: password => `Password should have at least 6 characters but has only
          ${password.value().length}`
      });
    }
  );

  protected async authenticate(event: SubmitEvent) {
    event.preventDefault();
    let loginSuccess = false;

    // Use 'any' to bypass experimental type strictness
    await submit(this.loginForm, async (form): Promise<any> => {
      const { email, password } = form().value();
      loginSuccess = await this.authService.login(email, password);
      return loginSuccess ? null : { password: ['Invalid credentials'] };
    });

    if (loginSuccess) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
      this.notificationService.showSuccess('Successfully logged in!');
    } else {
      this.notificationService.showError('Invalid credentials.');
    }
  }
}
