import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.sidenavService.sidenav = this.sidenav;
  }

  @ViewChild('sidenav') sidenav: MatSidenav
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
        this.sidenav.close();
    }
    else{
      this.sidenav.open();
    }
  }
}
