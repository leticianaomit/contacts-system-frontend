import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  showSuccessSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['green-snackbar'],
      verticalPosition: 'top',
    });
  }

  showFailureSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['red-snackbar'],
      verticalPosition: 'top',
    });
  }
}
