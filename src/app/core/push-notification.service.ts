import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class PushNotificationService {
  protected duration: number = 2000;

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Opens a simple snackbar.
   * 
   * @param message 
   * @param action 
   */
  simple(message: string, action: string = 'Okay', duration: number = this.duration) { 
    return this.snackBar.open(message, action, { duration });
  }
}
