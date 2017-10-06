import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {

  constructor() { }

  sortByValue(items: any[], key: string): any[] {
    return items.sort((a, b) => a[key] - b[key]);
  }
}
