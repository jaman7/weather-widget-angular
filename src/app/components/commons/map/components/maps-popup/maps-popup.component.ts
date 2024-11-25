import { IDataDisplay } from './maps-popup.models';
import { WeatherPopupService } from './maps-popup.service';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { IWeatherDataResponce } from '@app/shared/model/weather-data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Map as MapView, Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-maps-popup',
  templateUrl: './maps-popup.component.html',
  styleUrl: './maps-popup.component.scss',
})
export class MapPopupComponent extends WeatherPopupService implements AfterViewInit, OnDestroy {
  @ViewChild('popup') popupEl: ElementRef;

  @Input() mapView: MapView;

  private overlay: Overlay;

  private markerLayer: VectorLayer<VectorSource>;

  private currentMarker: Feature;

  private coordinatesSubject = new BehaviorSubject<number[]>([]);

  details$: Observable<IDataDisplay[]> = this.coordinatesSubject.pipe(
    filter(([lon, lat]) => lon != null && lat != null),
    debounceTime(300),
    distinctUntilChanged((prev, curr) => prev[0] === curr[0] && prev[1] === curr[1]),
    switchMap(([lon, lat]) =>
      this.getWeatherData(lat, lon).pipe(
        map(data => (data ? this.mapToDetails(data as IWeatherDataResponce) : [])),
        catchError(() => of([{ label: 'Data unavailable', value: '' }]))
      )
    ),
    untilDestroyed(this)
  );

  ngAfterViewInit(): void {
    this.overlay = new Overlay({
      element: this.popupEl.nativeElement,
      offset: [0, -13],
    });
    this.markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
    this.mapView.addOverlay(this.overlay);
    this.mapView.addLayer(this.markerLayer);
    this.setupPopup();
  }

  ngOnDestroy(): void {
    if (this.overlay) this.mapView.removeOverlay(this.overlay);
    if (this.markerLayer) this.mapView.removeLayer(this.markerLayer);
  }

  setupPopup(): void {
    this.mapView.on('singleclick', event => {
      const { coordinate } = event;
      const [lon, lat] = toLonLat(coordinate);
      this.coordinatesSubject.next([lon, lat]);
      this.addOrUpdateMarker(coordinate);
      this.overlay.setPosition(coordinate);
      const popupRect = this.popupEl.nativeElement.getBoundingClientRect();
      this.overlay.setOffset([-popupRect.width / 2, -popupRect.height - 30]);
    });
  }

  private mapToDetails(data: IWeatherDataResponce): IDataDisplay[] {
    const { wind, clouds, main } = data || {};
    return [
      { label: 'Temperature:', value: `${Math.floor((main?.temp as number) ?? 0)}°C` },
      { label: 'Wind:', value: `${Math.floor((wind?.speed as number) ?? 0)}m/s` },
      { label: 'Cloud cover:', value: `${(clouds?.all as number) ?? 0}%` },
      { label: 'Pressure:', value: `${(main?.pressure as number) ?? 0}hPa` },
    ];
  }

  private addOrUpdateMarker(coordinate: number[]): void {
    if (this.currentMarker) {
      const currentCoord = (this.currentMarker.getGeometry() as Point).getCoordinates();
      if (currentCoord[0] === coordinate[0] && currentCoord[1] === coordinate[1]) return;
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
