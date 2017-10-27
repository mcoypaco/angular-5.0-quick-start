import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/empty';

import { routes } from '../../routes';

import { ApiAccess } from '../../interfaces/api-access';
import { CanComponentDeactivate } from '../../interfaces/can-component-deactivate';
import { AccessTokenService } from '../access-token.service';
import { AuthService } from '../auth.service';
import { DiscardChangesService } from '../../shared/discard-changes.service';
import { ExceptionService } from '../../core/exception.service';
import { RegisterFormQuestionsService } from './register-form-questions.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';
import { UserDataService } from '../../core/resources/user-data.service';
import { ConfirmedPasswordFormService } from '../confirmed-password-form/confirmed-password-form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DiscardChangesService, RegisterFormQuestionsService]
})
export class RegisterComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  questions: any;

  busy: boolean;
  hasDuplicate: boolean;
  verified: boolean;

  email: string;
  name: string;

  registrationForm: FormGroup;
  emailForm: FormGroup;
  nameForm: FormGroup;
  passwordForm: FormGroup;

  emailSubscription: Subscription;

  constructor(
    private accessToken: AccessTokenService,
    private auth: AuthService,
    private confirmedPasswordForm: ConfirmedPasswordFormService,
    private discardChanges: DiscardChangesService,
    private exception: ExceptionService,
    private questionControl: QuestionControlService,
    private questionSource: RegisterFormQuestionsService,
    private router: Router,
    private userData: UserDataService,
  ) { }

  ngOnInit() {
    this.auth.clientGrantToken().subscribe(apiAccess => this.accessToken.store('clientAccess', apiAccess));

    this.questions = this.questionSource.get();
    this.emailForm = this.questionControl.toFormGroup(this.questions.email);
    this.nameForm = this.questionControl.toFormGroup(this.questions.name);

    this.registrationForm = new FormGroup({
      'name': this.nameForm,
      'email': this.emailForm,
    });

    this.confirmedPasswordForm.buttonLabel = 'Register';

    this.emailSubscription = this.emailForm.get('email').valueChanges
      .do(email => this.verified = false)
      .debounceTime(400)  
      .distinctUntilChanged()
      .switchMap(email => this.checkEmail(email))
      .subscribe((hasDuplicate: boolean) => this.confirmEmail(hasDuplicate));

    this.confirmedPasswordForm.passwordForm$.subscribe(form => {
      this.passwordForm = form; 
      this.register();
    });
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(this.registrationForm.dirty && !this.discardChanges.submitted) return this.discardChanges.confirm();

    return true;
  }

  /**
   * Set the nameForm stepper label to name.
   */
  setName() {
    this.name = this.nameForm.get('name').value;
  }

  /**
   * Set the emailForm stepper label to the email. 
   * 
   */
  setEmail() {
    this.email = this.emailForm.get('email').value;
  }

  /**
   * Register the user.
   * 
   */
  register() {
    if(this.emailForm.valid && !this.hasDuplicate)
    {
      this.auth.register(this.payload())
        .catch(error => this.catchRegister(error))
        .switchMap(user => this.attemptLogin(this.payload()))
        .subscribe((apiAccess: ApiAccess) => this.redirectToHome(apiAccess));
    }
  }

  /**
   * Sends a email verification request in the resource.
   * 
   * @param email 
   */
  protected checkEmail(email: string) {
    if(this.emailForm.valid && !this.busy) return this.verify(email).do(() => this.busy = true);

    return Observable.empty();
  }

  /**
   * Verify if the email is available in the resource.
   * 
   * @param email 
   */
  protected verify(email: string): Observable<boolean | {}> {
    return this.auth.validateEmail({ email })
      .finally(() => this.busy = false)
      .catch(error => {
        this.exception.handle(error);
        return Observable.empty();
      });
  }

  /**
   * Confirms the verification process.
   * 
   * @param hasDuplicate 
   */
  protected confirmEmail(hasDuplicate: boolean) {
    this.hasDuplicate = hasDuplicate;
    this.questions.email.find(form => form.key === 'email').showCustomError = hasDuplicate;
    this.verified = true;
  }

  /**
   * The payload for account registration.
   * 
   */
  protected payload() {
    return {
      name: this.nameForm.get('name').value,
      email: this.emailForm.get('email').value,
      password: this.passwordForm.get('password').value,
      password_confirmation: this.passwordForm.get('password_confirmation').value
    }
  }

  /**
   * Catch errors upon registration.
   * 
   * @param error 
   */
  protected catchRegister(error: HttpErrorResponse) {
    this.confirmedPasswordForm.busy = false;
    this.exception.handle(error);
    return Observable.empty();
  }

  /**
   * Login the credentials from payload
   * 
   * @param payload 
   */
  protected attemptLogin(payload: { name:string, email:string, password:string, password_confirmation:string  }) {
    return this.auth.login(payload.email, payload.password)
      .finally(() => this.confirmedPasswordForm.busy = false)
      .catch(error => {
        this.exception.handle(error);
        return Observable.empty();
      });
  }

  /**
   * Store the ApiAccess to storage and navigates to home page.
   * 
   * @param apiAccess 
   */
  protected redirectToHome(apiAccess: ApiAccess) {
    this.accessToken.store('apiAccess', apiAccess);
    this.discardChanges.submitted = true;
    this.router.navigate([routes.home]);
  }
}
