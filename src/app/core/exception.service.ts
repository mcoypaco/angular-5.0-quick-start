import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertDialogService } from './alert-dialog.service';
import { AuthService } from '../auth/auth.service';
import { PushNotificationService } from './push-notification.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ExceptionService {
  protected error: HttpErrorResponse

  constructor(
    private alertDialog: AlertDialogService,
    private auth: AuthService,
    private http: HttpClient,
    private pushNotification: PushNotificationService,
    private router: Router,
  ) { }

  /**
   * Handles the http error.
   * 
   * @param error 
   */
  handle(error: HttpErrorResponse): void {
    this.setError(error);

    switch (error.status) {
      case 401:
        return this.unauthenticated();
    
      case 403:
        return this.unauthorized();

      case 422:
        return this.unprocessable();

      case 500:
        return this.internalServerError();

      default:
        return this.defaultError();
    }
  }

  /**
   * Set error data
   * 
   * @param error 
   */
  protected setError(error: any): void {
    error.error = JSON.parse(error.error);
    this.error = error;
  }

  /**
   * Opens the dialog containing the error message and action.
   * 
   * @param message 
   * @param action 
   * @param cancel 
   */
  protected openDialog(message: string, action: string = 'Got it!', cancel?: string): MatDialogRef<AlertDialogComponent> {
    return this.alertDialog.open({
      title: this.error.statusText,
      message,
      action,
      cancel
    });
  }

  /**
   * Sends error report to admin.
   * 
   */
  protected sendReport(): void {
    this.http.post(`${environment.laravel.url}/api/error-report`, this.error, { headers: this.auth.clientHeaders() }).subscribe(
      resp => this.pushNotification.simple('Report sent.'),
      error => this.pushNotification.simple('Error encountered sending report.')
    );
  }

  /**
   * Displays a default error dialog.
   * 
   */
  protected defaultError(): void {
    this.openDialog(this.error.message);
  }

  /**
   * Displays an internal server error dialog.
   * 
   */
  protected internalServerError(): void {
    const message = 'Oops! Something went wrong. Please try again or refresh the page.';
    const action = 'Send Report';
    const cancel = 'Cancel';

    this.openDialog(message, action, cancel).afterClosed().subscribe(resp => {
      if(resp) this.sendReport();
    });
  }

  /**
   * Displays an unauthenticated error dialog, then redirects to login page on close. 
   * 
   */
  protected unauthenticated(): void {
    const message = 'Please login to continue.';

    this.openDialog(message).afterClosed().subscribe(resp => {
      this.auth.logout().then(() => this.router.navigate(['/login']));
    });
  }

  /**
   * Displays an unauthorized error dialog.
   * 
   */
  protected unauthorized(): void {
    const message = 'This action is unauthorized.';

    this.openDialog(message);
  }

  /**
   * Displays an unprocessable error dialog.
   */
  protected unprocessable(): void {
    const message = 'Please check the form for errors.'

    this.openDialog(message);
  }
}
