import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Map as MapView } from 'ol';
import { easeIn, easeOut } from 'ol/easing';
import { Observable, Subscription, concatMap, from, interval, of } from 'rxjs';
import { ExpandCollapseHorizontal } from '@app/shared/animations/animations';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { MapService } from '@app/components/commons/map/map.service';
import { MapsTilleLayers, sidebarConfig, TileLayerBackground } from './btn-controls.config';
import { CheckboxTypes, ISidebarConfig } from './btn-controls.models';
import { ButtonsControl } from './btn-controls.enums';

const { BTN_HOME, BTN_ZOOM_IN, BTN_ZOOM_OUT } = ButtonsControl;

@Component({
  selector: 'app-btn-controls',
  templateUrl: './btn-controls.component.html',
  styleUrl: './btn-controls.component.scss',
  animations: [ExpandCollapseHorizontal],
})
export class BtnControlsComponent implements OnInit, OnDestroy {
  @Input() mapView!: MapView;

  sidebarRightConfig = sidebarConfig();

  collapsedSidebarRight$: Observable<boolean> = of(true);

  mapsTilleLayers = MapsTilleLayers;

  selectedTileLayer = this.mapsTilleLayers[0];

  selectedBackgroundLayer = TileLayerBackground.find(layer => layer.checked)?.id || 1;

  actions: { [name: string]: () => void } = {
    [BTN_ZOOM_IN]: (): void => {
      this.onZoomIn();
    },
    [BTN_ZOOM_OUT]: (): void => {
      this.onZoomOut();
    },
    [BTN_HOME]: (): void => {
      this.onMapHomeCenter();
    },
  };

  private layerUpdateSubscription!: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapView.addLayer(this.selectedTileLayer.tile);

    this.startLayerUpdate();
  }

  ngOnDestroy(): void {
    this.sidebarRightConfig = [];
    if (this.layerUpdateSubscription) this.layerUpdateSubscription.unsubscribe();
  }

  startLayerUpdate(): void {
    this.layerUpdateSubscription = interval(60000).subscribe(() => {
      this.updateSelectedTileLayer();
    });
  }

  updateSelectedTileLayer(): void {
    this.mapView.getLayers().forEach(layer => {
      if (layer === this.selectedTileLayer.tile && layer instanceof TileLayer) {
        const tileLayer = layer as TileLayer;
        const source = tileLayer.getSource();
        if (source instanceof XYZ) source.refresh();
      }
    });
  }

  onButtonControlAction(id: string): void {
    if (id in this.actions) this.actions?.[id]();
  }

  onLayerChange(item: ISidebarConfig | number, type: CheckboxTypes): void {
    if (type === 'tile') {
      this.onWeatherLayerChange(item as ISidebarConfig);
    } else {
      this.onTileLayerChange(item as number);
    }
  }

  onWeatherLayerChange(selectedLayer: ISidebarConfig): void {
    this.mapsTilleLayers.forEach(layer => {
      if (this.mapView.getLayers().getArray().includes(layer.tile)) this.mapView.removeLayer(layer.tile);
    });

    this.mapView.addLayer(selectedLayer.tile);
    this.mapService.updateLegendLayer(selectedLayer.name);
  }

  onTileLayerChange(layerId: number): void {
    this.mapService.updateTileLayer(layerId);
  }

  onZoomIn(): void {
    this.animateZoom(1);
  }

  onZoomOut(): void {
    this.animateZoom(-1);
  }

  onMapHomeCenter(): void {
    this.mapService.mapHomePosition$.next(true);
    setTimeout(() => {
      this.mapService.mapHomePosition$.next(false);
    }, 20);
  }

  animateZoom(factor: number): void {
    const view = this.mapView.getView();
    view.animate({ zoom: view.getZoom() + factor, easing: factor > 0 ? easeIn : easeOut, duration: 500 });
  }

  openSideBar(): void {
    this.collapsedSidebarRight$ = from(this.collapsedSidebarRight$).pipe(concatMap(content => of(!content)));
  }

  @HostListener('document:click', ['$event.target'])
  handleOutsideClick(target: HTMLElement): void {
    if (!target.closest('.map-sidebar')) {
      this.collapsedSidebarRight$ = of(false);
    }
  }
}
