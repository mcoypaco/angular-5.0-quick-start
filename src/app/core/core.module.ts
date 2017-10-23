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

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [PageNotFoundComponent, AlertDialogComponent, ForbiddenPageComponent],
  providers: [ApiService, SortingService, UserDataService, ExceptionService, AlertDialogService, PushNotificationService],
  entryComponents: [AlertDialogComponent]
})
export class CoreModule { }
