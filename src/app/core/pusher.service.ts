import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

import { environment } from '../../environments/environment';

@Injectable()
export class PusherService {
  pusher: Pusher;

  constructor() { 
    Pusher.logToConsole = environment.production ? false : true;

    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
  }

  /**
   * Initialize subscription to channels.
   * 
   */
  init() {
    //
  }

  /**
   * Disconnect the connection from the server.
   * 
   */
  disconnect() {
    this.pusher.disconnect();
  }

}
