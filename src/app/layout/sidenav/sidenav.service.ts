import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {
  sidenav: MatSidenav;

  constructor() { }

  /**
   * Toggle the sidenav.
   * 
   */
  toggle() {
    this.sidenav.toggle();
  }
}
