import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DecimalPipe } from '@angular/common';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { MapViewComponent } from './components/map-view.component';
import { MapScalelineComponent } from './components/scaleline.component';
import { MapMousePositionComponent } from './components/mouse-position';
import { BtnControlsComponent } from './components/btn-controls/btn-controls.component';
import { ButtonModule } from '../button/button.module';
import { MapLegendComponent } from './components/map-legend/map-legend.component';

@NgModule({
  declarations: [
    MapComponent,
    BtnControlsComponent,
    MapViewComponent,
    MapScalelineComponent,
    MapMousePositionComponent,
    MapLegendComponent,
  ],
  imports: [SharedModule, ButtonModule, FormsModule],
  providers: [DecimalPipe, { provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  exports: [MapComponent],
})
export class MapModule {}
