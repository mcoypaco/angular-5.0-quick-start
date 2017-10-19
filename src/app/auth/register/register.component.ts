import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/empty';

import { ApiAccess } from '../../interfaces/api-access';
import { AccessTokenService } from '../access-token.service';
import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';
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
  confirmPasswordSubscription: Subscription;
  email: string;
  hasDuplicate: boolean;
  emailForm: FormGroup;
  emailSubscription: Subscription;
  name: string;
  nameForm: FormGroup;
  passwordForm: FormGroup;
  passwordsMatch: boolean;
  passwordSubscription: Subscription;
  questions: any;
  verified: boolean;

  constructor(
    private accessToken: AccessTokenService,
    private auth: AuthService,
    private exception: ExceptionService,
    private questionControl: QuestionControlService,
    private questionSource: RegisterFormQuestionsService,
    private router: Router,
    private userData: UserDataService,
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.get();
    this.emailForm = this.questionControl.toFormGroup(this.questions.email);
    this.passwordForm = this.questionControl.toFormGroup(this.questions.password);
    this.nameForm = this.questionControl.toFormGroup(this.questions.name);

    this.emailSubscription = this.emailForm.get('email').valueChanges
      .do(email => this.verified = false)
      .debounceTime(400)  
      .distinctUntilChanged()
      .switchMap(email => {
        if(this.emailForm.valid)
        {
          return this.verify(email).catch(error => {
            this.busy = false;
            this.exception.handle(error);
            return Observable.empty();
          });
        }

        return Observable.empty();
      })
      .subscribe((hasDuplicate: boolean) => {
        this.busy = false;
        this.hasDuplicate = hasDuplicate;
        this.questions.email.find(form => form.key === 'email').showCustomError = hasDuplicate;
        this.verified = true;
      });

    this.passwordSubscription = this.passwordForm.get('password').valueChanges
      .subscribe(password => {
        this.passwordsMatch = password === this.passwordForm.get('password_confirmation').value;
        this.checkPasswords();
      }); 

    this.confirmPasswordSubscription = this.passwordForm.get('password_confirmation').valueChanges
      .subscribe(confirmPassword => {
        this.passwordsMatch = confirmPassword === this.passwordForm.get('password').value;
        this.checkPasswords();
      });
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
  }

  /**
   * Check if password and confirmation password error message should be displayed.
   * 
   */
  checkPasswords() {
    this.questions.password.find(form => form.key === 'password').showCustomError = !this.passwordsMatch && this.passwordForm.get('password').valid && this.passwordForm.get('password_confirmation').touched;
    this.questions.password.find(form => form.key === 'password_confirmation').showCustomError = !this.passwordsMatch && this.passwordForm.get('password_confirmation').valid && this.passwordForm.get('password').touched;
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
    if(!this.busy && this.emailForm.valid && this.passwordForm.valid && !this.hasDuplicate && this.passwordsMatch)
    {
      this.busy = true;

      const payload = {
        name: this.nameForm.get('name').value,
        email: this.emailForm.get('email').value,
        password: this.passwordForm.get('password').value,
        password_confirmation: this.passwordForm.get('password_confirmation').value
      }

      this.auth.register(payload)
        .catch(error => {
          this.busy = false;
          this.exception.handle(error);
          return Observable.empty();
        })
        .switchMap(user => {
          return this.auth.login(payload.email, payload.password).catch(error => {
            this.busy = false;
            this.exception.handle(error);
            return Observable.empty();
          });
        })
        .subscribe((apiAccess: ApiAccess) => {
          this.busy = false;
          
          if(apiAccess) {
            this.accessToken.store('apiAccess', apiAccess),
            this.router.navigate(['/']);
          };
        });
    }
  }

  /**
   * Verify if the email is available in the resource.
   * 
   * @param email 
   */
  verify(email: string): Observable<boolean> {
    if(this.emailForm.valid && !this.busy)
    {
      this.busy = true;
  
      return this.auth.validateEmail({ email });
    }

    return Observable.empty();
  }
}
