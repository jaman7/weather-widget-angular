import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LegendConfig } from './map-legend.config';
import { ILegend } from './map-legend.models';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrl: './map-legend.component.scss',
})
export class MapLegendComponent implements OnChanges {
  @Input() legend: string;

  scaleDetails: { [name: string]: ILegend } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.legend) {
      this.scaleDetails = this.getScaleDetails(this.legend);
    }
  }

  getScaleDetails(layerName: string): any {
    return LegendConfig[layerName] || null;
  }
}
