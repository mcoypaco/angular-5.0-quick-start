import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AccessTokenService } from '../auth/access-token.service';
import { ApiAccess } from '../interfaces/api-access';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  apiAccess: ApiAccess;

  constructor(private accessToken: AccessTokenService, private http: HttpClient) { 
    this.apiAccess = this.accessToken.get('apiAccess');
  }

  /**
   * Set an authorization HttpHeader for Laravel API
   */
  headers(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.apiAccess.token_type} ${this.apiAccess.access_token}`);
  }
  
  /**
   * Send a get request to Laravel API
   * @param url 
   */
  get(url: string) {
    return this.http.get(`${environment.laravel.url}/api/${url}`, { headers: this.headers() });
  }

  /**
   * Send a post request to Laravel API
   * @param url 
   * @param body 
   */
  post(url: string, body?: {}): Observable<any> {
    return this.http.post(`${environment.laravel.url}/api/${url}`, body, { headers: this.headers() });
  }
  
  /**
   * Send a put request to Laravel API
   * @param url 
   * @param body 
   */
  put(url: string, body?: {}): Observable<any> {
    return this.http.put(`${environment.laravel.url}/api/${url}`, body, { headers: this.headers() });
  }

  /**
   * Send a delete to Laravel API
   * @param url 
   */
  delete(url): Observable<any> {
    return this.http.delete(`${environment.laravel.url}/api/${url}`, { headers: this.headers() });
  }
}
