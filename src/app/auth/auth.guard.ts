import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { ExceptionService } from '../core/exception.service';
import { User } from '../models/user';

import { routes } from '../routes';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService, 
    private exception: ExceptionService,
    private router: Router
  ) { }

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
  checkAccess(url: string): Promise<boolean> | boolean {
    if(localStorage.getItem('user')) return true;

    return this.auth.isLoggedIn()
      .toPromise()
      .then(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }

        this.auth.redirectUrl = url;
        this.router.navigate([`${routes.login}`]);
        
        return false;
      })
      .catch(error => {
        this.exception.handle(error);
        return false;
      });
  }

}