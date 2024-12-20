import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Map as MapView } from 'ol';

@UntilDestroy()
@Component({
  selector: 'app-map-view',
  template: '',
  styles: [':host { width: 100%; height: 100%; display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements OnInit {
  @Input() mapView: MapView;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.mapView.setTarget(this.elementRef.nativeElement);
  }
}
