import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly color: string;
  readonly showSpinner: boolean;

  constructor() {
    this.color = '#673ab7';
    this.showSpinner = false;
  }
}
