import { NgForOf } from '@angular/common';
import { Directive, Host } from '@angular/core';

export interface Item {
  id?: number | string;
  [key: string]: unknown;
}

@Directive({
  selector: '[ngForTrackByIndex]',
})
export class NgForTrackByIndexDirective<T extends Item> {
  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = this.trackByFn.bind(this);
  }

  private trackByFn(index: number, item: T): number | string {
    return item.id ?? index;
  }
}
