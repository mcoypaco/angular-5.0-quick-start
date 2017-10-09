import { Injectable } from '@angular/core';

import { ApiAccess } from '../interfaces/api-access';

@Injectable()
export class AccessTokenService {

  constructor() { }

  /**
   * Fetches ApiAccess from local storage
   */
  get(): ApiAccess {
    return JSON.parse(localStorage.getItem('apiAccess'));
  }

  /**
   * Stores ApiAccess to local storage
   * @param apiAccess 
   */
  store(apiAccess: ApiAccess) {
    localStorage.setItem('apiAccess', JSON.stringify(apiAccess));
  }

  /**
   * Remove ApiAccess from local storage
   */
  delete() {
    localStorage.removeItem('apiAccess');
  }
}
