import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';
import { environment } from '../../../environments/environment';
import { PushNotificationService } from '../../core/push-notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  busy: boolean;
  form: FormGroup;
  error: string;
  
  constructor(
    private auth: AuthService,
    private exception: ExceptionService,
    private http: HttpClient,
    private pushNotification: PushNotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]) 
    });
  }

  submit() {
    const payload = { email: this.form.get('email').value }

    if(this.form.valid && !this.busy) {
      this.busy = true;

      this.http.post(`${environment.laravel.url}/api/password/reset`, payload, { headers: this.auth.clientHeaders() })
        .finally(() => this.busy = false)
        .subscribe(
          resp => this.pushNotification.simple('We have e-mailed your password reset link!'),
          error => {
            if(error.status != 422) return this.exception.handle(error);

            this.error = 'Email is invalid.';
          },
          () => this.router.navigate(['/login'])
        );
    }
  }
}
