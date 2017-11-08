import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertDialogService } from './alert-dialog.service';
import { AuthService } from '../auth/auth.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { PushNotificationService } from './push-notification.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ExceptionService {
  protected error: HttpErrorResponse

  constructor(
    private alertDialog: AlertDialogService,
    private auth: AuthService,
    private confirmationDialog: ConfirmationDialogService,
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
    if(typeof error != 'object') error.error = JSON.parse(error.error);
    this.error = error;
  }

  /**
   * Opens an alery dialog containing the error message and action.
   * 
   * @param message 
   * @param action 
   * @param cancel 
   */
  protected openAlertDialog(message: string, action: string = 'Got it!'): MatDialogRef<AlertDialogComponent> {
    return this.alertDialog.open({
      title: this.error.statusText,
      message,
      action,
    });
  }

  /**
   * Opens a confirmation dialog containing the error message and action.
   * 
   * @param message 
   * @param action 
   * @param cancel 
   */
  protected openConfirmationDialog(message: string, action: string = 'Yes', cancel: string = 'No'): MatDialogRef<ConfirmationDialogComponent> {
    return this.confirmationDialog.open({
      title: this.error.statusText,
      message,
      action,
      cancel,
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
    this.openAlertDialog(this.error.message);
  }

  /**
   * Displays an internal server error dialog.
   * 
   */
  protected internalServerError(): void {
    const message = 'Oops! Something went wrong. Please try again or refresh the page.';
    const action = 'Send Report';
    const cancel = 'Cancel';

    this.openConfirmationDialog(message, action, cancel).afterClosed().subscribe(resp => {
      if(resp) this.sendReport();
    });
  }

  /**
   * Displays an unauthenticated error dialog, then redirects to login page on close. 
   * 
   */
  protected unauthenticated(): void {
    const message = 'Please login to continue.';

    this.openAlertDialog(message)
      .afterClosed()
      .switchMap(resp => this.auth.logout())
      .subscribe(
        resp => this.router.navigate(['/login']),
        error => this.handle(error)
      );
  }

  /**
   * Displays an unauthorized error dialog.
   * 
   */
  protected unauthorized(): void {
    const message = 'This action is unauthorized.';

    this.openAlertDialog(message);
  }

  /**
   * Displays an unprocessable error dialog.
   */
  protected unprocessable(): void {
    const message = 'Please check the form for errors.'

    this.openAlertDialog(message);
  }
}
