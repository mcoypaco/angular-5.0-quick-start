import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Resource } from '../resource';

@Injectable()
export class UserDataService extends Resource {
  url: string = 'user';
  
  constructor(protected api: ApiService) { 
    super(api);
  }

  /**
   * Returns the information of the current authenticated user
   * 
   */
  auth() {
    return this.api.post(`${this.url}/auth`);
  }

  /**
   * Search for a specific user in the database.
   * 
   * @param payload 
   */
  search(payload: { email:string }) {
    return this.api.post(`${this.url}/search`);
  }
}
