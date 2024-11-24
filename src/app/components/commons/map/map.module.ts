import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DecimalPipe } from '@angular/common';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { MapViewComponent } from './components/map-view.component';
import { MapScalelineComponent } from './components/scaleline.component';
import { MapMousePositionComponent } from './components/mouse-position';
import { SidebarControlsComponent } from './components/sidebar-controls/sidebar-controls.component';
import { ButtonModule } from '../button/button.module';
import { MapLegendComponent } from './components/map-legend/map-legend.component';
import { MapPopupComponent } from './components/maps-popup/maps-popup.component';
import { MapSearchComponent } from './components/map-search/map-search.component';

@NgModule({
  declarations: [
    MapComponent,
    SidebarControlsComponent,
    MapViewComponent,
    MapScalelineComponent,
    MapMousePositionComponent,
    MapLegendComponent,
    MapPopupComponent,
    MapSearchComponent,
  ],
  imports: [SharedModule, ButtonModule, FormsModule],
  providers: [DecimalPipe, { provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  exports: [MapComponent],
})
export class MapModule {}
