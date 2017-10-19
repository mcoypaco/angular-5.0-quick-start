import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@Injectable()
export class AlertDialogService {

  constructor(private dialog: MatDialog) { }

  open(data: { title: string, message: string, action: string, cancel: string }): MatDialogRef<AlertDialogComponent> {
    return this.dialog.open(AlertDialogComponent, { data })
  }
}
