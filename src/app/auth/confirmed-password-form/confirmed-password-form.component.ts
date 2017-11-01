import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmedPasswordFormService } from './confirmed-password-form.service';
import { QuestionControlService } from '../../shared/question-control.service';

@Component({
  selector: 'app-confirmed-password-form',
  templateUrl: './confirmed-password-form.component.html',
  styleUrls: ['./confirmed-password-form.component.scss'],
})
export class ConfirmedPasswordFormComponent implements OnInit, OnDestroy {
  questions: any;
  passwordsMatch: boolean;

  confirmPasswordSubscription: Subscription;
  passwordFormSubscription: Subscription;
  passwordSubscription: Subscription;

  constructor(
    public confirmedPasswordForm: ConfirmedPasswordFormService,
    private questionControl: QuestionControlService
  ) { }

  ngOnInit() {
    this.questions = this.confirmedPasswordForm.questions();
    this.confirmedPasswordForm.form = this.questionControl.toFormGroup(this.questions);

    this.passwordFormSubscription = this.confirmedPasswordForm.form.valueChanges
      .subscribe(data => this.questionControl.setErrorMessages(this.confirmedPasswordForm.form, this.questions))

    this.passwordSubscription = this.confirmedPasswordForm.form.get('password').valueChanges
      .subscribe(password => {
        this.passwordsMatch = password === this.confirmedPasswordForm.form.get('password_confirmation').value;
        this.checkPasswords();
      }); 

    this.confirmPasswordSubscription = this.confirmedPasswordForm.form.get('password_confirmation').valueChanges
      .subscribe(confirmPassword => {
        this.passwordsMatch = confirmPassword === this.confirmedPasswordForm.form.get('password').value;
        this.checkPasswords();
      });
  }

  ngOnDestroy() {
    this.passwordFormSubscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.confirmPasswordSubscription.unsubscribe();
  }

  /**
   * Check if password and confirmation password error message should be displayed.
   * 
   */
  checkPasswords() {
    this.questions.find(form => form.key === 'password').showCustomError = !this.passwordsMatch && this.confirmedPasswordForm.form.get('password').valid && this.confirmedPasswordForm.form.get('password_confirmation').touched;
    this.questions.find(form => form.key === 'password_confirmation').showCustomError = !this.passwordsMatch && this.confirmedPasswordForm.form.get('password_confirmation').valid && this.confirmedPasswordForm.form.get('password').touched;
  }

  submit() {
    if(!this.confirmedPasswordForm.busy && this.confirmedPasswordForm.form.valid && this.passwordsMatch) this.confirmedPasswordForm.submit();
  }
}
