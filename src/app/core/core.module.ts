import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiService } from './api.service';
import { SortingService } from './sorting.service';
import { UserDataService } from './resources/user-data.service';
import { ExceptionService } from './exception.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertDialogService } from './alert-dialog.service';
import { PushNotificationService } from './push-notification.service';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CanDeactivateGuard } from './can-deactivate.guard';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [PageNotFoundComponent, AlertDialogComponent, ForbiddenPageComponent, ConfirmationDialogComponent],
  providers: [ApiService, SortingService, UserDataService, ExceptionService, AlertDialogService, PushNotificationService, ConfirmationDialogService, CanDeactivateGuard],
  entryComponents: [AlertDialogComponent, ConfirmationDialogComponent]
})
export class CoreModule { }
