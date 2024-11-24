import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Map as MapView } from 'ol';
import VectorImageLayer from 'ol/layer/VectorImage';
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleGeom } from 'ol/geom';
import { Style } from 'ol/style';
import { catchError, debounceTime, of, Subject, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Colors } from '../../map.constants';
import { styleFill, styleStroke } from '../../map.helpers';
import { MapSearchService } from './map-search.service';
import { MapService } from '../../map.service';

@UntilDestroy()
@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.scss',
})
export class MapSearchComponent implements OnInit, OnDestroy {
  @Input() mapView!: MapView;
  query: string = '';
  suggestions: any[] = [];
  loading: boolean = false;
  error: string = '';
  isSelecting: boolean = false;
  private searchTerms$ = new Subject<string>();

  constructor(
    private mapService: MapService,
    public mapSearchService: MapSearchService
  ) {}

  ngOnInit(): void {
    this.searchTerms$
      .pipe(
        debounceTime(1000),
        switchMap(term =>
          this.mapSearchService.getData(term).pipe(
            tap(() => {
              this.loading = true;
            }),
            catchError(() => {
              this.error = 'Failed to fetch suggestions';
              this.loading = false;
              return of([]);
            })
          )
        ),
        tap(data => {
          this.suggestions = data;
          this.loading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.resetSearchState();
  }

  private resetSearchState(): void {
    this.query = '';
    this.suggestions = [];
    this.loading = false;
    this.error = '';
    this.mapService.searchData$.next(null);
    this.getCurrentVectorImageLayer()?.getSource()?.clear();
  }

  getCurrentVectorImageLayer(): VectorImageLayer | null {
    return (
      this.mapView
        .getLayers()
        .getArray()
        .find(layer => layer instanceof VectorImageLayer) || null
    );
  }

  handleInputChange(event: string): void {
    const input = event;
    this.isSelecting = false;
    this.query = input;
    if (this.query.length > 2) {
      this.searchTerms$.next(this.query);
    } else {
      this.suggestions = [];
    }
  }

  handleSelectSuggestion(suggestion: any): void {
    const { longitude, latitude } = suggestion?.properties?.coordinates || {};
    const view = this.mapView.getView();
    const targetCoordinates = fromLonLat([parseFloat(longitude), parseFloat(latitude)]);
    const currentLayer = this.getCurrentVectorImageLayer();
    const vectorSource = currentLayer?.getSource();
    vectorSource?.clear();
    const radius = 500;
    const circleFeature = new Feature({
      geometry: new CircleGeom(targetCoordinates, radius),
    });
    circleFeature.setStyle(
      new Style({
        fill: styleFill(Colors.blue, 0.1),
        stroke: styleStroke(Colors.blue),
      })
    );
    vectorSource?.addFeature(circleFeature);
    view.animate({
      center: targetCoordinates,
      zoom: 15,
      duration: 1000,
      easing: t => t * (2 - t),
    });
    this.isSelecting = true;
    this.query = suggestion.displayName;
    this.mapService.searchData$.next({ longitude, latitude, city: suggestion?.properties?.name ?? '' });
    this.suggestions = [];
  }

  handleClearInput(): void {
    this.resetSearchState();
  }
}
