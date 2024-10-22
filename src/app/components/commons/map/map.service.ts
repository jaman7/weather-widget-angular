import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  selectedTileLayerBackground$: BehaviorSubject<number> = new BehaviorSubject(1);

  mapHomePosition$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  selectedLayerForLegend$: BehaviorSubject<string> = new BehaviorSubject('precipitation');

  updateTileLayer(layerId: number): void {
    this.selectedTileLayerBackground$.next(layerId);
  }

  updateLegendLayer(name: string): void {
    this.selectedLayerForLegend$.next(name);
  }
}
