import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms'; 
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

import { ConfirmedPasswordFormService } from '../confirmed-password-form/confirmed-password-form.service';
import { ChangePasswordFormService } from './change-password-form.service';
import { ExceptionService } from '../../core/exception.service';
import { ProgressService } from '../../core/progress.service';
import { PushNotificationService } from '../../core/push-notification.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';
import { UserDataService } from '../../core/resources/user-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [ChangePasswordFormService],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  passwordForm: FormGroup;
  questions: QuestionBase<any>[];

  confirmedPasswordFormSubscription: Subscription;
  formSubscription: Subscription;
  oldPasswordSubscription: Subscription;

  busy: boolean;
  passwordValid: boolean;

  constructor(
    private confirmedPasswordForm: ConfirmedPasswordFormService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private exception: ExceptionService,
    private progress: ProgressService,
    private pushNotification: PushNotificationService,
    private questionControl: QuestionControlService,
    private questionSource: ChangePasswordFormService,
    private userData: UserDataService,
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.get();
    this.form = this.questionControl.toFormGroup(this.questions);

    this.formSubscription = this.form.valueChanges.subscribe(data => this.questionControl.setErrorMessages(this.form, this.questions));

    this.oldPasswordSubscription = this.form.get('old').valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(password => {
          if(this.form.get('old').valid) return this.checkPassword(password);

          return Observable.empty();
        }),
      )
      .subscribe((passwordValid: boolean) => {
        this.passwordValid = passwordValid;
        this.questions.find(question => question.key == 'old').showCustomError = !this.passwordValid;
      });

    this.confirmedPasswordForm.buttonLabel = 'Save';
    
    this.confirmedPasswordFormSubscription = this.confirmedPasswordForm.passwordForm$.subscribe(form => {
      this.passwordForm = form; 
      this.changePassword();
    });

  }

  ngOnDestroy()
  {
    this.confirmedPasswordFormSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
    this.oldPasswordSubscription.unsubscribe();
  }

  /**
   * Send a change password request to the server.
   * 
   */
  changePassword() {
    if(this.form.valid && this.passwordValid && !this.busy) {
      const payload = {
        old: this.form.get('old').value,
        password: this.passwordForm.get('password').value,
        password_confirmation: this.passwordForm.get('password_confirmation').value,
      }

      this.busy = true;
      this.progress.start();
      
      this.userData.changePassword(payload)
        .finally(() => {
            this.busy = false;
            this.progress.done();
          })
        .subscribe(
          resp => this.dialogRef.close(),
          error => this.exception.handle(error),
          () => this.pushNotification.simple('Password changed.')
        );
    }
  }
  
  /**
   * Verify user's current password.
   * 
   * @param password 
   */
  checkPassword(password: string): Observable<boolean> {
    return this.userData.checkPassword({ password });
  }
}
