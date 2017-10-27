import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AccessTokenService } from '../auth/access-token.service'
import { ExceptionService } from '../core/exception.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    private accessToken: AccessTokenService,
    private exception: ExceptionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
      .subscribe(
        resp => this.accessToken.delete('apiAccess'),
        error => this.exception.handle(error),
        () => this.router.navigate(['/login'])
      );
  }
}
