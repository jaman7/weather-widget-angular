import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-map-view',
  template: '',
  styles: [':host { width: 100%; height: 100%; display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements OnInit {
  @Input() mapView: Map;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.mapView.setTarget(this.elementRef.nativeElement);
  }
}
