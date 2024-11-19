// import { NgForOf } from '@angular/common';
// import { Directive, Host } from '@angular/core';

// export interface Item {
//   id?: number | string;
//   [key: string]: any | any[];
// }

// @Directive({
//   selector: '[ngForTrackByIndex]',
// })
// export class NgForTrackByIndexDirective<T extends Item> {
//   constructor(@Host() private ngFor: NgForOf<T>) {
//     this.ngFor.ngForTrackBy = (index: number, item: T): number | string | undefined => item.id;
//   }
// }
import { NgForOf } from '@angular/common';
import { Directive, Host } from '@angular/core';

/**
 * Represents an item that can be tracked by `NgForTrackByIndexDirective`.
 */
export interface Item {
  id?: number | string;
  [key: string]: unknown; // Use `unknown` for more robust typing
}

@Directive({
  selector: '[ngForTrackByIndex]',
})
export class NgForTrackByIndexDirective<T extends Item> {
  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = this.trackByFn.bind(this);
  }

  /**
   * Custom trackBy function to optimize rendering in `*ngFor`.
   * Uses the `id` property if available, otherwise falls back to the `index`.
   * @param index - The index of the item in the array.
   * @param item - The current item being rendered.
   * @returns The unique identifier for the item.
   */
  private trackByFn(index: number, item: T): number | string {
    const trackByValue = item.id ?? index;
    console.log(`trackBy called for index: ${index}, id: ${item.id}, fallback: ${trackByValue}`);
    return trackByValue;
  }
}
