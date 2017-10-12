import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import { AuthService } from '../auth.service';
import { RegisterFormQuestionsService } from './register-form-questions.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';
import { UserDataService } from '../../core/resources/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormQuestionsService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  busy: boolean;
  email: string;
  hasDuplicate: boolean;
  emailForm: FormGroup;
  emailSubscription: Subscription;
  passwordForm: FormGroup;
  questions: any;
  verified: boolean;

  constructor(
    private auth: AuthService,
    private questionControl: QuestionControlService,
    private questionSource: RegisterFormQuestionsService,
    private userData: UserDataService,
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.get();
    this.emailForm = this.questionControl.toFormGroup(this.questions.email);
    this.passwordForm = this.questionControl.toFormGroup(this.questions.password);

    this.emailSubscription = this.emailForm.get('email').valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(email => {
        this.verified = false;
        this.hasDuplicate = false;
      });
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }

  setEmail() {
    this.email = this.emailForm.get('email').value;
  }

  verify() {
    let payload = { email: this.emailForm.get('email').value }

    this.auth.validateEmail(payload).subscribe(
      (hasDuplicate: boolean) => {
        this.hasDuplicate = hasDuplicate;
        this.questions.email.find(form => form.key === 'email').showCustomError = hasDuplicate;
      },
      error => console.log(error), // Todo: exception handler
      () => this.verified = true 
    );
  }
}
