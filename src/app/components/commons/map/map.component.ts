import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorImageLayer from 'ol/layer/VectorImage';
import Map from 'ol/Map';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { defaults as defaultControls } from 'ol/control';
import { tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { easeOut } from 'ol/easing';
import { MapConsts, ViewOptions } from './map.constants';
import { MapService } from './map.service';
import { TileLayerBackground } from './components/btn-controls/btn-controls.config';

@UntilDestroy()
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() height = '50vh';

  @Output() mapReady = new EventEmitter<Map>();

  mapView!: Map;

  vectorSource = new VectorSource();

  selectedLayerForLegend = '';

  tileLayer = new TileLayer({
    source: new OSM(),
  });

  vectorLayerTop = new VectorImageLayer({
    source: this.vectorSource,
  });

  constructor(
    private zone: NgZone,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    if (!this.mapView) {
      this.zone.runOutsideAngular(() => {
        this.initializeMap();
        this.subscribeToMapService();
      });
    }
    setTimeout(() => this.mapReady.emit(this.mapView), 0);
  }

  ngOnDestroy(): void {
    this.cleanupMap();
  }

  initializeMap(): void {
    this.mapView = new Map({
      view: new View({ ...ViewOptions }),
      controls: defaultControls({ attribution: false }),
      layers: [this.tileLayer, this.vectorLayerTop],
      target: MapConsts.targetClassName,
    });
    this.mapView.updateSize();
  }

  subscribeToMapService(): void {
    const { selectedTileLayerBackground$, mapHomePosition$, selectedLayerForLegend$ } = this.mapService;

    mapHomePosition$
      .pipe(
        untilDestroyed(this),
        tap(() => this.resetMapPosition())
      )
      .subscribe();

    selectedTileLayerBackground$
      .pipe(
        untilDestroyed(this),
        tap(index => this.updateTileLayer(index))
      )
      .subscribe();

    selectedLayerForLegend$
      .pipe(
        untilDestroyed(this),
        tap(name => {
          this.selectedLayerForLegend = name;
        })
      )
      .subscribe();
  }

  updateTileLayer(index: number): void {
    if (this.tileLayer && index >= 0) {
      this.tileLayer.setSource(TileLayerBackground[index].source);
    }
  }

  resetMapPosition(): void {
    const homeView = new View(ViewOptions);
    this.mapView.getView().animate({
      center: homeView.getCenter(),
      zoom: homeView.getZoom(),
      duration: 1000,
      easing: easeOut,
    });
    this.mapView.updateSize();
  }

  cleanupMap(): void {
    this.mapView.setTarget(null);
    this.vectorLayerTop.getSource().clear();
  }
}
