import { Injectable } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class ProgressService {
  readonly loading: boolean;

  constructor(private ngProgress: NgProgress) { 
    this.loading = ngProgress.isStarted();
  }

  /**
   * Starts the progress bar
   * 
   */
  start() {
    this.ngProgress.start();
  }

  /**
   * Increase the percentabe by an amount.
   * 
   * @param amount 
   */
  inc(amount: number) {
    this.ngProgress.inc(amount);
  }
  
  /**
   * Finishes the progress bar
   * 
   */
  done() {
    this.ngProgress.done();
  }
}
