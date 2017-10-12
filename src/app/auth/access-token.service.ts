import { Injectable } from '@angular/core';

import { ApiAccess } from '../interfaces/api-access';

@Injectable()
export class AccessTokenService {

  constructor() { }

  /**
   * Fetches ApiAccess from local storage
   */
  get(key: string): ApiAccess {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * Stores ApiAccess to local storage
   * @param apiAccess 
   */
  store(key:string, apiAccess: ApiAccess) {
    localStorage.setItem(key, JSON.stringify(apiAccess));
  }

  /**
   * Remove ApiAccess from local storage
   */
  delete(key:string) {
    localStorage.removeItem(key);
  }
}
