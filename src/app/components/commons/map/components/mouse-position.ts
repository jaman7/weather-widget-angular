import { Component, ChangeDetectionStrategy, Input, ElementRef, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import MousePosition from 'ol/control/MousePosition';
import { toStringXY } from 'ol/coordinate';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MapSourceClass, TypeEPSG } from '../map.enums';

const { EPSG4326 } = TypeEPSG;
const { MOUSE_POSITION_CONTROL } = MapSourceClass;

@UntilDestroy()
@Component({
  selector: 'app-mouse-position',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapMousePositionComponent implements AfterViewInit {
  @Input() mapView: Map;

  @Input() positionTemplate?: string;

  control?: MousePosition;

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.mapView) {
      setTimeout(() => {
        this.control = new MousePosition({
          projection: EPSG4326,
          className: MOUSE_POSITION_CONTROL,
          coordinateFormat: (coordinates: number[]): string => toStringXY(coordinates, 6),
          target: this.element.nativeElement,
        });
        this.mapView.addControl(this.control);
      }, 1);
    }
  }
}
