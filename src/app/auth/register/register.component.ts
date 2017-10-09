import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import { ApiService } from '../../core/api.service';
import { RegisterFormQuestionsService } from './register-form-questions.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormQuestionsService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  busy: boolean;
  email: string;
  emailAvailable: boolean;
  emailForm: FormGroup;
  emailSubscription: Subscription;
  passwordForm: FormGroup;
  questions: any;

  constructor(
    private api: ApiService,
    private questionControl: QuestionControlService,
    private questionSource: RegisterFormQuestionsService
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.get();
    this.emailForm = this.questionControl.toFormGroup(this.questions.email);
    this.passwordForm = this.questionControl.toFormGroup(this.questions.password);

    this.emailSubscription = this.emailForm.get('email').valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(email => {
        if(this.emailForm.valid) {
          return this.checkEmail().catch(error => {
            console.log(error);
            return Observable.empty();
          })
        }
      })
      .subscribe(resp => this.emailAvailable = resp ? true : false);
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }

  checkEmail() {
    return this.api.post('user/check-duplicate');
  }

  setEmail() {
    this.email = this.emailForm.get('email').value;
  }
}
