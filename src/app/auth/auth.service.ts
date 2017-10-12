import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiAccess } from '../interfaces/api-access';
import { AccessTokenService } from './access-token.service';
import { environment } from '../../environments/environment';
const { client_id, client_secret } = environment.laravel.passport;

@Injectable()
export class AuthService {
  redirectUrl: string = '/';

  constructor(private accessToken: AccessTokenService, private http: HttpClient) { 
    this.clientGrantToken().subscribe(apiAccess => this.accessToken.store('clientAccess', apiAccess));
  }

  clientGrantToken(): Observable<ApiAccess> {
    return this.http.post<ApiAccess>(`${environment.laravel.url}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id,
      client_secret,
    });
  }

  clientHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.accessToken.get('clientAccess').token_type} ${this.accessToken.get('clientAccess').access_token}`);
  }

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
      this.accessToken.delete('apiAccess');
      resolve(true);
    });
  }

  /**
   * Checks if the user is logged in 
   */
  isLoggedIn(): boolean {
    const apiAccess = this.accessToken.get('apiAccess');
    
    if(apiAccess) return true;

    return false;
  }

  /**
   * Validate email if it exists on the database. 
   * 
   * @param payload 
   */
  validateEmail(payload: { email:string }) : Observable<boolean> {
    return this.http.post<boolean>(`${environment.laravel.url}/api/user/check-duplicate`, payload, { headers: this.clientHeaders() });
  }
}
