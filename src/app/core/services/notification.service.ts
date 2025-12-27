// Angular
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';

// Material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// App
import { ConfirmDialog, ConfirmDialogData } from '../../shared/components/dialogs/confirm-dialog/confirm-dialog';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private readonly _snackBar = inject(MatSnackBar);
    private readonly _dialog = inject(MatDialog);
    private readonly defaultDuration = 3000;

    showSuccess(message: string, action: string = 'OK', actionCallback?: () => void) {
        const snackBarRef = this._snackBar.open(message, action, {
            duration: this.defaultDuration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
        });

        if (actionCallback) {
            snackBarRef.onAction().subscribe(() => {
                actionCallback();
            });
        }
    }

    showError(message: string, action: string = 'OK', actionCallback?: () => void) {
        const snackBarRef = this._snackBar.open(message, action, {
            duration: this.defaultDuration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
        });

        if (actionCallback) {
            snackBarRef.onAction().subscribe(() => {
                actionCallback();
            });
        }
    }

    confirm(title: string, message: string): Observable<boolean> {
        return this._dialog.open(ConfirmDialog, {
            data: { title, message } as ConfirmDialogData,
            autoFocus: false
        }).afterClosed();
    }
}
