import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class RedirectIfLoggedInGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAccess();
  }

  /**
   * Checks for stored ApiAccess
   * @param url
   * @description redirect to login page if token is not valid
   * @throws redirect to default route if valid
   */
  checkAccess(): boolean {
    if(!this.auth.isLoggedIn()) return true;

    this.router.navigate(['/']);
    return false;
  }
}
