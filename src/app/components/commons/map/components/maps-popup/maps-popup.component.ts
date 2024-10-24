import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { toLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WeatherPopupService } from './maps-popup.service';

@UntilDestroy()
@Component({
  selector: 'app-maps-popup',
  templateUrl: './maps-popup.component.html',
  styleUrl: './maps-popup.component.scss',
})
export class MapPopupComponent extends WeatherPopupService implements AfterViewInit, OnDestroy {
  @ViewChild('popup') popupEl: ElementRef;

  @Input() mapView: Map;

  weatherData$: Observable<any> = of(null);

  private overlay: Overlay;

  private markerLayer: VectorLayer<VectorSource>;

  private currentMarker: Feature;

  ngAfterViewInit(): void {
    this.setupPopup();
  }

  ngOnDestroy(): void {
    if (this.overlay) this.mapView.removeOverlay(this.overlay);
    if (this.markerLayer) this.mapView.removeLayer(this.markerLayer);
  }

  setupPopup(): void {
    this.overlay = new Overlay({
      element: this.popupEl.nativeElement,
      offset: [0, -13],
    });
    this.mapView.addOverlay(this.overlay);

    this.markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    this.mapView.addLayer(this.markerLayer);

    this.mapView.on('singleclick', event => {
      const { coordinate } = event;
      const [lon, lat] = toLonLat(coordinate);

      this.weatherData$ = this.getWeatherData(lat, lon).pipe(
        untilDestroyed(this),
        map(data => ({
          id: data.id,
          wind: data.wind.speed,
          temp: data.main.temp,
          clouds: data.clouds.all,
          pressure: data.main.pressure,
          sys: data.sys,
        })),
        catchError((): any => of(false))
      );

      this.addMarker(coordinate);
      this.overlay.setPosition(coordinate);

      const popupRect = this.popupEl.nativeElement.getBoundingClientRect();
      const offsetX = -popupRect.width / 2;
      const offsetY = popupRect.height + 30;
      this.overlay.setOffset([offsetX, -offsetY]);
    });
  }

  addMarker(coordinate: number[]): void {
    if (this.currentMarker) {
      this.markerLayer.getSource().removeFeature(this.currentMarker);
    }

    const marker = new Feature({
      geometry: new Point(coordinate),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
      })
    );

    this.markerLayer.getSource().addFeature(marker);
    this.currentMarker = marker;
  }

  closePopup(): void {
    this.overlay.setPosition(undefined);

    if (this.currentMarker) {
      this.markerLayer.getSource().removeFeature(this.currentMarker);
      this.currentMarker = null;
    }
  }
}
