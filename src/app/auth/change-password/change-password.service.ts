import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ChangePasswordComponent } from './change-password.component';

@Injectable()
export class ChangePasswordService {

  constructor(
    private dialog: MatDialog,
  ) { }

  open() {
    return this.dialog.open(ChangePasswordComponent);
  }

}
