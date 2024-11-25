import { LegendConfig } from './map-legend.config';
import { ILegend } from './map-legend.models';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrl: './map-legend.component.scss',
})
export class MapLegendComponent implements OnChanges {
  @Input() legend: string;

  scaleDetails: ILegend | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.legend) this.scaleDetails = this.getScaleDetails(this.legend);
  }

  getScaleDetails(layerName: string): ILegend | null {
    return LegendConfig[layerName] || null;
  }
}
