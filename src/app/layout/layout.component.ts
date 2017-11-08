import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AccessTokenService } from '../auth/access-token.service'
import { ExceptionService } from '../core/exception.service';
import { ProgressService } from '../core/progress.service';

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
    private progress: ProgressService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    if(!this.progress.loading)
    {
      this.progress.start();
      
      this.auth.logout()
        .finally(() => this.progress.done())
        .subscribe(
          resp => this.accessToken.delete('apiAccess'),
          error => this.exception.handle(error),
          () => this.router.navigate(['/login'])
        );
    }
  }
}
