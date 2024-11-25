import { ISearchData } from './components/map-search/map-search.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  selectedTileLayerBackground$: BehaviorSubject<number> = new BehaviorSubject(1);

  mapHomePosition$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  selectedLayerForLegend$: BehaviorSubject<string> = new BehaviorSubject('precipitation');

  searchData$: BehaviorSubject<ISearchData> = new BehaviorSubject(null);

  updateTileLayer(layerId: number): void {
    this.selectedTileLayerBackground$.next(layerId);
  }

  updateLegendLayer(name: string): void {
    this.selectedLayerForLegend$.next(name);
  }
}
