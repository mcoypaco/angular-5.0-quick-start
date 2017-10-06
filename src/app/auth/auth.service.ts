import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
const { client_id, client_secret } = environment.laravel.passport.passwordGrant;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Object> {
    return this.http.post(`${environment.laravel.url}/oauth/token`, {
      grant_type: 'password',
      client_id,
      client_secret,
      username,
      password,
      scope: ''
    });
  }
}
