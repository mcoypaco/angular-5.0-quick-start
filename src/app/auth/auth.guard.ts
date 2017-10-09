import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkAccess(url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    let url = `/${route.path}`;

    return this.checkAccess(url);
  }

  /**
   * Checks for stored ApiAccess
   * @param url
   * @description redirect to intended route if valid
   * @throws redirect to login page if token is not valid
   */
  checkAccess(url: string): boolean {
    if(this.auth.isLoggedIn()) return true;
    
    this.auth.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}
