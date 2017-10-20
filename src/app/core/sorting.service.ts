import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {

  constructor() { }

  /**
   * Sort an array by numeric value.
   * 
   * @param items 
   * @param key 
   */
  sortByNumericValue(items: any[], key: string, reverse: boolean = false): any[] {
    if(reverse) return items.sort((a, b) => b[key] - a[key]);
    return items.sort((a, b) => a[key] - b[key]);
  }
}
