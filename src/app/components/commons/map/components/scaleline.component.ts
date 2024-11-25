import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import ScaleLine from 'ol/control/ScaleLine';
import Map from 'ol/Map';

@UntilDestroy()
@Component({
  selector: 'app-scaleline',
  template: ``,
  styleUrl: './map-scaleline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapScalelineComponent implements OnInit {
  @Input() mapView: Map;

  control?: ScaleLine;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.control = new ScaleLine({
      bar: true,
      text: true,
      minWidth: 125,
      target: this.elementRef.nativeElement,
    });
    this.mapView.addControl(this.control);
  }
}
