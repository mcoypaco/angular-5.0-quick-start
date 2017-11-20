import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiAccess } from '../interfaces/api-access';
import { ApiService } from '../core/api.service';
import { AccessTokenService } from './access-token.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserDataService } from '../core/resources/user-data.service';

const { client_id, client_secret } = environment.laravel.passport;

@Injectable()
export class AuthService {
  redirectUrl: string = '/';

  constructor(
    private api: ApiService,
    private accessToken: AccessTokenService, 
    private http: HttpClient,
    private userData: UserDataService,
  ) { }

  user(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Asks for a token from the API server
   */
  clientGrantToken(): Observable<ApiAccess> {
    return this.http.post<ApiAccess>(`${environment.laravel.url}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id,
      client_secret,
    });
  }

  /**
   * Set Authorization headers for API call.
   */
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
  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.laravel.url}/api/logout`, {}, { headers: this.api.headers() });
  }

  /**
   * Checks if the user is logged in 
   */
  isLoggedIn(): Observable<User> {
    const apiAccess = this.accessToken.get('apiAccess');
    
    if(apiAccess) return this.userData.auth();

    return Observable.empty();
  }

  /**
   * Register the user credentials.
   */
  register(payload: { name: string, email: string, password: string, password_confirmation: string }) {
    return this.http.post<User>(`${environment.laravel.url}/api/user`, payload, { headers: this.clientHeaders() });
  }

  /**
   * Validate email if it exists on the database. 
   * 
   * @param payload 
   */
  validateEmail(payload: { email:string }) : Observable<boolean> {
    return this.http.post<boolean>(`${environment.laravel.url}/api/user/check-duplicate`, payload, { headers: this.clientHeaders() });
  }

  /**
   * Sends a forgot password request to the server.
   * 
   * @param payload 
   */
  forgotPassword(payload: { email:string }) {
    return this.http.post(`${environment.laravel.url}/api/password/reset`, payload, { headers: this.clientHeaders() })
  }

  /**
   * Resets the user password.
   * 
   * @param token 
   * @param payload 
   */
  resetPassword(token: string, payload) {
    return this.http.post(`${environment.laravel.url}/api/password/reset/${token}`, payload, { headers: this.clientHeaders()})
  }
}
