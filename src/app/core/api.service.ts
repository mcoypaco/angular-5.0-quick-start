import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.access_token}`);
  }
  
  get() {
    return 
  }
}
