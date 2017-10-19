import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/finally';

import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
import { ExceptionService } from '../../core/exception.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  busy: boolean;

  constructor() { }

  ngOnInit() {  

  }
}
