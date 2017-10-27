import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/first';

import { ConfirmationDialogService } from '../core/confirmation-dialog.service';

@Injectable()
export class DiscardChangesService {
  title: string = 'Discard changes';
  message: string = 'Do you want to discard changes?';
  action: string = 'Discard';
  cancel: string = 'Cancel';
  submitted: boolean;

  constructor(private confirmationDialog: ConfirmationDialogService) { }

  confirm() : Observable<boolean> {
    return this.confirmationDialog.open({ 
      title: this.title,
      message: this.message,
      action: this.action,
      cancel: this.cancel,
    })
    .afterClosed()
    .map((resp: boolean) =>  resp)
  }
}
