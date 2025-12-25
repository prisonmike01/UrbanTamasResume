// Angular
import { inject, Injectable } from "@angular/core";

// Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private readonly _snackBar = inject(MatSnackBar);
    private readonly defaultDuration = 3000;

    showSuccess(message: string) {
        this._snackBar.open(message, 'OK', {
            duration: this.defaultDuration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
        });
    }

    showError(message: string) {
        this._snackBar.open(message, 'OK', {
            duration: this.defaultDuration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });
    }

}