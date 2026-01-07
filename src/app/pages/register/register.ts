// Angular
import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { form, Field, submit, required, email, minLength, validate } from '@angular/forms/signals';
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
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export default class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notificationService = inject(NotificationService);

  protected readonly title = toSignal(this.route.title);

  private readonly credentials = signal({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  protected readonly registerForm = form(
    this.credentials,
    form => {
      required(form.name, { message: 'Name is required' });

      required(form.email, { message: 'Email is required' });
      email(form.email, { message: 'Email is not valid' });

      required(form.password, { message: 'Password is required' });
      minLength(form.password, 6, {
        message: password => `Password should have at least 6 characters but has only ${password.value().length}`
      });

      required(form.confirmPassword, { message: 'Confirm Password is required' });
      
      validate(form.confirmPassword, () => {
        const creds = this.credentials();
        if (creds.confirmPassword !== creds.password) {
          return {
            kind: 'mismatch',
            message: 'Passwords do not match'
          };
        }
        return null;
      });

    }
  );

  protected async onRegister(event: SubmitEvent) {
    event.preventDefault();
    let registerSuccess = false;

    // Simulate registration logic (could be moved to authService)
    await submit(this.registerForm, async (form): Promise<any> => {
      const { name, email, password } = form().value();      
      registerSuccess = await this.authService.register(name, email, password);      
      return registerSuccess ? null : { email: ['Registration failed'] };
    });

    /* if (registerSuccess) {
      this.notificationService.showSuccess('Registration successful! Welcome!');
      this.router.navigate(['/']);
    } else {
      this.notificationService.showError('Registration failed. Please try again.');
    } */
  }
}
