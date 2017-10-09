import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiAccess } from '../interfaces/api-access';
import { AccessTokenService } from './access-token.service';
import { environment } from '../../environments/environment';
const { client_id, client_secret } = environment.laravel.passport.passwordGrant;

@Injectable()
export class AuthService {
  redirectUrl: string = '/';

  constructor(private accessToken: AccessTokenService, private http: HttpClient) { }

  /**
   * Sends an oauth token request to a Laravel API
   * @param username 
   * @param password 
   */
  login(username: string, password: string): Observable<ApiAccess> {
    return this.http.post<ApiAccess>(`${environment.laravel.url}/oauth/token`, {
      grant_type: 'password',
      client_id,
      client_secret,
      username,
      password,
      scope: ''
    });
  }

  /**
   * Logout the authenticated user.
   */
  logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.accessToken.delete();
      resolve(true);
    });
  }

  /**
   * Checks if the user is logged in 
   */
  isLoggedIn(): boolean {
    const apiAccess = this.accessToken.get();
    
    if(apiAccess) return true;

    return false;
  }
}
