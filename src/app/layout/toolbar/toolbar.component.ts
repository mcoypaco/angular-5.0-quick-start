import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { AccessTokenService } from '../../auth/access-token.service';
import { ChangePasswordService } from '../../auth/change-password/change-password.service';
import { ExceptionService } from '../../core/exception.service';
import { ProgressService } from '../../core/progress.service';
import { PushNotificationService } from '../../core/push-notification.service';

import { environment } from '../../../environments/environment';
import { SidenavService } from '../sidenav/sidenav.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  app: string;
  user: User;
  state: string;

  constructor(
    private auth: AuthService, 
    private accessToken: AccessTokenService,
    private cps: ChangePasswordService,
    private exception: ExceptionService,
    private progress: ProgressService,
    private pushNotification: PushNotificationService,
    private router: Router,
    private sidenav: SidenavService
  ) { }

  ngOnInit() {
    this.app = environment.name;

    this.user = this.auth.user();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  changePassword() {
    this.cps.open().afterClosed().subscribe(resp => this.pushNotification.simple('Password changed.'));
  }

  logout() {
    if(!this.progress.loading)
    {
      this.progress.start();
      
      this.auth.logout()
        .finally(() => this.progress.done())
        .subscribe(
          resp => localStorage.clear(),
          error => this.exception.handle(error),
          () => this.router.navigate(['/login'])
        );
    }
  }
}
